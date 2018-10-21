import { createAsyncAction } from "typesafe-actions";
import { RequestError } from "../model/RequestError";
import { SignupDto } from "../model/SignupDto";

export const signupAction = createAsyncAction(
  "SIGNUP_REQUEST",
  "SIGNUP_SUCCESS",
  "SIGNUP_FAILURE"
)<SignupDto, void, RequestError<SignupDto>>();
