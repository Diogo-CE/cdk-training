import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb"
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"

interface ScanParams {
    TableName: string
    FilterExpression?: string
    ExpressionAttributeValues?: { [key: string]: any }
}

export const listProducts = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log(`Event: ${JSON.stringify(event)}`)

    const products = await scanTable(event)

    const response = {
        statusCode: 200,
        body: JSON.stringify(products),
    }
    return response;
};

const scanTable = async (event: APIGatewayProxyEvent): Promise<any> => {
    console.log(`Event: ${JSON.stringify(event)}`)

    const client = new DynamoDBClient({})
    const dynamoDB = DynamoDBDocumentClient.from(client)

    const params: ScanParams = {
        TableName: 'CDK-products'
    }
    
    if (event.queryStringParameters?.product != null)  {
        params['FilterExpression'] = 'product = :this_product'
        params['ExpressionAttributeValues'] = {':this_product' : event.queryStringParameters.product }
    }

    const input = new ScanCommand(params)
    const responseDB = await dynamoDB.send(input)
    const products = responseDB.Items?.filter((product) => product.stock > 0) ?? []
    console.log(products);

    return products;
};
