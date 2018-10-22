import * as React from "react";
import { Route } from "react-router";

interface Props extends React.HTMLProps<HTMLButtonElement> {
  link?: string;
}

export const Button = (props: Props) => {
  // SHortcut for creating a link as a button
  if (props.link) {
    const { link, ...rest } = props;

    return (
      <Route>
        {({ history }) =>
          Button({
            onClick: () => history.push(link),
            ...rest
          })
        }
      </Route>
    );
  }

  return <button {...props} />;
};
