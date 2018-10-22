import { combineEpics, Epic } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, filter, mapTo, switchMap } from "rxjs/operators";
import { getType, isOfType } from "typesafe-actions";
import { Action } from "../action";
import {
  passwordResetCompleteAction,
  passwordResetRequestAction
} from "../action/passwordResetActions";
import { passwordRecoveryComplete } from "../api/method/passwordRecoveryComplete";
import { passwordRecoveryRequest } from "../api/method/passwordRecoveryRequest";
import { Dependencies } from "../configureStore";
import { RequestError } from "../model/RequestError";
import { State } from "../reducer";

const passwordResetRequestEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api }
) =>
  action$.pipe(
    filter(isOfType(getType(passwordResetRequestAction.request))),
    switchMap(action =>
      from(passwordRecoveryRequest(api, action.payload)).pipe(
        mapTo(passwordResetRequestAction.success()),
        catchError(error =>
          of(
            passwordResetRequestAction.failure(RequestError.fromApiError(error))
          )
        )
      )
    )
  );

const passwordResetCompleteEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api }
) =>
  action$.pipe(
    filter(isOfType(getType(passwordResetCompleteAction.request))),
    switchMap(action =>
      from(passwordRecoveryComplete(api, action.payload)).pipe(
        mapTo(passwordResetCompleteAction.success()),
        catchError(error =>
          of(
            passwordResetCompleteAction.failure(
              RequestError.fromApiError(error)
            )
          )
        )
      )
    )
  );

export const passwordResetEpic = combineEpics(
  passwordResetRequestEpic,
  passwordResetCompleteEpic
);
