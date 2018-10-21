import { Epic } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, filter, mapTo, switchMap } from "rxjs/operators";
import { getType, isOfType } from "typesafe-actions";
import { Action } from "../action";
import { loginAction } from "../action/loginActions";
import { login } from "../api/method/login";
import { Dependencies } from "../configureStore";
import { RequestError } from "../model/RequestError";
import { State } from "../reducer";

export const loginEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api }
) =>
  action$.pipe(
    filter(isOfType(getType(loginAction.request))),
    switchMap(action =>
      from(login(api, action.payload)).pipe(
        mapTo(loginAction.success()),
        catchError(error =>
          of(loginAction.failure(RequestError.fromApiError(error)))
        )
      )
    )
  );
