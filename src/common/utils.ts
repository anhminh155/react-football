import { ICompetition } from "../types/football-type";

class Utils {
  static setLocalStorage(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  static getValueLocalStorage(key: string): any | null {
    const value = localStorage.getItem(key);
    let re = null;
    value && (re = Utils.parseJson(value));
    return re;
  }
  static removeItemLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }

  static parseJson(str: string): any | null {
    try {
      return JSON.parse(str);
    } catch (e) {
      return null;
    }
  }

  static formatDate(date: Date): string {
    return new Date(date).toDateString();
  }

  static newDate(date: Date): Date {
    return new Date(date);
  }

  static getMassage(): string {
    return "Failed to get response from server. To protect the API from unnecessary load it is rate limited, please try again in 30 seconds!!!";
  }

  static getAge(date: string) {
    var today = new Date();
    var birthDate = new Date(date);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  static getCompetitionDataFake(): any[] {
    return [
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
          currentMatchday: 22,
          winner: null,
        },
        numberOfAvailableSeasons: 6,
        lastUpdated: "2022-03-20T09:31:30Z",
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
        id: 2000,
        area: {
          id: 2267,
          name: "World",
          countryCode: "INT",
          ensignUrl: null,
        },
        name: "FIFA World Cup",
        code: "WC",
        emblemUrl: "https://crests.football-data.org/qatar.png",
        plan: "TIER_ONE",
        currentSeason: {
          id: 1382,
          startDate: "2022-11-20",
          endDate: "2022-12-18",
          currentMatchday: 6,
          winner: null,
        },
        numberOfAvailableSeasons: 22,
        lastUpdated: "2022-05-09T19:45:29Z",
      },
    ];
  }
}
export default Utils;
