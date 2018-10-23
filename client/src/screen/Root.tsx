import * as React from "react";
import { Redirect, Route, Switch } from "react-router";
import { Container } from "../component/Container";
import { SingleColumnLayout } from "../component/SingleColumnLayout";
import { NavbarContainer } from "../container/NavbarContainer";
import * as routes from "../routes";
import { EmailActivationScreen } from "../screen/EmailActivationScreen";
import { LoginScreen } from "./LoginScreen";
import { MainScreen } from "./MainScreen";
import { PasswordRecoveryScreen } from "./PasswordRecoveryScreen";
import { ProfileScreen } from "./ProfileScreen";
import { SignupScreen } from "./SignupScreen";

export const Root = () => (
  <Container>
    <NavbarContainer />
    <SingleColumnLayout>
      <Switch>
        <Route exact={true} path={routes.FRONT} component={MainScreen} />
        <Route path={routes.LOGIN} component={LoginScreen} />
        <Route path={routes.SIGNUP} component={SignupScreen} />
        <Route
          path={routes.EMAIL_ACTIVATION}
          component={EmailActivationScreen}
        />
        <Route
          path={routes.PASSWORD_RECOVERY}
          component={PasswordRecoveryScreen}
        />
        <Route path={routes.PROFILE} component={ProfileScreen} />
        <Redirect to={routes.FRONT} />
      </Switch>
    </SingleColumnLayout>
  </Container>
);
