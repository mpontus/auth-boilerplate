import * as React from "react";

export const SingleColumnLayout: React.SFC = ({ children }) => (
  <section className="section" style={{ flex: 1 }}>
    <div className="container is-fluid is-mobile">
      <div className="columns is-desktop is-centered">
        <div className="column is-half has-background-white">{children}</div>
      </div>
    </div>
  </section>
);
