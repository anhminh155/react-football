import { IFiltersAPI } from "../types/football-type";

export const API_URL = "https://api.football-data.org";

export const API_FOOTBALL = {
  AREAS: "/v2/areas",
  TEAM: "/v2/teams",

  WORLD_CUP_2022_MATCHES: "/v2/competitions/WC/matches",
  WORLD_CUP_2022_TEAMS: "/v2/competitions/WC/teams",
  WORLD_CUP_2022_STANDINGS: "/v2/competitions/WC/standings",
  WORLD_CUP_2022_COMPETITIONS: "/v2/competitions?plan=TIER_ONE",

  footballCompetitionsStandings: (standing: string) =>
    `/v2/competitions/${standing}/standings`,

  footballTeamMatchesCompetitions: (idTeam: number, competition: string) =>
    `/v2/teams/${idTeam}/matches?competitions=${competition}`,

  footballTierCompetitions: (tier: string) => `/v2/competitions?plan=${tier}`,

  footballTeamCompetitions: (competition: string) =>
    `/v2/competitions/${competition}/teams`,

  footballBestScorersCompetitions: (competition: string) =>
    `/v2/competitions/${competition}/scorers`,

  footballMatches: (param: IFiltersAPI) => {
    let result:string =''
    Object.keys(param).forEach((key,i:number) => {
      console.log(key);
      if (key !== "competitions") {
        result += `${key}=${param[key as keyof IFiltersAPI]}&`
      }
    });
    return `/v2/competitions/${param.competitions}/matches?${result}`;
  },

  footballHead2Head: (idMatch: number) => `/v2/matches/${idMatch}/head2head`,

  // footballHead2Head: (idMatch: number) => `/v2/matches?status=SCHEDULED&competitions=PL&dateFrom=2022-10-01&dateTo=2022-10-08`,

  worldCupTeamMatches: (idTeam: number) =>
    `/v2/teams/${idTeam}/matches?competitions=WC`,
};
