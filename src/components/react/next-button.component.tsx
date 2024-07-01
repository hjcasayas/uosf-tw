import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn.util";

export interface NextButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const NextButton = ({
  className = '',
  ...restProps
}: NextButtonProps) => {
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
        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
      </svg>
    </button>
  );
};
