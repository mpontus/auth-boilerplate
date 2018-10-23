import * as React from "react";
import { Heading } from "../component/Heading";
import { QueryParams } from "../component/QueryParams";
import { Section } from "../component/Section";
import { EmailActivationContainer } from "../container/EmailActivationContainer";

export const EmailActivationScreen = () => (
  <Section>
    <Heading>Email Activation</Heading>
    <QueryParams>
      {({ query }) => (
        <EmailActivationContainer
          code={typeof query.code === "string" ? query.code : undefined}
        />
      )}
    </QueryParams>
  </Section>
);
