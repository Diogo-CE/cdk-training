import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb"
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda"
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"

interface CustomAPIGatewayProxyEvent extends APIGatewayProxyEvent {
    Records?: APIGatewayProxyEvent[]
}

interface Product {
    username: string
    id: number
    amount: number
    price: number
    product: string
}

export const checkout = async (event: CustomAPIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log(`Event: ${JSON.stringify(event)}`)
    
    const records = event.Records ?? []
    // const records = !("Records" in event) ? (new Array(event)) : event.Records
    const prices = []
    
    for (const record of records) {
        const clientDynamoDB = new DynamoDBClient({})
        const dynamoDB = DynamoDBDocumentClient.from(clientDynamoDB)
        
        const clientLambda = new LambdaClient({})
        const inputLambda = {
            FunctionName: "CDK-Dev-Training-API-User-viewCart",
            InvocationType: "RequestResponse",
            Payload: Buffer.from(JSON.stringify({
                body: record.body
            }))
        }
        
        let command = new InvokeCommand(inputLambda)
        let responseLambda = await clientLambda.send(command)
        const products = JSON.parse(JSON.parse(new TextDecoder('utf-8').decode(responseLambda.Payload)).body)
        
        const body = JSON.parse(record.body!)
        
        const paramsCart = {
            TableName: 'CDK-cart',
            Key: {
                username : body.username,
                id : null
            },
            UpdateExpression: 'set #amount = :zero',
            ExpressionAttributeNames: { '#amount' : 'amount' },
            ExpressionAttributeValues: { ':zero' : 0 }
        }
        
        const paramsProducts = {
            TableName: 'CDK-products',
            Key: { id : null },
            UpdateExpression: 'set #stock = #stock - :amount',
            ConditionExpression: '#stock >= :amount',
            ExpressionAttributeNames: { '#stock' : 'stock' },
            ExpressionAttributeValues: { ':amount' : null }
        }
        
        for (const product of products) {
            paramsCart.Key["id"] = product.id
            let inputCommand = new UpdateCommand(paramsCart)
            let responseDB = await dynamoDB.send(inputCommand)
            
            paramsProducts.Key["id"] = product.id
            paramsProducts.ExpressionAttributeValues[":amount"] = product.amount
            inputCommand = new UpdateCommand(paramsProducts)
            responseDB = await dynamoDB.send(inputCommand)
        }
        
        inputLambda["FunctionName"] = "CDK-Dev-Training-API-User-calculateDelivery"
        inputLambda["Payload"] = Buffer.from(JSON.stringify({
            queryStringParameters: {
                "cep": 13562190
            }
        }))
        
        command = new InvokeCommand(inputLambda)
        responseLambda = await clientLambda.send(command)
        const shipping = JSON.parse(JSON.parse(new TextDecoder('utf-8').decode(responseLambda.Payload)).body).shipping
        
        const totalPrice = products.reduce(function(partialSum: number, curr: Product) {
            return partialSum + curr.amount * curr.price;
        }, 0) + shipping
        
        console.log(totalPrice)
        prices.push(totalPrice)
    }
    
    console.log(prices)
    
    const response = {
        statusCode: 200,
        body: JSON.stringify(prices)
    }
    return response;
};
