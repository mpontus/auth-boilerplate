import * as React from "react";

/**
 * Text block component
 */
export const Paragraph: React.SFC<
  React.HTMLProps<HTMLParagraphElement>
> = props => <p {...props} />;
