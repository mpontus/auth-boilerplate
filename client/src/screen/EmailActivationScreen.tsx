import * as React from "react";
import { DocumentTitle } from "../component/DocumentTitle";
import { Heading } from "../component/Heading";
import { QueryParams } from "../component/QueryParams";
import { Section } from "../component/Section";
import { EmailActivationContainer } from "../container/EmailActivationContainer";

export const EmailActivationScreen = () => (
  <DocumentTitle title="Activate Your Email">
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
  </DocumentTitle>
);
