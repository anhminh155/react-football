type Area = {
  id: number;
  name: string;
};
type Filters = {};
type Competition = {
  id: number;
  area: Area;
  name: string;
  code: string;
  plan: string;
  lastUpdated: string;
};

type Season = {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
  winner: any;
};
export interface Standing {
  stage: string;
  type: string;
  group: string;
  table: Table[];
}

type Table = {
  position: number;
  team: Team;
  playedGames: number;
  form: any;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
};

type Team = {
  id: number;
  name: string;
  crestUrl: string;
};

export interface TeamWorldCup {
  id: number;
  area: Area;
  name: string;
  shortName: string;
  tla: string;
  crestUrl: string;
  address: string;
  phone?: string;
  website?: string;
  email?: string;
  founded?: number;
  clubColors?: string;
  venue?: string;
  lastUpdated: string;
}

export interface StandingsWorldCup {
  filters: Filters;
  competition: Competition;
  season: Season;
  standings: Standing[] | null | undefined;
}
