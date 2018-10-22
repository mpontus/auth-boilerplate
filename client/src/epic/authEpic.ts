import { combineEpics, Epic } from "redux-observable";
import { from, of } from "rxjs";
import {
  catchError,
  filter,
  ignoreElements,
  map,
  mapTo,
  switchMap,
  tap
} from "rxjs/operators";
import { getType, isOfType } from "typesafe-actions";
import { Action } from "../action";
import { authStatusChangeAction, logoutAction } from "../action/authActions";
import { loginAnonymously } from "../api/method/loginAnonymously";
import { logout } from "../api/method/logout";
import { Dependencies } from "../configureStore";
import { RequestError } from "../model/RequestError";
import { State } from "../reducer";

/**
 * Login user anonymously whenever they are unathenticated
 */
export const anonymousLoginEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api }
) => {
  const unauthenticated$ = api.auth.pipe(
    filter(<T>(authStatus: T | null): authStatus is null => authStatus === null)
  );

  return unauthenticated$.pipe(
    tap(() => loginAnonymously(api)),
    ignoreElements()
  );
};

/**
 * Dispatch auth status updates to the store
 */
const authStatusUpdateEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api }
) => {
  const authenticated$ = api.auth.pipe(
    filter(<T>(authStatus: T | null): authStatus is T => authStatus !== null)
  );

  return authenticated$.pipe(
    map(authStatus => authStatus.user),
    map(authStatusChangeAction)
  );
};

/**
 * Logout the user on both ends and then reload the window.
 */
export const logoutEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api }
) =>
  action$.pipe(
    filter(isOfType(getType(logoutAction.request))),
    switchMap(() =>
      from(logout(api)).pipe(
        mapTo(logoutAction.success()),
        catchError(error =>
          of(logoutAction.failure(RequestError.fromApiError(error)))
        )
      )
    )
  );

export const authEpic = combineEpics(
  anonymousLoginEpic,
  authStatusUpdateEpic,
  logoutEpic
);
