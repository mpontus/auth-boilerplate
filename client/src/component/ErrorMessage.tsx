import * as React from "react";

export const ErrorMessage: React.SFC = ({ children }) => (
  <div className="notification is-danger">{children}</div>
);
