import { ComponentPropsWithRef, ReactNode } from "react";
import { cn, matches } from "@/utils/helper";
import FlexBox from "./FlexBox";

type InputProps = ComponentPropsWithRef<"input"> & {
  fullWidth?: boolean;
  suffix?: ReactNode;
  shape?: "pill" | "rounded";
};

const Input = ({ className, type, ref, suffix, fullWidth = false, shape = "rounded", ...props }: InputProps) => {
  return (
    <FlexBox className={cn("relative", { "w-full": fullWidth })}>
      <input
        type={type}
        className={cn(
          "text-p",
          "h-10 rounded-lg px-16 py-8",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "bg-transparent text-neutral-900 placeholder:text-neutral-700",
          "border border-neutral-400 ring-offset-neutral-300 focus:ring-2 focus:ring-neutral-200 focus:ring-offset-2 focus-visible:outline-none",
          { "w-full": fullWidth },
          { "pr-40": suffix },
          { "rounded-3xl": matches(shape, "pill") },
          className
        )}
        ref={ref}
        {...props}
      />

      {suffix && <div className='absolute right-0 top-0 flex h-full items-center px-16'>{suffix}</div>}
    </FlexBox>
  );
};

export default Input;

type InputLabelProps = ComponentPropsWithRef<"label"> & {
  required?: boolean;
};

export const InputLabel = ({ children, className, required = false, ...props }: InputLabelProps) => {
  return (
    <label className={cn("mb-6 inline-block text-p font-medium text-neutral-200", className)} {...props}>
      {children}
      {required && <span className='text-red-500'>*</span>}
    </label>
  );
};
