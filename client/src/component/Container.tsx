import * as React from "react";

export const Container: React.SFC = ({ children }) => (
  <div
    className="has-background-white"
    style={{ height: "100%", display: "flex", flexDirection: "column" }}
  >
    {children}
  </div>
);
