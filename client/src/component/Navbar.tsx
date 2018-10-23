import * as React from "react";
import { Link } from "react-router-dom";
import * as routes from "../routes";

export const Navbar: React.SFC = ({ children }) => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="container is-widescreen">
      <div className="navbar-brand is-pulled-left">
        <Link className="navbar-item" to={routes.HOME}>
          <span className="subtitle is-5">Home</span>
        </Link>
      </div>
      <div className="navbar-end is-pulled-right">
        <div className="navbar-item">
          <div className="buttons">{children}</div>
        </div>
      </div>
    </div>
  </nav>
);
