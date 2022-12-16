//Header two head
export interface IHead2Head {
  count: number;
  filters: Filters;
  aggregates: Aggregates;
  matches: Match[];
}

export interface Filters {}

export interface Aggregates {
  numberOfMatches: number;
  totalGoals: number;
  homeTeam: HomeTeam;
  awayTeam: AwayTeam;
}

export interface HomeTeam {
  id: number;
  name: string;
  wins: number;
  draws: number;
  losses: number;
}

export interface AwayTeam {
  id: number;
  name: string;
  wins: number;
  draws: number;
  losses: number;
}

export interface Match {
  id: number;
  competition: Competition;
  season: Season;
  utcDate: string;
  status: string;
  matchday?: number;
  stage: string;
  group?: string | null;
  lastUpdated: string;
  odds: Odds;
  score: Score;
  homeTeam: HomeTeam2;
  awayTeam: AwayTeam2;
  referees: Referee[];
}

export interface Competition {
  id: number;
  name: string;
  area: Area;
}

export interface Area {
  name: string;
  code: string;
  ensignUrl: string;
}

export interface Season {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday?: number;
  winner?: Winner | null;
}

export interface Winner {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crestUrl: string;
}

export interface Odds {
  msg?: string;
  homeWin?: number;
  draw?: number;
  awayWin?: number;
}

export interface Score {
  winner: string;
  duration: string;
  fullTime: FullTime;
  halfTime: HalfTime;
  extraTime: ExtraTime;
  penalties: Penalties;
}

export interface FullTime {
  homeTeam: number;
  awayTeam: number;
}

export interface HalfTime {
  homeTeam: number;
  awayTeam: number;
}

export interface ExtraTime {
  homeTeam: any;
  awayTeam: any;
}

export interface Penalties {
  homeTeam: any;
  awayTeam: any;
}

export interface HomeTeam2 {
  id: number;
  name: string;
}

export interface AwayTeam2 {
  id: number;
  name: string;
}

export interface Referee {
  id: number;
  name: string;
  role: string;
  nationality: string;
}
