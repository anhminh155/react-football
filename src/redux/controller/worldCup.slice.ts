import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import Http from "../../api/http.api";
import { API_FOOTBALL } from "../../api/constant";
import {
  StandingsWorldCup,
  TeamWorldCup,
} from "../../types/football-world-cup";
import { setMessage } from "./app.slice";
import Utils from "../../common/utils";

// Define a type for the slice state
interface worldCupState {
  loading: boolean;
  loadingModal: boolean;
  matches: any;
  teams: TeamWorldCup[];
  standingsTotal: StandingsWorldCup | null;
  competitions: any[];
}

// Define the initial state using that type
const initialState: worldCupState = {
  loading: false,
  loadingModal: false,
  matches: [],
  teams: [],
  standingsTotal: null,
  competitions: [],
};

const worldCupSlice = createSlice({
  name: "worldCup",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLoadingWC: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setLoadingModalWC: (state, action: PayloadAction<boolean>) => {
      state.loadingModal = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        (fetchMatchesAllWorldCup.rejected,
        fetchTeamsWorldCup.rejected,
        fetchStandingsWorldCup.rejected,
        fetchTeamMatchesWorldCup.rejected),
        (state) => {
          state.loading = false;
          state.loadingModal = false;
        }
      )
      .addCase(fetchTeamsWorldCup.fulfilled, (state, action: any) => {
        state.loading = false;
        state.teams = action.payload.teams;
        console.log(action);
      })
      .addCase(fetchMatchesAllWorldCup.fulfilled, (state, action: any) => {
        state.loading = false;
        state.matches = action.payload.matches;
        console.log(action);
      })
      .addCase(fetchStandingsWorldCup.fulfilled, (state, action: any) => {
        state.loading = false;
        state.standingsTotal = action.payload.data_standing;
        state.teams = action.payload.data_teams.teams;
        console.log(action);
      })
      .addCase(fetchTeamMatchesWorldCup.fulfilled, (state, action: any) => {
        state.loadingModal = false;
        console.log(action.payload);
        state.matches = action.payload.matches;
      });
  },
});

export const fetchStandingsWorldCup = createAsyncThunk(
  "worldCup/standings",
  async (_data, { dispatch }) => {
    try {
      dispatch(setLoadingWC(true));
      const res_standing: any = await Http.get(
        API_FOOTBALL.WORLD_CUP_2022_STANDINGS
      );
      const res_teams: any = await Http.get(API_FOOTBALL.WORLD_CUP_2022_TEAMS);
      if (res_standing.data && res_teams.data) {
        const data_teams = res_teams.data as unknown;
        const data_standing = res_standing.data as unknown;
        return {
          data_teams: data_teams,
          data_standing: data_standing,
        };
      }
    } catch (error) {
      dispatch(setMessage(Utils.getMassage()));
      dispatch(setLoadingWC(false))
      return error
    }
  }
);

export const fetchTeamMatchesWorldCup = createAsyncThunk(
  "worldCup/teamMatches",
  async (idTeam: number, { dispatch }) => {
    try {
      const res: any = await Http.get(API_FOOTBALL.worldCupTeamMatches(idTeam));
      if (res.data) {
        const data = res.data as unknown;
        return data;
      }
    } catch (error) {
      dispatch(setMessage(Utils.getMassage()));
      dispatch(setLoadingWC(false))
      return error
    }
  }
);

export const fetchMatchesAllWorldCup = createAsyncThunk(
  "worldCup/matchesALl",
  async (_data, { dispatch }) => {
    try {
      const res: any = await Http.get(API_FOOTBALL.WORLD_CUP_2022_MATCHES);
      if (res.data) {
        const data = res.data as unknown;
        return data;
      }
    } catch (error) {
      dispatch(setMessage(Utils.getMassage()));
      dispatch(setLoadingWC(false))
      return error
    }
  }
);

export const fetchTeamsWorldCup = createAsyncThunk(
  "worldCup/teams",
  async (_data, { dispatch }) => {
    try {
      const res: any = await Http.get(API_FOOTBALL.WORLD_CUP_2022_TEAMS);
      if (res.data) {
        const data = res.data as unknown;
        return data;
      }
    } catch (error) {
      dispatch(setMessage(Utils.getMassage()));
      dispatch(setLoadingWC(false))
      return error
    }
  }
);

export const { setLoadingWC, setLoadingModalWC } = worldCupSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.worldCup;

export const worldCupReducer = worldCupSlice.reducer;
