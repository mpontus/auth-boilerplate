import * as React from "react";

export const SingleColumnLayout: React.SFC = ({ children }) => (
  <div className="container is-fluid is-mobile">
    <div className="columns is-desktop is-centered">
      <div className="column is-half">
        <section className="section">{children}</section>
      </div>
    </div>
  </div>
);
