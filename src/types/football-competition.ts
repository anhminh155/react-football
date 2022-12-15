export interface IRootCompetition {
    count: number
    filters: Filters
    competitions: Competition[]
  }
  
  export interface Filters {
    plan: string
  }
  
  export interface Competition {
    id: number
    area: Area
    name: string
    code: string
    emblemUrl: string
    plan: string
    currentSeason: CurrentSeason
    numberOfAvailableSeasons: number
    lastUpdated: string
  }
  
  export interface Area {
    id: number
    name: string
    countryCode: string
    ensignUrl?: string | null
  }
  
  export interface CurrentSeason {
    id: number
    startDate: string
    endDate: string
    currentMatchday: number
    winner: any
  }
  