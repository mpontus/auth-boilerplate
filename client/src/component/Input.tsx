import cn from "classnames";
import * as React from "react";

interface Props extends React.HTMLProps<HTMLInputElement> {
  label: string;
  error: string;
}

export const Input = ({ label, error, className, ...rest }: Props) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input className={cn("input", className)} type="text" {...rest} />
      </div>
      {error && <p className="help is-danger">{error}</p>}
    </div>
  );
};
