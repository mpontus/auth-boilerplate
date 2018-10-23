import cn from "classnames";
import * as React from "react";
import { Route } from "react-router";

interface Props extends React.HTMLProps<HTMLButtonElement> {
  /**
   * Shortcut for using button as a link
   */
  link?: string;

  /**
   * Specifies that request is in progress and the button should be disabled
   */
  loading?: boolean;
}

/**
 * Generic button
 */
export const Button: React.SFC<Props> = props => {
  // Shortcut for creating a link as a button
  if (props.link) {
    const { link, ...rest } = props;

    return (
      <Route>
        {({ history }) =>
          Button({ ...rest, onClick: () => history.push(link) })
        }
      </Route>
    );
  }

  const { loading, className, ...rest } = props;

  return (
    <button
      {...rest}
      className={cn("button", className, {
        "is-loading": loading
      })}
    />
  );
};
