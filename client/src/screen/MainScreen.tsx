import * as React from "react";
import { Button } from "../component/Button";
import { Paragraph } from "../component/Paragraph";
import { Section } from "../component/Section";
import { AuthGate } from "../container/AuthGate";
import { CurrentUserProvider } from "../container/CurrentUserProvider";
import * as routes from "../routes";

export const MainScreen = () => (
  <Section>
    <AuthGate isAuthenticated={false} isAnonymous={true}>
      <Paragraph>
        <Button link={routes.LOGIN}>Login</Button>
      </Paragraph>
    </AuthGate>
    <AuthGate isAnonymous={false}>
      <Paragraph>
        <Button link={routes.PROFILE}>Profile</Button>
      </Paragraph>
      <Paragraph>
        <CurrentUserProvider>
          {({ onLogout }) => <Button onClick={onLogout}>Logout</Button>}
        </CurrentUserProvider>
      </Paragraph>
    </AuthGate>
  </Section>
);
