import { ComponentProps } from "react";
import { X } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface DeleteButtonProps extends ComponentProps<"button"> {
  className?: string;
}

export default function DeleteButton({
  className,
  ...props
}: DeleteButtonProps) {
  return (
    <button
      className={twMerge(
        "right-0 top-0 rounded-full bg-rose-500 p-1 text-white shadow-sm",
        className
      )}
      type="button"
      {...props}
    >
      <X className="h-4 w-4" />
    </button>
  );
}
