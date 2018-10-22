import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import { loginRequestReducer } from "./loginRequestReducer";
import { signupRequestReducer } from "./signupRequestReducer";
import { authReducer } from "./authReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  loginRequest: loginRequestReducer,
  signupRequest: signupRequestReducer
});

export type State = StateType<typeof rootReducer>;
