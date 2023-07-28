import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { addProductsToCart } from "../../../../../functions/add-products-to-cart"

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    console.log(`Event: ${JSON.stringify(event)}`)

    const response = addProductsToCart(event)
    return response;
}
