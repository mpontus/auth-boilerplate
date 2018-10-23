import * as React from "react";

export const Section: React.SFC = ({ children }) => (
  <div className="columns">
    <div className="column">{children}</div>
  </div>
);
