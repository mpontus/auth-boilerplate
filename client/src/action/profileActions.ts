import { createAsyncAction } from "typesafe-actions";
import { RequestError } from "../model/RequestError";
import { User } from "../model/User";

/**
 * Dispatched when user opens profile page
 */
export const profileRetrieveAction = createAsyncAction(
  "PROFILE_RETRIEVE_REQUEST",
  "PROFILE_RETRIEVE_SUCCESS",
  "PROFILE_RETRIEVE_FAILURE"
)<User, User, { user: User; error: RequestError<void> }>();

/**
 * Dispatched when user saves their profile
 *
 * We need to pass currently logged in user with the action to provide
 * sufficient context for action handlers.
 */
export const profileUpdateAction = createAsyncAction(
  "PROFILE_UPDATE_REQUEST",
  "PROFILE_UPDATE_SUCCESS",
  "PROFILE_UPDATE_FAILURE"
)<
  { user: User; update: ProfileUpdateDto },
  User,
  { user: User; error: RequestError<ProfileUpdateDto> }
>();
