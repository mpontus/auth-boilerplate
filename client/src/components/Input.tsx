import * as React from "react";

interface Props extends React.HTMLProps<HTMLInputElement> {
  label: string;
  error: string;
}

export const Input = ({ label, error, ...rest }: Props) => {
  return (
    <div>
      <div>
        <label>{label}</label>
      </div>
      <input {...rest} />
      <div>{error}</div>
    </div>
  );
};
