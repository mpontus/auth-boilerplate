import { createAsyncAction } from "typesafe-actions";

export const signup = createAsyncAction(
  "SIGNUP_PENDING",
  "SIGNUP_SUCCESS",
  "SIGNUP_FAILURE"
)<void, void, Error>();
