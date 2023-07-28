import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb"
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"

export const viewCart = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log(`Event: ${JSON.stringify(event)}`)

    const client = new DynamoDBClient({})
    const dynamoDB = DynamoDBDocumentClient.from(client)
    
    const body = JSON.parse(event.body!)
    
    const params = {
        TableName: 'CDK-cart',
        KeyConditionExpression: 'username = :this_username',
        ExpressionAttributeValues: {
            ':this_username': body.username
        }
    }
    
    const inputQuery = new QueryCommand(params)
    const responseDB = await dynamoDB.send(inputQuery)    
    const products = responseDB.Items?.filter((product) => product.amount > 0) ?? []    
    console.log(products)
    
    const response = {
        statusCode: 200,
        body: JSON.stringify(products)
    }
    return response;
};
