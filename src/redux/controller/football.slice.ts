import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API_FOOTBALL } from "../../api/constant";
import Http from "../../api/http.api";
import Utils from "../../common/utils";
import { IICompetitionStandings } from "../../types/football-type";
import { setMessage } from "./app.slice";

interface FootballState {
  loadingFootball: boolean;
  loadingModalFootball: boolean;
  competitions: any[];
  competitionsStandings: IICompetitionStandings | undefined;
  teamMatches: unknown;
}

const initAppState: FootballState = {
  loadingFootball: false,
  loadingModalFootball: false,
  competitions: [
    {
      name: "",
      code: "",
    },
  ],
  competitionsStandings: undefined,
  teamMatches: undefined,
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
      .addCase(
        (fetchCompetitionTierFootball.pending,
        fetchCompetitionStandingsFootball.pending),
        (state, action) => {
          state.loadingFootball = true;
        }
      )
      .addCase(
        (fetchCompetitionTierFootball.rejected,
        fetchCompetitionStandingsFootball.rejected),
        (state) => {
          state.loadingFootball = false;
        }
      )
      .addCase(fetchCompetitionTierFootball.fulfilled, (state, action: any) => {
        state.competitions = action.payload.competitions;
        state.loadingFootball = false;
      })
      .addCase(
        fetchCompetitionStandingsFootball.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.competitionsStandings = action.payload;
          console.log(action.payload);

          state.loadingFootball = false;
        }
      )
      .addCase(
        fetchTeamMatchesCompetitionsFootball.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.teamMatches = action.payload.matches;
          console.log(action.payload);
          state.loadingModalFootball = false;
        }
      );
  },
});

export const fetchCompetitionTierFootball = createAsyncThunk(
  "football/competition_tier",
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
  "football/competition_standings",
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
  "football/teamMatches",
  async ({ idTeam, competition }: ITeamMatches, { dispatch }) => {
    try {
      const res: any = await Http.get(
        API_FOOTBALL.footballTeamMatchesCompetitions(idTeam, competition)
      );
      // const res_team: any = await Http.get(
      //   API_FOOTBALL.footballTeamCompetitions(competition)
      // );
      // console.log(res_team.data);

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
