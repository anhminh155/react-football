export interface IAreas {
  count: number;
  filters: Filters;
  areas: Area[];
}

export interface Filters {}

export interface Area {
  id: number;
  name: string;
  countryCode: string;
  ensignUrl?: string | null;
  parentAreaId?: number;
  parentArea?: string;
}
