import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";

export type ButtonProps = {
  variant?: "default" | "primary" | "secondary";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  type,
  onClick,
  children,
}) => {
  const btnCls = clsx(
    "text-sm font-medium px-6 py-4 rounded-lg border border-stone-600 transition-colors",
    {
      "bg-stone-600 text-utility-light hover:bg-stone-700":
        variant === "primary",
      "text-primary": variant === "secondary",
      "bg-white text-stone-600 hover:bg-stone-100": variant === "default",
    }
  );

  return (
    <button className={btnCls} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
