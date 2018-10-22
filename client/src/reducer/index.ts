import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import { authReducer } from "./authReducer";
import { emailActivationRequestReducer } from "./emailActivationRequestReducer";
import { loginRequestReducer } from "./loginRequestReducer";
import { passwordRecoveryRequestReducer } from "./passwordRecoveryRequestReducer";
import { signupRequestReducer } from "./signupRequestReducer";
import { userEntityReducer } from "./userEntityReducer";
import { userFetchRequestReducer } from "./userFetchRequestReducer";
import { userUpdateRequestReducer } from "./userUpdateRequestReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  loginRequest: loginRequestReducer,
  signupRequest: signupRequestReducer,
  passwordRecoveryRequest: passwordRecoveryRequestReducer,
  emailActivationRequest: emailActivationRequestReducer,
  userFetchRequest: userFetchRequestReducer,
  userUpdateRequest: userUpdateRequestReducer,
  userEntity: userEntityReducer
});

export type State = StateType<typeof rootReducer>;
