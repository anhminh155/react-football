import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import Http from "../../api/http.api";
import { API_FOOTBALL } from "../../api/constant";
import {
  StandingsWorldCup,
  TeamWorldCup,
} from "../../types/football-world-cup";

// Define a type for the slice state
interface worldCupState {
  loading: boolean;
  type: string;
  message: string;
  matches: any;
  teams: TeamWorldCup[];
  standingsTotal: StandingsWorldCup | null;
}

// Define the initial state using that type
const initialState: worldCupState = {
  loading: false,
  type: "",
  message: "",
  matches: [],
  teams: [],
  standingsTotal: null,
};

const worldCupSlice = createSlice({
  name: "worldCup",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLoadingWC: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setMessageWC: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
  extraReducers(builder) {
    // .addCase(
    //   (fetchMatchesWorldCup.pending, fetchTeamsWorldCup.pending),
    //   (state, action) => {
    //     console.log(action);
    //     state.loading = true;
    //   }
    // )
    builder
      .addCase(
        (fetchMatchesAllWorldCup.rejected,
        fetchTeamsWorldCup.rejected,
        fetchStandingsWorldCup.rejected),
        (state, action) => {
          const { code } = action.error;
          state.type = parseInt(code ?? "", 10) === 500 ? "error" : "warning";
          state.message = "Failed to get response from server";
          state.loading = false;
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
        state.loading = false;
        console.log(action.payload);
        state.matches = [...state.matches, ...action.payload.matches]
      });
  },
});

export const fetchStandingsWorldCup = createAsyncThunk(
  "worldCup/standings",
  async (_data, { dispatch }) => {
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
  }
);

export const fetchTeamMatchesWorldCup = createAsyncThunk(
  "worldCup/teamMatches",
  async (idTeam: number) => {
    const res: any = await Http.get(API_FOOTBALL.worldCupTeamMatches(idTeam));
    if (res.data) {
      const data = res.data as unknown;
      return data;
    }
  }
);

export const fetchMatchesAllWorldCup = createAsyncThunk(
  "worldCup/matchesALl",
  async () => {
    const res: any = await Http.get(API_FOOTBALL.WORLD_CUP_2022_MATCHES);
    if (res.data) {
      const data = res.data as unknown;
      return data;
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

export const { setLoadingWC, setMessageWC } = worldCupSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.worldCup;

export default worldCupSlice.reducer;
