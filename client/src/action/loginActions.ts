import { createAsyncAction } from "typesafe-actions";
import { LoginDto } from "../model/LoginDto";

export const login = createAsyncAction(
  "LOGIN_REQUEST",
  "LOGIN_SUCCESS",
  "LOGIN_FAILURE"
)<LoginDto, void, Error>();
