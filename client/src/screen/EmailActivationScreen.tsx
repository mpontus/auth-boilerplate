import * as React from "react";
import { QueryParams } from "../component/QueryParams";
import { EmailActivationContainer } from "../container/EmailActivationContainer";
import { Heading } from "../component/Heading";
import { Section } from "../component/Section";

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
