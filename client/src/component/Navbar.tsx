import * as React from "react";

// export const Navbar: React.SFC = ({ children }) => (
//   <nav className="navbar is-mobile">
//     <div className="navbar-brand">
//       <div className="navbar-item">
//         <span className="title is-4">Hello!</span>
//       </div>
//     </div>
//     <div className="navbar-end">
//       <div className="navbar-item">
//         <div className="buttons">{children}</div>
//       </div>
//     </div>
//   </nav>
// );

export const Navbar: React.SFC = ({ children }) => (
  <div className="container is-widescreen">
    <nav className="navbar level is-mobile">
      <div className="level-left">
        <div className="level-item">
          <span className="subtitle is-5">Home</span>
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
