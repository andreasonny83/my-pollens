import { processData } from './processData';

const userId = 'U123';
const userLocation = {
  longitude: 1,
  latitude: 32.32,
};

(async () => {
  const response = await processData(userId, userLocation);
  console.log('pollenValues', response);
})();
