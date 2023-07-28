import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { viewCart } from "../../../../../functions/view-cart"

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    console.log(`Event: ${JSON.stringify(event)}`)

    const response = viewCart(event)
    return response;
}
