/**
 * Diamond Types  ,Types for diamond data and operations
 */

// Standard Diamond interface
export interface Diamond {
  _id?: string;
  stoneNo: string;
  shape?: string;
  color?: string;
  clarity?: string;
  cut?: string;
  carats?: number;
  price?: number;
  STONE_NO?: string;
  SHAPE?: string;
  COLOR?: string;
  CLARITY?: string;
  CUT?: string;
  CARATS?: number;
  [key: string]: unknown;
}

// Limited Edition Diamond
export interface LimitedEditionDiamond {
  STONE_NO: string;
  SHAPE: string;
  CARATS: string;
  COLOR: string;
  CLARITY: string;
  CUT: string;
  POL: string;
  SYM: string;
  LAB: string;
  MP4: string;
  REAL_IMAGE: string;
  ARROW_IMAGE: string;
  HEART_IMAGE: string;
  CERTI_PDF: string;
  NET_RATE: string;
  NET_VALUE: string;
  DISC_PER: string;
  RAP_PRICE: string;
  FLOUR: string;
  [key: string]: unknown;
}

// Diamond search filters
export interface DiamondSearchFilters {
  color?: string;
  clarity?: string;
  cut?: string;
  shape?: string;
  polish?: string;
  symmetry?: string;
  minCarats?: number;
  maxCarats?: number;
  minPrice?: number;
  maxPrice?: number;
  lab?: string;
  location?: string;
  stage?: string;
  page?: number;
  limit?: number;
  fluorescence?: string;
  searchTerm?: string;
  CN?: string;
  CW?: string;
  SN?: string;
  SW?: string;
  keyToSymbols?: string;
  netRateMin?: number;
  netRateMax?: number;
  netValueMin?: number;
  netValueMax?: number;
  discPerMin?: number;
  discPerMax?: number;
  tablePerMin?: number;
  tablePerMax?: number;
  pavillionAngleMin?: number;
  pavillionAngleMax?: number;
  pavillionHeightMin?: number;
  pavillionHeightMax?: number;
  depthPerMin?: number;
  depthPerMax?: number;
  crownAngleMin?: number;
  crownAngleMax?: number;
  crownHeightMin?: number;
  crownHeightMax?: number;
  lengthMin?: number;
  lengthMax?: number;
  widthMin?: number;
  widthMax?: number;
  depthMin?: number;
  depthMax?: number;
}

// Manual diamond creation payload
export interface ManualDiamondPayload {
  STONE_NO: string;
  SHAPE: string;
  CARATS: string;
  COLOR: string;
  CLARITY: string;
  sourceType: string;
  CUT?: string;
  POL?: string;
  SYM?: string;
  FLOUR?: string;
  LAB?: string;
  LOCATION?: string;
  NET_RATE?: string;
  DISC_PER?: string;
  NET_VALUE?: string;
  RAP_PRICE?: string;
  DEPTH_PER?: string;
  TABLE_PER?: string;
  MEASUREMENTS?: string;
  REPORT_NO?: string;
}

// Limited edition filters
export interface LimitedEditionFilters {
  SHAPE?: string;
  COLOR?: string;
  CLARITY?: string;
  CUT?: string;
  POL?: string;
  SYM?: string;
  LAB?: string;
  FLOUR?: string;
  CARATS_MIN?: string;
  CARATS_MAX?: string;
}


