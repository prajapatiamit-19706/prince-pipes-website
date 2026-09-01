"use client";

import { forwardRef } from "react";
import { buttonVariants } from "./buttonVariants";

import { PrinceLoader } from "@/components/ui/loader/PrinceLoader";

const Button = forwardRef(({ className, variant, size, isLoading, loadingText, children, disabled, ...props }, ref) => {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      ref={ref}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <PrinceLoader size="sm" variant="button" />
          {loadingText || children}
        </span>
      ) : (
        children
      )}
    </button>
  );
});

Button.displayName = "Button";

export { Button };
