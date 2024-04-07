import axios from 'axios';
import mockData from './mockResponse.json';

import type { Forecast, UserLocation } from '../types';

export const fetchPollenData = async (userLocation: UserLocation, apiKey: string): Promise<Forecast | undefined> => {
  const API_URL = 'https://pollen.googleapis.com/v1/forecast';
  const URL = `${API_URL}:lookup?key=${apiKey}&location.longitude=${userLocation.longitude}&location.latitude=${userLocation.latitude}&days=1`;

  console.log('URL:', URL);

  if (process.env.DEV === 'true') {
    console.log('Returning mock data');
    return mockData as Forecast;
  }

  try {
    const source = axios.CancelToken.source();
    const reqTimeout = setTimeout(() => {
      source.cancel();
    }, 3000);

    const getForecast = await axios.get<Forecast>(URL, {
      cancelToken: source.token,
    });
    clearTimeout(reqTimeout);

    return getForecast.data;
  } catch (error: any) {
    console.log('Error fetching forecast', error?.code, error?.message);
    return undefined;
  }
};
