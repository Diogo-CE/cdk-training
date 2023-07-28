import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb"
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"

export const searchProductsByName = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log(`Event: ${JSON.stringify(event)}`)

    const client = new DynamoDBClient({})
    const dynamoDB = DynamoDBDocumentClient.from(client)
    
    const params = {
      TableName: 'CDK-products',
      FilterExpression: 'product = :this_product',
      ExpressionAttributeValues: {
        ':this_product': event.queryStringParameters?.product
      }
    }
    
    const input = new ScanCommand(params)
    const responseDB = await dynamoDB.send(input)
    const products = responseDB.Items
    
    const response = {
        statusCode: 200,
        body: JSON.stringify(products),
    }
    return response;
};
