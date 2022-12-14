/**
 * @param dateFrom String /yyyy-MM-dd/
 */
export interface IFiltersAPI {
  id?: number;
  ids?: number;
  matchday?: number;
  season?: string;
  status?:
    | "SCHEDULED"
    | "LIVE"
    | "IN_PLAY"
    | "PAUSED"
    | "FINISHED"
    | "POSTPONED"
    | "SUSPENDED"
    | "CANCELLED";
  venue?: "HOME" | "AWAY";
  date?: string;
  dateFrom?: string;
  dateTo?: string;
  stage?:
    | "FINAL"
    | "THIRD_PLACE"
    | "SEMI_FINALS"
    | "QUARTER_FINALS"
    | "LAST_16"
    | "LAST_32"
    | "LAST_64"
    | "ROUND_4"
    | "ROUND_3"
    | "ROUND_2"
    | "ROUND_1"
    | "GROUP_STAGE"
    | "PRELIMINARY_ROUND"
    | "QUALIFICATION"
    | "QUALIFICATION_ROUND_1"
    | "QUALIFICATION_ROUND_2"
    | "QUALIFICATION_ROUND_3"
    | "PLAYOFF_ROUND_1"
    | "PLAYOFF_ROUND_2"
    | "PLAYOFFS"
    | "REGULAR_SEASON"
    | "CLAUSURA"
    | "APERTURA"
    | "CHAMPIONSHIP"
    | "RELEGATION"
    | "RELEGATION_ROUND";
  plan?: "TIER_ONE" | "TIER_TWO" | "TIER_THREE" | "TIER_FOUR";
  competitions: string;
  areas?: string;
  group?: string;
  limit?: number;
  offset?: number;
}

export interface IICompetitionStandings {
  filters: IFilters;
  competition: ICompetition;
  season: ISeason;
  standings: IStanding[];
}

export interface IFilters {}

export interface ICompetition {
  id: number;
  area: IArea;
  name: string;
  code: string;
  plan: string;
  countryCode?: string;
  lastUpdated: string;
}

export interface IArea {
  id: number;
  name: string;
}

export interface ISeason {
  id: number;
  startDate: string | number | Date | any;
  endDate: string | number | Date | any;
  currentMatchday: number;
  winner: any;
}

export interface IStanding {
  stage: string;
  type: string;
  group: any;
  table: ITable[];
}

export interface ITable {
  position: number;
  team: ITeam;
  playedGames: number;
  form: any;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

export interface ITeam {
  id: number;
  name: string;
  crestUrl: string;
}
