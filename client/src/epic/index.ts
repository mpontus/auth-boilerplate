import { combineEpics } from "redux-observable";
import { authEpic } from "./authEpic";
import { emailActivationEpic } from "./emailActivationEpic";
import { loginEpic } from "./loginEpic";
import { passwordRecoveryEpic } from "./passwordRecoveryEpic";
import { profileEpic } from "./profileEpic";
import { signupEpic } from "./signupEpic";

export const rootEpic = combineEpics(
  loginEpic,
  signupEpic,
  authEpic,
  passwordRecoveryEpic,
  emailActivationEpic,
  profileEpic
);
