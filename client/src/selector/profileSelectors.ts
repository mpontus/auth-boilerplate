import { createSelector, Selector, ParametricSelector } from "reselect";
import { RequestError } from "../model/RequestError";
import { User } from "../model/User";
import { State } from "../reducer";
import { makeGetCurrentUser } from "./authSelectors";

/**
 * Return whether the current user profile is loading
 */
export const makeIsProfileLoading = (): Selector<State, boolean> =>
  createSelector(
    makeGetCurrentUser(),
    state => state.userFetchRequest,
    (user, fetchRequestByUser) => {
      if (!user) {
        return false;
      }

      const request = fetchRequestByUser[user.id];

      if (!request) {
        return false;
      }

      return request.loading;
    }
  );

/**
 * Return current user profile.
 */
export const makeGetProfile = (): Selector<State, User | undefined> =>
  createSelector(
    makeGetCurrentUser(),
    state => state.userEntity,
    (user, entityById) => {
      if (!user) {
        return undefined;
      }

      return entityById[user.id];
    }
  );

/**
 * Return whether the current user profile is loading
 */
export const makeIsProfileSaving = (): ParametricSelector<
  State,
  { section: string },
  boolean
> => (state, { section }) => {
  const requestState = state.profileUpdateRequest[section];

  if (requestState !== undefined) {
    return requestState.loading;
  }

  return false;
};

/**
 * Return latest update profile error
 */
export const makeGetProfileError = (): ParametricSelector<
  State,
  { section: string },
  RequestError<ProfileUpdateDto> | undefined
> => (state, { section }) => {
  const requestState = state.profileUpdateRequest[section];

  if (requestState !== undefined) {
    return requestState.error;
  }

  return undefined;
};
