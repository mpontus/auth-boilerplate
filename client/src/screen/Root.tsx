import * as React from "react";
import { Route, Switch } from "react-router";
import { LoginScreen } from "./LoginScreen";
import { SignupScreen } from "./SignupScreen";

export const Root = () => (
  <Switch>
    <Route path="/login" component={LoginScreen} />
    <Route path="/signup" component={SignupScreen} />
  </Switch>
);
