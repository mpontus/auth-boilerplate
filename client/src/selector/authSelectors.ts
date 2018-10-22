import { Selector } from "reselect";
import { User } from "../model/User";
import { State } from "../reducer";

/**
 * Return whether the user is authenticated
 */
export const makeIsUserAuthenticated = (): Selector<State, boolean> => state =>
  state.auth.isAuthenticated;

/**
 * Return whether the user is anonymous
 */
export const makeIsUserAnonymous = (): Selector<State, boolean> => state =>
  state.auth.isAnonymous;

/**
 * Return currently logged in user
 */
export const makeGetCurrentUser = (): Selector<
  State,
  User | undefined
> => state => state.auth.user;
