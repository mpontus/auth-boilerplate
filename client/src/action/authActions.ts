import { createAsyncAction, createStandardAction } from "typesafe-actions";
import { RequestError } from "../model/RequestError";
import { User } from "../model/User";

/**
 * Synchronize auth state between API gateway and redux store.
 *
 * User will be undefined during anonymous authentication.
 */
export const authStatusChangeAction = createStandardAction(
  "AUTH_STATUS_CHANGE"
)<User | undefined>();

/**
 * Request session destruction on both ends
 */
export const logoutAction = createAsyncAction(
  "LOGOUT_REQUEST",
  "LOGOUT_SUCCESS",
  "LOGOUT_FAILURE"
)<void, void, RequestError<void>>();
