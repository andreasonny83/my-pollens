import type { PollenCode, PollenType } from '../types';

export const generatePollenCode = (pollenTypeCode: PollenCode, plantDescriptionType?: PollenType) => {
  if (plantDescriptionType) {
    return `P#${plantDescriptionType}_${pollenTypeCode}`;
  }
  return `P#${pollenTypeCode}`;
};
