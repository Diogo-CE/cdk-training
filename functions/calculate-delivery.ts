import axios from "axios"
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"

export const calculateDelivery = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log(`Event: ${JSON.stringify(event)}`)
  
  const cepDestiny = event.queryStringParameters?.cep
  const src = 'https://viacep.com.br/ws/' + cepDestiny + '/json'
  const responseAxios = await axios.get(src)
  const destiny = responseAxios.data
  const ddd = Number(destiny.ddd)
  
  const responseDestiny = {
      shipping: Number(((ddd / 10) * 3).toFixed(2)),
      time: Math.round(ddd / 16)
      
  }
  console.log(responseDestiny)
  
  const response = {
    statusCode: 200,
    body: JSON.stringify(responseDestiny),
  };
  return response;
};
