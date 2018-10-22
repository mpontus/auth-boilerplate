import { combineEpics, Epic } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, filter, mapTo, switchMap } from "rxjs/operators";
import { getType, isOfType } from "typesafe-actions";
import { Action } from "../action";
import {
  passwordRecoveryCompleteAction,
  passwordRecoveryRequestAction
} from "../action/passwordRecoveryActions";
import { passwordRecoveryComplete } from "../api/method/passwordRecoveryComplete";
import { passwordRecoveryRequest } from "../api/method/passwordRecoveryRequest";
import { Dependencies } from "../configureStore";
import { RequestError } from "../model/RequestError";
import { State } from "../reducer";

const passwordRecoveryRequestEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api }
) =>
  action$.pipe(
    filter(isOfType(getType(passwordRecoveryRequestAction.request))),
    switchMap(action =>
      from(passwordRecoveryRequest(api, action.payload)).pipe(
        mapTo(passwordRecoveryRequestAction.success()),
        catchError(error =>
          of(
            passwordRecoveryRequestAction.failure(RequestError.fromApiError(error))
          )
        )
      )
    )
  );

const passwordRecoveryCompleteEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api }
) =>
  action$.pipe(
    filter(isOfType(getType(passwordRecoveryCompleteAction.request))),
    switchMap(action =>
      from(passwordRecoveryComplete(api, action.payload)).pipe(
        mapTo(passwordRecoveryCompleteAction.success()),
        catchError(error =>
          of(
            passwordRecoveryCompleteAction.failure(
              RequestError.fromApiError(error)
            )
          )
        )
      )
    )
  );

export const passwordRecoveryEpic = combineEpics(
  passwordRecoveryRequestEpic,
  passwordRecoveryCompleteEpic
);
