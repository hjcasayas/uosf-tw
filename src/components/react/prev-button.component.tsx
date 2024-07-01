import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn.util";

export interface PrevButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const PrevButton = ({ className = '', ...restProps }: PrevButtonProps) => {
  return (
    <button
      className={cn("btn btn-circle bg-green text-white", className)}
      {...restProps}
    >
      <svg
        className="h-6 w-6 fill-current md:h-8 md:w-8"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
      </svg>
    </button>
  );
};
