import { combineReducers } from "@reduxjs/toolkit";
import { appReducer } from "./controller/app.slice";
import { footballReducer } from "./controller/football.slice";
import { worldCupReducer } from "./controller/worldCup.slice";

const rootReducer = combineReducers({
  app: appReducer,
  worldCup: worldCupReducer,
  football: footballReducer,
});

// export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
