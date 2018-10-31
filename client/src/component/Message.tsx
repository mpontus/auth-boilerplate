import cn from "classnames";
import * as React from "react";

interface Props {
  type?: "success" | "error";
  error?: Error;
}

export const Message: React.SFC<Props> = props => {
  if (props.error !== undefined) {
    // Shortcut for passing error object
    const { error, ...rest } = props;

    return Message({
      ...rest,
      type: "error",
      children: error.message
    });
  } else if (props.children === undefined) {
    return null;
  } else {
    const { type, children } = props;

    return (
      <div
        className={cn("notification", {
          "is-info": type === undefined,
          "is-success": type === "success",
          "is-warning": type === "error"
        })}
      >
        {children}
      </div>
    );
  }
};
