import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API_FOOTBALL } from "../../api/constant";
import Http from "../../api/http.api";
import { DataFake } from "../../common/dataFake";
import Utils from "../../common/utils";
import { IRootCompetition } from "../../types/football-competition";
import { IRootMatches } from "../../types/football-matches";
import { IPlayerMatches } from "../../types/football-player-matches";
import { IFiltersAPI, IICompetitionStandings } from "../../types/football-type";
import { IAreas } from "../../types/football.areas";
import { IHead2Head } from "../../types/football.head2Head";
import { setMessage } from "./app.slice";

interface FootballState {
  loadingFootball: boolean;
  loadingModalFootball: boolean;
  rootCompetitions: IRootCompetition;
  competitionsStandings: IICompetitionStandings;
  teamMatches: unknown;
  bestScorersCompetitions: {
    scorers: any[];
  };
  head2Head: IHead2Head;
  rootAreas: IAreas;
  rootMatches: IRootMatches;
  rootInfoPersonMatches: IPlayerMatches
}

const initAppState: FootballState = {
  loadingFootball: false,
  loadingModalFootball: false,
  rootCompetitions: DataFake.CompetitionsFree(),
  competitionsStandings: DataFake.CompetitionStandings(),
  teamMatches: undefined,
  bestScorersCompetitions: {
    scorers: [],
  },
  head2Head: DataFake.DataHead2Head(),
  rootMatches: DataFake.Matches(),
  rootAreas: DataFake.Areas(),
  rootInfoPersonMatches: DataFake.PlayerMatches()
};

const footballSlice = createSlice({
  name: "football",
  initialState: initAppState,
  reducers: {
    setLoadingFootball(state, action: PayloadAction<boolean>) {
      state.loadingFootball = action.payload;
    },
    setLoadingModalFootball(state, action: PayloadAction<boolean>) {
      state.loadingModalFootball = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBestScorersCompetitionsFootball.pending, (state) => {
        state.loadingFootball = true;
      })
      .addCase(
        fetchBestScorersCompetitionsFootball.fulfilled,
        (state, action: PayloadAction<any>) => {
          action.payload.message ??
            (state.bestScorersCompetitions = action.payload);
          state.loadingFootball = false;
        }
      );
    builder
      .addCase(fetchInfoPersonsMatchesFootball.pending, (state) => {
        state.loadingFootball = true;
      })
      .addCase(
        fetchInfoPersonsMatchesFootball.fulfilled,
        (state, action: PayloadAction<any>) => {
          console.log(action.payload);
          
          action.payload.message ??
            (state.rootInfoPersonMatches = action.payload);
          state.loadingFootball = false;
        }
      );
    builder
      .addCase(fetchCompetitionTierFootball.pending, (state) => {
        state.loadingModalFootball = true;
      })
      .addCase(fetchCompetitionTierFootball.fulfilled, (state, action: any) => {
        const payload = action.payload.data;
        if (!action.payload.message) {
          // state.rootAreas =  action.payload[0]
          state.rootCompetitions = {
            ...payload,
            competitions: {
              ...state.rootCompetitions.competitions,
              [`${action.payload.idArea}`] : payload.competitions
            },
          };
          state.loadingModalFootball = false;
        }
        // action.payload.message ?? (state.rootCompetitions = action.payload);
        // state.loadingFootball = false;
      });
    builder
      .addCase(fetchCompetitionStandingsFootball.pending, (state) => {
        state.loadingFootball = true;
      })
      .addCase(
        fetchCompetitionStandingsFootball.fulfilled,
        (state, action: PayloadAction<any>) => {
          action.payload.message ??
            (state.competitionsStandings = action.payload);
          state.loadingFootball = false;
        }
      );
    builder
      .addCase(fetchTeamMatchesCompetitionsFootball.pending, (state) => {
        state.loadingModalFootball = true;
      })
      .addCase(
        fetchTeamMatchesCompetitionsFootball.fulfilled,
        (state, action: PayloadAction<any>) => {
          action.payload.message ??
            (state.teamMatches = action.payload.matches);
          state.loadingModalFootball = false;
        }
      );
    builder
      .addCase(fetchHead2HeadFootball.pending, (state) => {
        state.loadingModalFootball = true;
      })
      .addCase(
        fetchHead2HeadFootball.fulfilled,
        (state, action: PayloadAction<any>) => {
          action.payload.message ?? (state.head2Head = action.payload);
          state.loadingModalFootball = false;
        }
      );
    builder
      .addCase(fetchMatchesFootball.pending, (state) => {
        state.loadingFootball = true;
      })
      .addCase(
        fetchMatchesFootball.fulfilled,
        (state, action: PayloadAction<any>) => {
          action.payload.message ?? (state.rootMatches = action.payload);
          state.loadingFootball = false;
        }
      );
  },
});

