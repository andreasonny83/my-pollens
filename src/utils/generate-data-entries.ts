import type { PollenCode, PollenType } from '../types';

export const generatePollenCode = (pollenTypeCode: PollenCode, plantDescriptionType?: PollenType) => {
  if (plantDescriptionType) {
    return `PC-${plantDescriptionType}-${pollenTypeCode}`;
  }
  return `PC-${pollenTypeCode}`;
};
