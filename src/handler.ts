import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { processData } from './processData';
import { RequestBody } from './types';
import { validateBody } from './utils/validate-body';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const body: RequestBody = JSON.parse(event.body || '{}');
  console.log('Body:', JSON.stringify(body));

  if (!validateBody(body)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid input data' }, null, 2),
    };
  }

  const { userId, userLocation } = body;
  const response = await processData(userId, userLocation);
  console.log('pollenValues', response);

  if (response) {
    return {
      statusCode: 200,
      body: JSON.stringify(response, null, 2),
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ message: 'Error processing data' }, null, 2),
  };
};
