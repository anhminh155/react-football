export interface IPlayerMatches {
    count: number
    filters: Filters
    player: Player
    matches: Match[]
  }
  
  export interface Filters {
    permission: string
    limit: number
  }
  
  export interface Player {
    id: number
    name: string
    firstName: string
    lastName: any
    dateOfBirth: string
    countryOfBirth: string
    nationality: string
    position: string
    shirtNumber: any
    lastUpdated: string
  }
  
  export interface Match {
    id: number
    competition: Competition
    season: Season
    utcDate: string
    status: string
    matchday: number
    stage: string
    group?: string | null
    lastUpdated: string
    odds: Odds
    score: Score
    homeTeam: HomeTeam
    awayTeam: AwayTeam
    referees: Referee[]
  }
  
  export interface Competition {
    id: number
    name: string
  }
  
  export interface Season {
    id: number
    startDate: string
    endDate: string
    currentMatchday: number
  }
  
  export interface Odds {
    homeWin: number
    draw: number
    awayWin: number
  }
  
  export interface Score {
    winner: string
    duration: string
    fullTime: FullTime
    halfTime: HalfTime
    extraTime: ExtraTime
    penalties: Penalties
  }
  
  export interface FullTime {
    homeTeam: number
    awayTeam: number
  }
  
  export interface HalfTime {
    homeTeam: number
    awayTeam: number
  }
  
  export interface ExtraTime {
    homeTeam: any
    awayTeam: any
  }
  
  export interface Penalties {
    homeTeam: any
    awayTeam: any
  }
  
  export interface HomeTeam {
    id: number
    name: string
  }
  
  export interface AwayTeam {
    id: number
    name: string
  }
  
  export interface Referee {
    id: number
    name: string
    role: string
    nationality?: string
  }
  