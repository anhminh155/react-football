import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API_FOOTBALL } from "../../api/constant";
import Http from "../../api/http.api";
import { DataFake } from "../../common/dataFake";
import Utils from "../../common/utils";
import { IRootCompetition } from "../../types/football-competition";
import { IRootMatches } from "../../types/football-matches";
import { IFiltersAPI, IICompetitionStandings } from "../../types/football-type";
import { IHead2Head } from "../../types/head2Head.football";
import { setMessage } from "./app.slice";

interface FootballState {
  loadingFootball: boolean;
  loadingModalFootball: boolean;
  rootCompetitions: IRootCompetition;
  competitionsStandings: IICompetitionStandings | undefined;
  teamMatches: unknown;
  bestScorersCompetitions: {
    scorers: any[];
  };
  head2Head: IHead2Head;
  rootMatches: IRootMatches;
}

const initAppState: FootballState = {
  loadingFootball: false,
  loadingModalFootball: false,
  rootCompetitions: DataFake.CompetitionsFree(),
  competitionsStandings: undefined,
  teamMatches: undefined,
  bestScorersCompetitions: {
    scorers: [],
  },
  head2Head: DataFake.DataHead2Head(),
  rootMatches:DataFake.Matches()
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
      .addCase(fetchCompetitionTierFootball.pending, (state) => {
        state.loadingModalFootball = true;
      })
      .addCase(fetchCompetitionTierFootball.fulfilled, (state, action: any) => {
        action.payload.message ??
          (state.rootCompetitions = action.payload);
        state.loadingFootball = false;
      });
    builder
      .addCase(fetchCompetitionStandingsFootball.pending, (state) => {
        state.loadingFootball = true;
      })
      .addCase(
        fetchCompetitionStandingsFootball.fulfilled,
        (state, action: PayloadAction<any>) => {
          console.log(action.payload);
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
          console.log(action);
          action.payload.message ??
            (state.head2Head = action.payload);
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
          console.log(action);
          action.payload.message ??
            (state.rootMatches = action.payload);
          state.loadingFootball = false;
        }
      );
  },
});

export const fetchCompetitionTierFootball = createAsyncThunk(
  "football/fetchCompetitionTier",
  async (
    tier: "TIER_ONE" | "TIER_TWO" | "TIER_THREE" | "TIER_FOUR",
    { dispatch }
  ) => {
    try {
      const res: any = await Http.get(
        API_FOOTBALL.footballTierCompetitions(tier)
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

export const fetchBestScorersCompetitionsFootball = createAsyncThunk(
  "football/fetchBestScorersCompetitions",
  async (standing: string, { dispatch }) => {
    try {
      const res: any = await Http.get(
        API_FOOTBALL.footballBestScorersCompetitions(standing)
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
