import * as React from "react";
import { Route, Switch } from "react-router";
import { NavbarContainer } from "../container/NavbarContainer";
import * as routes from "../routes";
import { EmailActivationScreen } from "../screen/EmailActivationScreen";
import { LoginScreen } from "./LoginScreen";
import { PasswordRecoveryScreen } from "./PasswordRecoveryScreen";
import { SignupScreen } from "./SignupScreen";

export const Root = () => (
  <React.Fragment>
    <NavbarContainer />
    <Switch>
      <Route path={routes.LOGIN} component={LoginScreen} />
      <Route path={routes.SIGNUP} component={SignupScreen} />
      <Route path={routes.EMAIL_ACTIVATION} component={EmailActivationScreen} />
      <Route
        path={routes.PASSWORD_RECOVERY}
        component={PasswordRecoveryScreen}
      />
    </Switch>
  </React.Fragment>
);
