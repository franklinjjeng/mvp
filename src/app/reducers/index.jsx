// This is the reducer that aggregates all other reducers
import { combineReducers } from "redux";

import game from "./gameReducer.jsx";

export default combineReducers({
  game
});