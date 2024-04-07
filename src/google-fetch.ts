import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import axios from 'axios';
import 'dotenv/config';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { body } = event;
  console.log('Event body:', body);

  const userLocation = {
    longitude: 35.32,
    latitude: 32.32,
  };

  const API_KEY = process.env.GOOGLE_API_KEY;
  const API_URL = 'https://pollen.googleapis.com/v1/forecast';
  const URL = `${API_URL}:lookup?key=${API_KEY}&location.longitude=${userLocation.longitude}&location.latitude=${userLocation.latitude}&days=1`;

  try {
    const source = axios.CancelToken.source();
    const reqTimeout = setTimeout(() => {
      source.cancel();
    }, 3000);

    const getForecast = await axios.get(URL, {
      cancelToken: source.token,
    });
    clearTimeout(reqTimeout);

    return {
      statusCode: 200,
      body: JSON.stringify(getForecast.data),
    };
  } catch (error) {
    console.log('Error fetching forecast', error);
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};
