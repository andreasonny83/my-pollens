import { createClient } from 'redis';
import { UserLocation } from './types';

const getCachedData = async (client: any, date: string, userLocation: UserLocation) => {
  if (!client) {
    return;
  }
  return client.get(`${date}:location:${userLocation.latitude}:${userLocation.longitude}`);
};

const storeCacheData = async (client: any, date: string, userLocation: UserLocation, data: any) => {
  const storingData = JSON.stringify(data);
  console.log('Storing cache data', storingData);

  if (!client) {
    return;
  }
  return client.set(`${date}:location:${userLocation.latitude}:${userLocation.longitude}`, storingData);
};

const quitCacheClient = async (client: any) => {
  if (!client) {
    return;
  }
  return client.quit();
};

const createCacheClient = async () => {
  try {
    if (process.env.DEV === 'true') {
      return null;
    }

    const client = await createClient({
      socket: {
        host: process.env.REDIS_URL,
        port: Number(process.env.REDIS_PORT),
      },
    })
      .on('error', (err) => {
        throw new Error('Redis Client Error' + err);
      })
      .connect();
    return client;
  } catch (error) {
    return null;
  }
};

export const getPollenData = async (userLocation: UserLocation) => {
  const API_KEY = process.env.GOOGLE_API_KEY;
  const API_URL = 'https://pollen.googleapis.com/v1/forecast';
  const URL = `${API_URL}:lookup?key=${API_KEY}&location.longitude=${userLocation.longitude}&location.latitude=${userLocation.latitude}&days=1`;
  const date = new Date().toISOString().split('T')[0];

  const cacheClient = await createCacheClient();
  console.log('Cache client created');

  const cache = await getCachedData(cacheClient, date, userLocation);

  if (cache) {
    console.log('Cache found', cache);
    await quitCacheClient(cacheClient);
    return JSON.parse(cache);
  }

  console.log('Cache not found');
  console.log('URL:', URL);
  try {
    // const getForecast = await invokeLambda();
    const getForecast = {};

    await storeCacheData(cacheClient, date, userLocation, getForecast);
    console.log('Cache stored');
  } catch (error) {
    console.log('Error fetching forecast', error);
  }

  await quitCacheClient(cacheClient);
};
