import { createAsyncAction } from "typesafe-actions";
import { LoginDto } from "../model/LoginDto";
import { RequestError } from "../model/RequestError";

export const loginAction = createAsyncAction(
  "LOGIN_REQUEST",
  "LOGIN_SUCCESS",
  "LOGIN_FAILURE"
)<LoginDto, void, RequestError<LoginDto>>();
