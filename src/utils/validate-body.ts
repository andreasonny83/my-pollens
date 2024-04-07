import { RequestBody } from '../types';

export const validateBody = (body?: RequestBody) => {
  return Boolean(body && body.userId && body.userLocation && body.userLocation.latitude && body.userLocation.longitude);
};
