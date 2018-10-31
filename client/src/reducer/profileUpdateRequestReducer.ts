import { getType, StateType } from "typesafe-actions";
import { Action } from "../action";
import { profileUpdateAction } from "../action/profileActions";
import { RequestError } from "../model/RequestError";
import { createNamespaceReducer } from "./utils/createNamespaceReducer";
import { createRequestStateReducer } from "./utils/createRequestStateReducer";
import { updateIn } from "./utils/updateIn";

const sectionRequestReducer = createRequestStateReducer<
  Action,
  RequestError<ProfileUpdateDto>
>((state, action) => {
  switch (action.type) {
    case getType(profileUpdateAction.request):
      return {
        ...state,
        loading: true
      };

    case getType(profileUpdateAction.success):
      return {
        ...state,
        loading: false,
        success: true
      };

    case getType(profileUpdateAction.failure):
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    default:
      return state;
  }
});

export const profileUpdateRequestReducer = createNamespaceReducer<
  string,
  StateType<typeof sectionRequestReducer>,
  Action
>(action => {
  switch (action.type) {
    case getType(profileUpdateAction.request):
    case getType(profileUpdateAction.success):
    case getType(profileUpdateAction.failure):
      return updateIn(action.payload.section, sectionRequestReducer);

    default:
      return state => state;
  }
});
