import { combineEpics } from "redux-observable";
import { authEpic } from "./authEpic";
import { loginEpic } from "./loginEpic";
import { passwordRecoveryEpic } from "./passwordRecoveryEpic";
import { signupEpic } from "./signupEpic";

export const rootEpic = combineEpics(
  loginEpic,
  signupEpic,
  authEpic,
  passwordRecoveryEpic
);
