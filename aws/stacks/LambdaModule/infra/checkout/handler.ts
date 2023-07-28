import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { checkout } from "../../../../../functions/checkout"

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    console.log(`Event: ${JSON.stringify(event)}`)

    const response = checkout(event)
    return response;
}
