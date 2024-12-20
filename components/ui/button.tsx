import Image from "next/image";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "transparent";
  icon?: {
    src: string;
    alt: string;
  };
  fullWidth?: boolean;
  noPadding?: boolean;
}

export function Button({
  children,
  variant = "primary",
  icon,
  fullWidth = false,
  noPadding = false,
  className = "",
  ...props
}: ButtonProps) {
  const variantStyles = {
    primary: "bg-primary text-white hover:bg-blue-600",
    secondary: "bg-zinc-700 text-white hover:bg-zinc-600",
    transparent: "bg-transparent text-zinc-500 hover:text-zinc-300",
  };

  return (
    <button
      className={`
        flex items-center justify-center gap-2 
        ${!noPadding ? "px-4 py-3" : ""} 
        rounded-lg 
        transition-colors
        ${variantStyles[variant]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {icon && <Image src={icon.src} alt={icon.alt} width={16} height={16} />}
      {children}
    </button>
  );
}
