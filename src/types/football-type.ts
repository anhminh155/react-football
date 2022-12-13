
export interface IICompetitionStandings {
  filters: IFilters
  competition: ICompetition
  season: ISeason
  standings: IStanding[]
}

export interface IFilters {}

export interface ICompetition {
  id: number
  area: IArea
  name: string
  code: string
  plan: string
  lastUpdated: string
}

export interface IArea {
  id: number
  name: string
}

export interface ISeason {
  id: number
  startDate: string | number | Date | any
  endDate: string | number | Date | any
  currentMatchday: number
  winner: any
}

export interface IStanding {
  stage: string
  type: string
  group: any
  table: ITable[]
}

export interface ITable {
  position: number
  team: ITeam
  playedGames: number
  form: any
  won: number
  draw: number
  lost: number
  points: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
}

export interface ITeam {
  id: number
  name: string
  crestUrl: string
}
