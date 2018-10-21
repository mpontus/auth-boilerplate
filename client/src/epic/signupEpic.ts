import { Epic } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, filter, mapTo, switchMap } from "rxjs/operators";
import { getType, isOfType } from "typesafe-actions";
import { Action } from "../action";
import { signupAction } from "../action/signupActions";
import { signup } from "../api/method/signup";
import { Dependencies } from "../configureStore";
import { RequestError } from "../model/RequestError";
import { State } from "../reducer";

export const signupEpic: Epic<Action, Action, State, Dependencies> = (
  action$,
  state$,
  { api }
) =>
  action$.pipe(
    filter(isOfType(getType(signupAction.request))),
    switchMap(action =>
      from(signup(api, action.payload)).pipe(
        mapTo(signupAction.success()),
        catchError(error =>
          of(signupAction.failure(RequestError.fromApiError(error)))
        )
      )
    )
  );
