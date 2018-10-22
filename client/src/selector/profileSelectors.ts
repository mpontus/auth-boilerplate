import { createSelector, Selector } from "reselect";
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
 * Return whether the current user profile is saving
 */
export const makeIsProfileSaving = (): Selector<State, boolean> =>
  createSelector(
    makeGetCurrentUser(),
    state => state.userUpdateRequest,
    (user, updateRequestByUser) => {
      if (!user) {
        return false;
      }

      const request = updateRequestByUser[user.id];

      if (!request) {
        return false;
      }

      return request.loading;
    }
  );

/**
 * Return whether the current user profile is saving
 */
export const makeGetProfileError = (): Selector<
  State,
  RequestError<ProfileUpdateDto> | undefined
> =>
  createSelector(
    makeGetCurrentUser(),
    state => state.userUpdateRequest,
    (user, updateRequestByUser) => {
      if (!user) {
        return undefined;
      }

      const request = updateRequestByUser[user.id];

      if (!request) {
        return undefined;
      }

      return request.error;
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
