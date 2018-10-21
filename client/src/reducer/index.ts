import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import { loginRequestReducer } from "./loginRequestReducer";

export const rootReducer = combineReducers({
  loginRequest: loginRequestReducer
});

export type State = StateType<typeof rootReducer>;
