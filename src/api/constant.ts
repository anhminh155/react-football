export const API_URL = "https://api.football-data.org";

export const API_FOOTBALL = {
  AREAS: "/v2/areas",
  TEAM: "/v2/teams",

  WORLD_CUP_2022_MATCHES: "/v2/competitions/WC/matches",
  WORLD_CUP_2022_TEAMS: "/v2/competitions/WC/teams",
  WORLD_CUP_2022_STANDINGS: "/v2/competitions/WC/standings",
  WORLD_CUP_2022_COMPETITIONS: "/v2/competitions?plan=TIER_ONE",

  footballCompetitionsStandings: (standing: string) => {
    if (standing === "EC") {
      return `/v2/competitions/${standing}/standings?season=2024`;
    } else {
      return `/v2/competitions/${standing}/standings`;
    }
  },

  footballTeamMatchesCompetitions: (idTeam: number, competition: string) =>
    `/v2/teams/${idTeam}/matches?competitions=${competition}`,

  footballTierCompetitions: (tier: string) => `/v2/competitions?plan=${tier}`,

  footballTeamCompetitions: (competition: string) =>
    `/v2/competitions/${competition}/teams`,

  worldCupTeamMatches: (idTeam: number) =>
    `/v2/teams/${idTeam}/matches?competitions=WC`,
};
