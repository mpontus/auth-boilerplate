import * as React from "react";
import { Link } from "react-router-dom";
import * as routes from "../routes";

export const Navbar: React.SFC = ({ children }) => (
  <div className="container is-widescreen">
    <nav className="navbar level is-mobile">
      <div className="level-left">
        <div className="level-item">
          <Link to={routes.HOME}>
            <span className="subtitle is-5">Home</span>
          </Link>
        </div>
      </div>
      <div className="level-right">
        <div className="level-item">
          <div className="buttons">{children}</div>
        </div>
      </div>
    </nav>
  </div>
);
