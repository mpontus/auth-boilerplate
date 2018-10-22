import * as React from "react";
import { QueryParams } from "../component/QueryParams";
import { EmailActivationContainer } from "../container/EmailActivationContainer";

export const EmailActivationScreen = () => (
  <QueryParams>
    {({ query }) => (
      <EmailActivationContainer
        code={typeof query.code === "string" ? query.code : undefined}
      />
    )}
  </QueryParams>
);
