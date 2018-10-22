import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import { authReducer } from "./authReducer";
import { emailActivationRequestReducer } from "./emailActivationRequestReducer";
import { loginRequestReducer } from "./loginRequestReducer";
import { passwordResetRequestReducer } from "./passwordResetRequestReducer";
import { signupRequestReducer } from "./signupRequestReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  loginRequest: loginRequestReducer,
  signupRequest: signupRequestReducer,
  passwordResetRequest: passwordResetRequestReducer,
  emailActivationRequest: emailActivationRequestReducer
});

export type State = StateType<typeof rootReducer>;
