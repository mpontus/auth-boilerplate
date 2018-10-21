import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import { loginRequestReducer } from "./loginRequestReducer";
import { signupRequestReducer } from "./signupRequestReducer";

export const rootReducer = combineReducers({
  loginRequest: loginRequestReducer,
  signupRequest: signupRequestReducer
});

export type State = StateType<typeof rootReducer>;
