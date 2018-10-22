import { combineEpics, Epic } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { getType, isOfType } from "typesafe-actions";
import { Action } from "../action";
import {
  profileRetrieveAction,
  profileUpdateAction
} from "../action/profileActions";
import { getUser } from "../api/method/getUser";
import { updateUser } from "../api/method/updateUser";
import { Dependencies } from "../configureStore";
import { RequestError } from "../model/RequestError";
import { State } from "../reducer";

export const profileRetrieveEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api }
) =>
  action$.pipe(
    filter(isOfType(getType(profileRetrieveAction.request))),
    switchMap(action =>
      from(getUser(api, action.payload)).pipe(
        map(profileRetrieveAction.success),
        catchError(error =>
          of(
            profileRetrieveAction.failure({
              user: action.payload,
              error: RequestError.fromApiError(error)
            })
          )
        )
      )
    )
  );

export const profileUpdateEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api }
) =>
  action$.pipe(
    filter(isOfType(getType(profileUpdateAction.request))),
    switchMap(action =>
      from(
        updateUser(api, {
          id: action.payload.user.id,
          update: action.payload.update
        })
      ).pipe(
        map(profileUpdateAction.success),
        catchError(error =>
          of(
            profileUpdateAction.failure({
              user: action.payload.user,
              error: RequestError.fromApiError(error)
            })
          )
        )
      )
    )
  );

export const profileEpic = combineEpics(profileRetrieveEpic, profileUpdateEpic);
