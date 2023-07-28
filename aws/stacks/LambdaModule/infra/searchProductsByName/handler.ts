import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { searchProductsByName } from "../../../../../functions/search-products-by-name"

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    console.log(`Event: ${JSON.stringify(event)}`)

    const response = searchProductsByName(event)
    return response;
}
