import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import { createEpicMiddleware } from "redux-observable";
import { Action } from "./action";
import { ApiGateway } from "./api/ApiGateway";
import { rootEpic } from "./epic";
import { rootReducer, State } from "./reducer";

/**
 * Redux middleware dependencies
 */
export interface Dependencies {
  /**
   * API gateway
   */
  api: ApiGateway;
}

// Redux DevTools integration
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * Create redux store
 */
export const configureStore = (
  preloadedState: State | undefined,
  dependencies: Dependencies
) => {
  const epicMiddleware = createEpicMiddleware<
    Action,
    Action,
    State,
    Dependencies
  >({
    dependencies
  });
  const middlewareEnhancer = applyMiddleware(epicMiddleware, logger);
  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(middlewareEnhancer)
  );

  epicMiddleware.run(rootEpic);

  return store;
};
