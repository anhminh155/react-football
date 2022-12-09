import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import Http from "../../api/http.api";
import { API_FOOTBALL } from "../../api/constant";
import {
  StandingsWorldCup,
  TeamWorldCup,
} from "../../types/football-world-cup";

export const fetchStandingsWorldCup = createAsyncThunk(
  "worldCup/standings",
  async () => {
    try {
      const res: any = await Http.get(API_FOOTBALL.WORLD_CUP_2022_STANDINGS);
      if (res.data) {
        const data = res.data as unknown;
        return data;
      }
    } catch (e) {
      const {
        response: { data, status },
      } = e as unknown as {
        response: { data: string; status: number };
      };
      throw {
        name: "Request Failed",
        message: data,
        code: `${status}`,
      };
    }
  }
);

export const fetchMatchesWorldCup = createAsyncThunk(
  "worldCup/matches",
  async () => {
    try {
      const res: any = await Http.get(API_FOOTBALL.WORLD_CUP_2022_MATCHES);
      if (res.data) {
        const data = res.data as unknown;
        return data;
      }
    } catch (e) {
      const {
        response: { data, status },
      } = e as unknown as {
        response: { data: string; status: number };
      };
      throw {
        name: "Request Failed",
        message: data,
        code: `${status}`,
      };
    }
  }
);

export const fetchTeamsWorldCup = createAsyncThunk(
  "worldCup/teams",
  async () => {
    try {
      const res: any = await Http.get(API_FOOTBALL.WORLD_CUP_2022_TEAMS);
      if (res.data) {
        const data = res.data as unknown;
        console.log("🚀 ~ file: worldCup.slice.ts:46 ~ data", data);
        return data;
      }
    } catch (e) {
      const {
        response: { data, status },
      } = e as unknown as {
        response: { data: string; status: number };
      };
      throw {
        name: "Request Failed",
        message: data,
        code: `${status}`,
      };
    }
  }
);

// Define a type for the slice state
interface worldCupState {
  loading: boolean;
  type: string;
  message: string;
  matches: any;
  teams: TeamWorldCup[];
  standings: StandingsWorldCup | null;
}

// Define the initial state using that type
const initialState: worldCupState = {
  loading: false,
  type: "",
  message: "",
  matches: [],
  teams: [],
  standings: null,
};

const worldCupSlice = createSlice({
  name: "worldCup",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLoadingWC: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        (fetchMatchesWorldCup.pending, fetchTeamsWorldCup.pending),
        (state, action) => {
          console.log(action);
          state.loading = true;
        }
      )
      .addCase(
        (fetchMatchesWorldCup.rejected, fetchTeamsWorldCup.rejected),
        (state, action) => {
          const { code } = action.error;
          state.type = parseInt(code ?? "", 10) === 500 ? "error" : "warning";
          state.message = "Failed to get response from server";
        }
      )
      .addCase(fetchTeamsWorldCup.fulfilled, (state, action: any) => {
        state.loading = false;
        state.teams = action.payload.teams;
        console.log(action);
      })
      .addCase(fetchMatchesWorldCup.fulfilled, (state, action) => {
        state.loading = false;
        state.matches = action.payload;
        console.log(action);
      })
      .addCase(fetchStandingsWorldCup.fulfilled, (state, action: any) => {
        state.loading = false;
        state.standings = action.payload;
        console.log(action);
      });
  },
});

export const { setLoadingWC } = worldCupSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.worldCup;

export default worldCupSlice.reducer;
