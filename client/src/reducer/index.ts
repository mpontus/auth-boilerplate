import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import { authReducer } from "./authReducer";
import { loginRequestReducer } from "./loginRequestReducer";
import { signupRequestReducer } from "./signupRequestReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  loginRequest: loginRequestReducer,
  signupRequest: signupRequestReducer
});

export type State = StateType<typeof rootReducer>;
