import { ComponentProps } from "react";
import { X } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface DeleteButtonProps extends ComponentProps<"button"> {
  className?: string;
}

export default function DeleteButton({ className, ...props }: DeleteButtonProps) {
  return (
    <button
      className={twMerge(
        "bg-rose-500 text-white p-1 rounded-full shadow-sm top-0 right-0",
        className
      )}
      type="button"
      {...props}
    >
      <X className="h-4 w-4" />
    </button>
  );
}
