import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./userReducer.js";

const combinedReducers = combineReducers({
  user: userReducer,
});

export const appReducer = (state, action) => {
  if (action.type === "LOG_OUT_CLEAN") {
    state = undefined;
  }
  return combinedReducers(state, action);
};
