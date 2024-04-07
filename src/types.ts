export type UserLocation = {
  latitude: number;
  longitude: number;
};

export type RequestBody = {
  userId: string;
  userLocation: {
    longitude: number;
    latitude: number;
  };
};

enum Index {
  INDEX_UNSPECIFIED = 'INDEX_UNSPECIFIED',
  UPI = 'UPI',
}

export enum PlantType {
  PLANT_UNSPECIFIED = 'PLANT_UNSPECIFIED',
  ALDER = 'ALDER',
  ASH = 'ASH',
  BIRCH = 'BIRCH',
  COTTONWOOD = 'COTTONWOOD',
  ELM = 'ELM',
  MAPLE = 'MAPLE',
  OLIVE = 'OLIVE',
  JUNIPER = 'JUNIPER',
  OAK = 'OAK',
  PINE = 'PINE',
  CYPRESS_PINE = 'CYPRESS_PINE',
  HAZEL = 'HAZEL',
  GRAMINALES = 'GRAMINALES',
  RAGWEED = 'RAGWEED',
  MUGWORT = 'MUGWORT',
}

export enum PollenType {
  POLLEN_TYPE_UNSPECIFIED = 'POLLEN_TYPE_UNSPECIFIED',
  GRASS = 'GRASS',
  TREE = 'TREE',
  WEED = 'WEED',
}

interface IndexInfo {
  code: Index;
  displayName: string;
  value: number;
  category: string;
  indexDescription: string;
}

interface PlantDescription {
  type: PollenType;
  family: string;
  season: string;
  crossReaction: string;
}

export type PollenCode = PollenType | PlantType;

export interface PollenTypeDescription {
  code: PollenCode;
  displayName: string;
  inSeason?: boolean;
  healthRecommendations?: string[];
  indexInfo?: IndexInfo;
  plantDescription?: PlantDescription;
}

interface PollenTypeInfo extends PollenTypeDescription {
  code: PollenType;
  displayName: string;
  inSeason?: boolean;
  healthRecommendations?: string[];
  indexInfo?: IndexInfo;
}

interface PlantInfo extends PollenTypeDescription {
  code: PlantType;
  displayName: string;
  inSeason?: boolean;
  indexInfo?: IndexInfo;
  plantDescription?: PlantDescription;
}

interface DailyInfo {
  date: {
    day: number;
    month: number;
    year: number;
  };
  pollenTypeInfo: PollenTypeInfo[];
  plantInfo: PlantInfo[];
}

export interface Forecast {
  dailyInfo: DailyInfo[];
}
