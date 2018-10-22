import { combineEpics, Epic } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, filter, mapTo, switchMap } from "rxjs/operators";
import { getType, isOfType } from "typesafe-actions";
import { Action } from "../action";
import {
  emailActivationCompleteAction,
  emailActivationRequestAction
} from "../action/emailActivationActions";
import { emailActivationComplete } from "../api/method/emailActivationComplete";
import { emailActivationRequest } from "../api/method/emailActivationRequest";
import { Dependencies } from "../configureStore";
import { RequestError } from "../model/RequestError";
import { State } from "../reducer";

const emailActivationRequestEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api }
) =>
  action$.pipe(
    filter(isOfType(getType(emailActivationRequestAction.request))),
    switchMap(action =>
      from(emailActivationRequest(api, action.payload)).pipe(
        mapTo(emailActivationRequestAction.success()),
        catchError(error =>
          of(
            emailActivationRequestAction.failure(
              RequestError.fromApiError(error)
            )
          )
        )
      )
    )
  );

const emailActivationCompleteEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api }
) =>
  action$.pipe(
    filter(isOfType(getType(emailActivationCompleteAction.request))),
    switchMap(action =>
      from(emailActivationComplete(api, action.payload)).pipe(
        mapTo(emailActivationCompleteAction.success()),
        catchError(error =>
          of(
            emailActivationCompleteAction.failure(
              RequestError.fromApiError(error)
            )
          )
        )
      )
    )
  );

export const emailActivationEpic = combineEpics(
  emailActivationRequestEpic,
  emailActivationCompleteEpic
);
