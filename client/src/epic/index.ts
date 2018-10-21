import { combineEpics } from "redux-observable";
import { loginEpic } from "./loginEpic";
import { signupEpic } from "./signupEpic";

export const rootEpic = combineEpics(loginEpic, signupEpic);
