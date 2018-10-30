import * as React from "react";
import { Heading } from "../component/Heading";
import { QueryParams } from "../component/QueryParams";
import { Section } from "../component/Section";
import { PasswordRecoveryContainer } from "../container/PasswordRecoveryContainer";
import { DocumentTitle } from "src/component/DocumentTitle";

export const PasswordRecoveryScreen = () => (
  <DocumentTitle title="Recover Your Password">
    <Section>
      <Heading>Password Recovery</Heading>
      <QueryParams>
        {({ query }) => (
          <PasswordRecoveryContainer
            code={typeof query.code === "string" ? query.code : undefined}
          />
        )}
      </QueryParams>
    </Section>
  </DocumentTitle>
);
