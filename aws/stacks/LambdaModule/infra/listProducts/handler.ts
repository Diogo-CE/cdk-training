import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { listProducts } from "../../../../../functions/list-products"

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    console.log(`Event: ${JSON.stringify(event)}`)

    const response = listProducts(event)
    return response;
}
