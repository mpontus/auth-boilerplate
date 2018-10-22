import { createAsyncAction } from "typesafe-actions";
import { RequestError } from "../model/RequestError";
import { User } from "../model/User";

/**
 * Async action set for requesting user details
 */
export const fetchUserAction = createAsyncAction(
  "FETCH_USER_REQUEST",
  "FETCH_USER_SUCCESS",
  "FETCH_USER_FAILURE"
)<{ id: string }, User, { id: string; error: RequestError<void> }>();
