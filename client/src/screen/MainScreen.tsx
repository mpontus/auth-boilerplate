import * as React from "react";
import { Button } from "../component/Button";
import { Paragraph } from "../component/Paragraph";
import { Section } from "../component/Section";
import { AuthRoute } from "../container/AuthRoute";
import { CurrentUserProvider } from "../container/CurrentUserProvider";
import * as routes from "../routes";

export const MainScreen = () => (
  <Section>
    <AuthRoute isAuthenticated={false} isAnonymous={true}>
      <Paragraph>
        <Button link={routes.LOGIN}>Login</Button>
      </Paragraph>
    </AuthRoute>
    <AuthRoute isAnonymous={false}>
      <Paragraph>
        <Button link={routes.PROFILE}>Profile</Button>
      </Paragraph>
      <Paragraph>
        <CurrentUserProvider>
          {({ onLogout }) => <Button onClick={onLogout}>Logout</Button>}
        </CurrentUserProvider>
      </Paragraph>
    </AuthRoute>
  </Section>
);
