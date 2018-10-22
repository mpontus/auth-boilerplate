import { combineEpics } from "redux-observable";
import { authEpic } from "./authEpic";
import { loginEpic } from "./loginEpic";
import { signupEpic } from "./signupEpic";

export const rootEpic = combineEpics(loginEpic, signupEpic, authEpic);
