import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { calculateDelivery } from "../../../../../functions/calculate-delivery"

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    console.log(`Event: ${JSON.stringify(event)}`)

    const response = calculateDelivery(event)
    return response;
}
