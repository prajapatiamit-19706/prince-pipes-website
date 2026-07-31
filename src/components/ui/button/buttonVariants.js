import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const buttonVariants = ({ variant = "primary", size = "default", className = "" } = {}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-600",
    secondary: "border border-border bg-transparent hover:bg-surface text-text-primary",
    ghost: "bg-transparent hover:bg-surface text-text-primary",
    text: "bg-transparent underline-offset-4 hover:underline text-primary",
  };

  const sizes = {
    default: "h-10 py-2 px-4 rounded-md",
    sm: "h-9 px-3 rounded-md text-sm",
    lg: "h-11 px-8 rounded-md text-lg",
    icon: "h-10 w-10 rounded-md",
  };

  return cn(
    baseStyles,
    variants[variant] || variants.primary,
    sizes[size] || sizes.default,
    className
  );
};
