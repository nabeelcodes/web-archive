import { ComponentPropsWithRef, ReactNode } from "react";

import FlexBox from "./FlexBox";
import { cn } from "@/utils/helper";

type TextareaProps = ComponentPropsWithRef<"textarea"> & {
  fullWidth?: boolean;
  suffix?: ReactNode;
};

const Textarea = ({ className, ref, suffix, fullWidth = false, ...props }: TextareaProps) => {
  return (
    <FlexBox className={cn("relative", { "w-full": fullWidth })}>
      <textarea
        className={cn(
          "text-p",
          "rounded-lg px-16 py-8",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "bg-transparent text-neutral-900 placeholder:text-neutral-500",
          "border border-neutral-400 ring-offset-neutral-300 focus:ring-2 focus:ring-neutral-200 focus:ring-offset-2 focus-visible:outline-none",
          { "w-full": fullWidth },
          { "pr-40": suffix },
          className
        )}
        ref={ref}
        {...props}
      />

      {suffix && <div className='absolute right-8 top-8 flex items-start px-16'>{suffix}</div>}
    </FlexBox>
  );
};

export default Textarea;

type TextareaLabelProps = ComponentPropsWithRef<"label"> & {
  required?: boolean;
};

export const TextareaLabel = ({
  children,
  className,
  required = false,
  ...props
}: TextareaLabelProps) => {
  return (
    <label
      className={cn("mb-4 inline-block text-small font-medium text-neutral-700", className)}
      {...props}>
      {children}
      {required && <span className='text-red-500'>*</span>}
    </label>
  );
};
