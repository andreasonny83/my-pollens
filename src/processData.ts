import type { UserLocation } from './types';
import { fetchPollenData } from './utils/fetch-pollens-data';
import { generatePollenCode } from './utils/generate-data-entries';
import 'dotenv/config';

export async function processData(userId: string, userLocation: UserLocation) {
  const API_KEY = `${process.env.GOOGLE_API_KEY}`;
  const pollenData = await fetchPollenData(userLocation, API_KEY);

  if (!pollenData || !pollenData.dailyInfo || pollenData.dailyInfo.length === 0) {
    console.log('No pollen data found');
    return undefined;
  }

  const userAllergyLevel = 1;
  const dayForecastData = pollenData.dailyInfo[0];
  const dateForecast = dayForecastData.date;
  const pollenTypeInfo = dayForecastData.pollenTypeInfo;
  const plantInfo = dayForecastData.plantInfo;

  const { year, month, day } = dateForecast;
  const dateEntry = new Date(year, month - 1, day).toUTCString();
  const pollenValues = {
    date: dateEntry,
    userLocation,
    userAllergyLevel,
    userId,
    data: [...pollenTypeInfo, ...plantInfo]
      .map((pollenType) => {
        if (!pollenType.indexInfo || !pollenType.inSeason) {
          return undefined;
        }

        return {
          code: generatePollenCode(pollenType.code, pollenType.plantDescription?.type),
          value: pollenType.indexInfo?.value,
        };
      })
      .filter(Boolean),
  };

  return pollenValues;
}
