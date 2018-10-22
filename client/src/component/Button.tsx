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
  // Loading flag should provide progress indicator
  if (props.loading !== undefined) {
    const { loading, ...rest } = props;

    return loading
      ? Button({ ...rest, disabled: true, children: "Loading..." })
      : Button(rest);
  }

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

  return <button {...props} />;
};
