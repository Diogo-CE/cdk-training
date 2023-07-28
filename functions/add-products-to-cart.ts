import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb"
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda"
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"

export const addProductsToCart = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log(`Event: ${JSON.stringify(event)}`)

    const clientDynamoDB = new DynamoDBClient({})
    const dynamoDB = DynamoDBDocumentClient.from(clientDynamoDB)
    
    const body = JSON.parse(event.body!)
    
    const paramsGet = {
      TableName: 'CDK-products',
      Key: {
        id: body.id
      }
    }
    
    const inputGet = new GetCommand(paramsGet)
    let responseDB = await dynamoDB.send(inputGet)
    const productInformations = responseDB.Item
    
    const paramsPut = {
        TableName: 'CDK-cart',
        Item: {
            username : body.username,
            id : Number(productInformations?.id),
            product : productInformations?.product,
            price : productInformations?.price,
            amount : Math.min(body.amount, productInformations?.stock)
        }
    }
    
    const inputPut = new PutCommand(paramsPut)
    responseDB = await dynamoDB.send(inputPut)
    
    const clientLambda = new LambdaClient({})
    const inputLambda = {
        FunctionName: "CDK-Dev-Training-API-User-viewCart",
        InvocationType: "RequestResponse",
        Payload: Buffer.from(JSON.stringify({
            body: event.body
        }))
    }
    
    const command = new InvokeCommand(inputLambda)
    const responseLambda = await clientLambda.send(command)
    const products = JSON.parse(new TextDecoder('utf-8').decode(responseLambda.Payload)).body
    console.log(products)
    
    const response = {
        statusCode: 200,
        body: products
    }
    return response;
};
