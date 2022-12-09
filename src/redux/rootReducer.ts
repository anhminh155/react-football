import { combineReducers } from "@reduxjs/toolkit";

import worldCupReducer from './controller/worldCup.slice'

const rootReducer = combineReducers({
    worldCup: worldCupReducer,
});

// export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
