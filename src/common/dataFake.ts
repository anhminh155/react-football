import { IRootCompetition } from "../types/football-competition";
import { IRootMatches } from "../types/football-matches";
import { IICompetitionStandings } from "../types/football-type";
import { IAreas } from "../types/football.areas";
import { IHead2Head } from "../types/football.head2Head";

export class DataFake {
  static CompetitionStandings(): IICompetitionStandings {
    return {
      filters: {},
      competition: {
        id: 2019,
        area: {
          id: 2114,
          name: "Italy",
        },
        name: "Serie A",
        code: "SA",
        plan: "TIER_ONE",
        lastUpdated: "2022-03-20T09:16:43Z",
      },
      season: {
        id: 1505,
        startDate: "2022-08-14",
        endDate: "2023-06-04",
        currentMatchday: 16,
        winner: null,
      },
      standings: [
        {
          stage: "REGULAR_SEASON",
          type: "TOTAL",
          group: null,
          table: [
            {
              position: 1,
              team: {
                id: 113,
                name: "SSC Napoli",
                crestUrl: "https://crests.football-data.org/113.svg",
              },
              playedGames: 15,
              form: null,
              won: 13,
              draw: 2,
              lost: 0,
              points: 41,
              goalsFor: 37,
              goalsAgainst: 12,
              goalDifference: 25,
            },
          ],
        },
      ],
    };
  }

  static DataHead2Head(): IHead2Head {
    return {
      count: 9,
      filters: {},
      aggregates: {
        numberOfMatches: 15,
        totalGoals: 44,
        homeTeam: {
          id: 65,
          name: "Manchester City FC",
          wins: 8,
          draws: 2,
          losses: 5,
        },
        awayTeam: {
          id: 66,
          name: "Manchester United FC",
          wins: 5,
          draws: 2,
          losses: 8,
        },
      },
      matches: [
        {
          id: 416297,
          competition: {
            id: 2021,
            name: "Premier League",
            area: {
              name: "England",
              code: "ENG",
              ensignUrl: "https://crests.football-data.org/770.svg",
            },
          },
          season: {
            id: 1490,
            startDate: "2022-08-05",
            endDate: "2023-05-28",
            currentMatchday: 17,
            winner: null,
          },
          utcDate: "2022-10-02T13:00:00Z",
          status: "FINISHED",
          matchday: 9,
          stage: "REGULAR_SEASON",
          group: null,
          lastUpdated: "2022-12-15T00:20:22Z",
          odds: {
            msg: "Activate Odds-Package in User-Panel to retrieve odds.",
          },
          score: {
            winner: "HOME_TEAM",
            duration: "REGULAR",
            fullTime: {
              homeTeam: 6,
              awayTeam: 3,
            },
            halfTime: {
              homeTeam: 4,
              awayTeam: 0,
            },
            extraTime: {
              homeTeam: null,
              awayTeam: null,
            },
            penalties: {
              homeTeam: null,
              awayTeam: null,
            },
          },
          homeTeam: {
            id: 65,
            name: "Manchester City FC",
          },
          awayTeam: {
            id: 66,
            name: "Manchester United FC",
          },
          referees: [
            {
              id: 11605,
              name: "Michael Oliver",
              role: "REFEREE",
              nationality: "England",
            },
          ],
        },
      ],
    };
  }
  static Matches(): IRootMatches {
    return {
      count: 223,
      filters: {
        status: ["SCHEDULED"],
      },
      competition: {
        id: 2021,
        area: {
          id: 2072,
          name: "England",
        },
        name: "Premier League",
        code: "PL",
        plan: "TIER_ONE",
        lastUpdated: "2022-03-20T08:58:54Z",
      },
      matches: [
        {
          id: 416222,
          season: {
            id: 1490,
            startDate: "2022-08-05",
            endDate: "2023-05-28",
            currentMatchday: 17,
          },
          utcDate: "2022-12-26T12:30:00Z",
          status: "SCHEDULED",
          matchday: 17,
          stage: "REGULAR_SEASON",
          group: null,
          lastUpdated: "2022-10-25T00:20:15Z",
          odds: {
            msg: "Activate Odds-Package in User-Panel to retrieve odds.",
          },
          score: {
            winner: null,
            duration: "REGULAR",
            fullTime: {
              homeTeam: null,
              awayTeam: null,
            },
            halfTime: {
              homeTeam: null,
              awayTeam: null,
            },
            extraTime: {
              homeTeam: null,
              awayTeam: null,
            },
            penalties: {
              homeTeam: null,
              awayTeam: null,
            },
          },
          homeTeam: {
            id: 402,
            name: "Brentford FC",
          },
          awayTeam: {
            id: 73,
            name: "Tottenham Hotspur FC",
          },
          referees: [],
        },
      ],
    };
  }

