import React from "react";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = ({ children, ...props }: LabelProps) => (
  <label
    className="block text-sm/6 font-medium text-gray-700 sr-only"
    {...props}
  >
    {children}
  </label>
);
