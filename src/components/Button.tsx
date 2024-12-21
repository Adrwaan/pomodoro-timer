import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="rounded-md border border-white/50 text-white min-w-max h-max py-1 px-2 hover:bg-white hover:text-black/60 transition-colors duration-300"
      {...props}
    >
      {children}
    </button>
  );
}
