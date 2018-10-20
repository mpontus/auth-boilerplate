import * as React from "react";

interface Props extends React.HTMLProps<HTMLButtonElement> {}

export const Button = (props: Props) => <button {...props} />;