  static CompetitionsFree(): IRootCompetition {
    return {
      count: 13,
      filters: {
        plan: "TIER_ONE",
      },
      competitions: {
        [`2077`]: [
          {
            id: 2017,
            area: {
              id: 2187,
              name: "Portugal",
              countryCode: "PRT",
              ensignUrl: "https://crests.football-data.org/765.svg",
            },
            name: "Primeira Liga",
            code: "PPL",
            emblemUrl: "https://crests.football-data.org/PPL.png",
            plan: "TIER_ONE",
            currentSeason: {
              id: 1518,
              startDate: "2022-08-07",
              endDate: "2023-05-28",
              currentMatchday: 14,
              winner: null,
            },
            numberOfAvailableSeasons: 74,
            lastUpdated: "2022-03-20T09:34:09Z",
          },
          {
            id: 2021,
            area: {
              id: 2072,
              name: "England",
              countryCode: "ENG",
              ensignUrl: "https://crests.football-data.org/770.svg",
            },
            name: "Premier League",
            code: "PL",
            emblemUrl: "https://crests.football-data.org/PL.png",
            plan: "TIER_ONE",
            currentSeason: {
              id: 1490,
              startDate: "2022-08-05",
              endDate: "2023-05-28",
              currentMatchday: 17,
              winner: null,
            },
            numberOfAvailableSeasons: 124,
            lastUpdated: "2022-03-20T08:58:54Z",
          },

          {
            id: 2003,
            area: {
              id: 2163,
              name: "Netherlands",
              countryCode: "NLD",
              ensignUrl: "https://crests.football-data.org/8601.svg",
            },
            name: "Eredivisie",
            code: "DED",
            emblemUrl: "https://crests.football-data.org/ED.png",
            plan: "TIER_ONE",
            currentSeason: {
              id: 1494,
              startDate: "2022-08-05",
              endDate: "2023-05-28",
              currentMatchday: 15,
              winner: null,
            },
            numberOfAvailableSeasons: 67,
            lastUpdated: "2022-03-20T09:19:27Z",
          },

          {
            id: 2002,
            area: {
              id: 2088,
              name: "Germany",
              countryCode: "DEU",
              ensignUrl: "https://crests.football-data.org/759.svg",
            },
            name: "Bundesliga",
            code: "BL1",
            emblemUrl: "https://crests.football-data.org/BL1.png",
            plan: "TIER_ONE",
            currentSeason: {
              id: 1495,
              startDate: "2022-08-05",
              endDate: "2023-05-27",
              currentMatchday: 16,
              winner: null,
            },
            numberOfAvailableSeasons: 60,
            lastUpdated: "2022-03-20T08:52:53Z",
          },

          {
            id: 2015,
            area: {
              id: 2081,
              name: "France",
              countryCode: "FRA",
              ensignUrl: "https://crests.football-data.org/773.svg",
            },
            name: "Ligue 1",
            code: "FL1",
            emblemUrl: "https://crests.football-data.org/FL1.png",
            plan: "TIER_ONE",
            currentSeason: {
              id: 1497,
              startDate: "2022-08-07",
              endDate: "2023-06-03",
              currentMatchday: 16,
              winner: null,
            },
            numberOfAvailableSeasons: 79,
            lastUpdated: "2022-03-20T09:30:02Z",
          },

          {
            id: 2019,
            area: {
              id: 2114,
              name: "Italy",
              countryCode: "ITA",
              ensignUrl: "https://crests.football-data.org/784.svg",
            },
            name: "Serie A",
            code: "SA",
            emblemUrl: "https://crests.football-data.org/SA.png",
            plan: "TIER_ONE",
            currentSeason: {
              id: 1505,
              startDate: "2022-08-14",
              endDate: "2023-06-04",
              currentMatchday: 16,
              winner: null,
            },
            numberOfAvailableSeasons: 91,
            lastUpdated: "2022-03-20T09:16:43Z",
          },
          {
            id: 2014,
            area: {
              id: 2224,
              name: "Spain",
              countryCode: "ESP",
              ensignUrl: "https://crests.football-data.org/760.svg",
            },
            name: "Primera Division",
            code: "PD",
            emblemUrl: "https://crests.football-data.org/PD.png",
            plan: "TIER_ONE",
            currentSeason: {
              id: 1504,
              startDate: "2022-08-14",
              endDate: "2023-06-04",
              currentMatchday: 15,
              winner: null,
            },
            numberOfAvailableSeasons: 92,
            lastUpdated: "2022-03-20T09:20:08Z",
          },
          {
            id: 2016,
            area: {
              id: 2072,
              name: "England",
              countryCode: "ENG",
              ensignUrl: "https://crests.football-data.org/770.svg",
            },
            name: "Championship",
            code: "ELC",
            emblemUrl: "https://crests.football-data.org/ELC.png",
            plan: "TIER_ONE",
            currentSeason: {
              id: 1502,
              startDate: "2022-07-29",
              endDate: "2023-05-06",
              currentMatchday: 23,
              winner: null,
            },
            numberOfAvailableSeasons: 6,
            lastUpdated: "2022-03-20T09:31:30Z",
          },

          {
            id: 2013,
            area: {
              id: 2032,
              name: "Brazil",
              countryCode: "BRA",
              ensignUrl: "https://crests.football-data.org/764.svg",
            },
            name: "Campeonato Brasileiro Série A",
            code: "BSA",
            emblemUrl: "https://crests.football-data.org/764.svg",
            plan: "TIER_ONE",
            currentSeason: {
              id: 1377,
              startDate: "2022-04-10",
              endDate: "2022-11-13",
              currentMatchday: 38,
              winner: null,
            },
            numberOfAvailableSeasons: 6,
            lastUpdated: "2021-07-20T18:42:17Z",
          },
          // {
          //   id: 2001,
          //   area: {
          //     id: 2077,
          //     name: "Europe",
          //     countryCode: "EUR",
          //     ensignUrl: "https://crests.football-data.org/EUR.svg",
          //   },
          //   name: "UEFA Champions League",
          //   code: "CL",
          //   emblemUrl: "https://crests.football-data.org/CL.png",
          //   plan: "TIER_ONE",
          //   currentSeason: {
          //     id: 1491,
          //     startDate: "2022-06-21",
          //     endDate: "2023-06-10",
          //     currentMatchday: 6,
          //     winner: null,
          //   },
          //   numberOfAvailableSeasons: 43,
          //   lastUpdated: "2022-03-20T09:20:44Z",
          // },
          // {
          //   id: 2152,
          //   area: {
          //     id: 2220,
          //     name: "South America",
          //     countryCode: "SAM",
          //     ensignUrl: "https://crests.football-data.org/CLI.svg",
          //   },
          //   name: "Copa Libertadores",
          //   code: "CLI",
          //   emblemUrl: "https://native-stats.org/assets/flags/SAM.svg",
          //   plan: "TIER_ONE",
          //   currentSeason: {
          //     id: 873,
          //     startDate: "2022-02-09",
          //     endDate: "2022-09-06",
          //     currentMatchday: 6,
          //     winner: null,
          //   },
          //   numberOfAvailableSeasons: 2,
          //   lastUpdated: "2022-10-31T15:20:09Z",
          // },

          // {
          //   id: 2018,
          //   area: {
          //     id: 2077,
          //     name: "Europe",
          //     countryCode: "EUR",
          //     ensignUrl: "https://crests.football-data.org/EUR.svg",
          //   },
          //   name: "European Championship",
          //   code: "EC",
          //   emblemUrl: "https://crests.football-data.org/EUR.svg",
          //   plan: "TIER_ONE",
          //   currentSeason: {
          //     id: 1537,
          //     startDate: "2024-06-14",
          //     endDate: "2024-07-14",
          //     currentMatchday: 1,
          //     winner: null,
          //   },
          //   numberOfAvailableSeasons: 17,
          //   lastUpdated: "2021-07-20T18:34:04Z",
          // },

          // {
          //   id: 2000,
          //   area: {
          //     id: 2267,
          //     name: "World",
          //     countryCode: "INT",
          //     ensignUrl: null,
          //   },
          //   name: "FIFA World Cup",
          //   code: "WC",
          //   emblemUrl: "https://crests.football-data.org/qatar.png",
          //   plan: "TIER_ONE",
          //   currentSeason: {
          //     id: 1382,
          //     startDate: "2022-11-20",
          //     endDate: "2022-12-18",
          //     currentMatchday: 6,
          //     winner: null,
          //   },
          //   numberOfAvailableSeasons: 22,
          //   lastUpdated: "2022-05-09T19:45:29Z",
          // },
        ],
      },
    };
  }

  static Areas(): IAreas {
    return {
      count: 272,
      filters: {},
      areas: [
        {
          id: 2000,
          name: "Afghanistan",
          countryCode: "AFG",
          ensignUrl: null,
          parentAreaId: 2014,
          parentArea: "Asia",
        },
      ],
    };
  }
}
