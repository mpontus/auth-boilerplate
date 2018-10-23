import cn from "classnames";
import * as React from "react";

interface Props {
  /**
   * Heading level
   */
  is?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const Heading: React.SFC<Props> = ({ is = "h3", children }) => (
  <h1
    className={cn("title", {
      "is-1": is === "h1",
      "is-2": is === "h2",
      "is-3": is === "h3",
      "is-4": is === "h4",
      "is-5": is === "h5",
      "is-6": is === "h6"
    })}
  >
    {children}
  </h1>
);
