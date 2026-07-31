"use client";

import { forwardRef } from "react";
import { buttonVariants } from "./buttonVariants";

const Button = forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button };