export const fetchCompetitionTierFootball = createAsyncThunk(
  "football/fetchCompetitionTier",
  async (idArea: number | any, { dispatch }) => {
    try {
      const res: any = await Http.get(
        API_FOOTBALL.footballTierCompetitions(idArea)
      );
      // const res = await Promise.all([
      //   Http.get(API_FOOTBALL.footballAreas(2267)),
      //   Http.get(API_FOOTBALL.footballTierCompetitions(tier)),
      // ]);
      if (res.data) {
        const data = { data: res.data, idArea: idArea } as unknown;
        return data;
      }
    } catch (error) {
      dispatch(setMessage(Utils.getMassage()));
      dispatch(setLoadingFootball(false));
      return error;
    }
  }
);

export const fetchCompetitionStandingsFootball = createAsyncThunk(
  "football/fetchCompetitionStandings",
  async (standing: string, { dispatch }) => {
    try {
      const res: any = await Http.get(
        API_FOOTBALL.footballCompetitionsStandings(standing)
      );
      if (res.data) {
        const data = res.data as unknown;
        return data;
      }
    } catch (error) {
      dispatch(setMessage(Utils.getMassage()));
      dispatch(setLoadingFootball(false));
      return error;
    }
  }
);

export type ITeamMatches = {
  idTeam: number;
  competition: string;
};
export const fetchTeamMatchesCompetitionsFootball = createAsyncThunk(
  "football/fetchTeamMatchesCompetitions",
  async ({ idTeam, competition }: ITeamMatches, { dispatch }) => {
    try {
      const res: any = await Http.get(
        API_FOOTBALL.footballTeamMatchesCompetitions(idTeam, competition)
      );
      if (res.data) {
        const data = res.data as unknown;
        return data;
      }
    } catch (error) {
      dispatch(setMessage(Utils.getMassage()));
      dispatch(setLoadingModalFootball(false));
      return error;
    }
  }
);



/**
 * Call best player
 */
export type IBestScorers= {
  competition: string;
  limit: number;
};
export const fetchBestScorersCompetitionsFootball = createAsyncThunk(
  "football/fetchBestScorersCompetitions",
  async ({competition, limit}:IBestScorers, { dispatch }) => {
    try {
      const res: any = await Http.get(
        API_FOOTBALL.footballBestScorersCompetitions(competition,limit)
      );
      if (res.data) {
        const data = res.data as unknown;
        return data;
      }
    } catch (error) {
      dispatch(setMessage(Utils.getMassage()));
      dispatch(setLoadingFootball(false));
      return error;
    }
  }
);
export const fetchInfoPersonsMatchesFootball = createAsyncThunk(
  "football/fetchInfoPersons",
  async (idPerson: number, { dispatch }) => {
    try {
      const res: any = await Http.get(
        API_FOOTBALL.footballInfoPersonsMatches(idPerson)
      );
      if (res.data) {
        const data = res.data as unknown;
        return data;
      }
    } catch (error) {
      dispatch(setMessage(Utils.getMassage()));
      dispatch(setLoadingFootball(false));
      return error;
    }
  }
);
// -----------------------------------

export const fetchHead2HeadFootball = createAsyncThunk(
  "football/fetchHead2Head",
  async (idMatch: number, { dispatch }) => {
    try {
      const res: any = await Http.get(API_FOOTBALL.footballHead2Head(idMatch));
      if (res.data) {
        const data = res.data as unknown;
        return data;
      }
    } catch (error) {
      dispatch(setMessage(Utils.getMassage()));
      dispatch(setLoadingModalFootball(false));
      return error;
    }
  }
);

//Matches
export const fetchMatchesFootball = createAsyncThunk(
  "football/fetchMatches",
  async (params: IFiltersAPI, { dispatch }) => {
    try {
      const res: any = await Http.get(API_FOOTBALL.footballMatches(params));
      if (res.data) {
        const data = res.data as unknown;
        return data;
      }
    } catch (error) {
      dispatch(setMessage(Utils.getMassage()));
      dispatch(setLoadingModalFootball(false));
      return error;
    }
  }
);

export const { setLoadingFootball, setLoadingModalFootball } =
  footballSlice.actions;
export const footballReducer = footballSlice.reducer;
