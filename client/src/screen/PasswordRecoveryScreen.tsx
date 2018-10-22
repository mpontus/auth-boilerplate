import * as React from "react";
import { QueryParams } from "../component/QueryParams";
import { PasswordRecoveryContainer } from "../container/PasswordRecoveryContainer";

export const PasswordRecoveryScreen = () => (
  <QueryParams>
    {({ query }) => (
      <PasswordRecoveryContainer
        code={typeof query.code === "string" ? query.code : undefined}
      />
    )}
  </QueryParams>
);
