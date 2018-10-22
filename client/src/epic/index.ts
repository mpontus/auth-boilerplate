import { combineEpics } from "redux-observable";
import { loginEpic } from "./loginEpic";
import { signupEpic } from "./signupEpic";
import { authEpic } from "./authEpic";

export const rootEpic = combineEpics(loginEpic, signupEpic, authEpic);
