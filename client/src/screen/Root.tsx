import * as React from "react";
import { Route, Switch } from "react-router";
import { NavbarContainer } from "../container/NavbarContainer";
import * as routes from "../routes";
import { LoginScreen } from "./LoginScreen";
import { SignupScreen } from "./SignupScreen";

export const Root = () => (
  <React.Fragment>
    <NavbarContainer />
    <Switch>
      <Route path={routes.LOGIN} component={LoginScreen} />
      <Route path={routes.SIGNUP} component={SignupScreen} />
    </Switch>
  </React.Fragment>
);
