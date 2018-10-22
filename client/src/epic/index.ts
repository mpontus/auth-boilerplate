import { combineEpics } from "redux-observable";
import { authEpic } from "./authEpic";
import { loginEpic } from "./loginEpic";
import { passwordResetEpic } from "./passwordResetEpic";
import { signupEpic } from "./signupEpic";

export const rootEpic = combineEpics(
  loginEpic,
  signupEpic,
  authEpic,
  passwordResetEpic
);
