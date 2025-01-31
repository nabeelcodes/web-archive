"use client";

import { MotionProps, motion } from "motion/react";
import { ComponentPropsWithRef } from "react";

import { cn, matches } from "@/utils/helper";

type ButtonProps = ComponentPropsWithRef<"button"> &
  Omit<MotionProps, "variants"> & {
    variant?: "primary" | "secondary" | "outline";
    size?: "small" | "default" | "large";
    weight?: "normal" | "medium" | "semibold" | "bold";
    shape?: "circle" | "rounded";
  };

const Button = ({ children, className, variant = "primary", size = "default", weight = "medium", ref, shape = "rounded", ...props }: ButtonProps) => (
  <motion.button
    ref={ref}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={cn(
      "grid place-items-center",
      "disabled:pointer-events-none disabled:bg-neutral-700 disabled:text-neutral-400",
      "transition-colors ease-in-out",
      {
        "bg-neutral-200 text-black": matches(variant, "primary"),
        "bg-neutral-700 text-white": matches(variant, "secondary"),
        "border border-neutral-400 text-neutral-900 disabled:border-neutral-600 disabled:bg-black disabled:text-neutral-400": matches(
          variant,
          "outline"
        )
      },
      {
        "h-9 rounded-md px-12 text-small": matches(size, "small"),
        "h-10 rounded-lg px-16 text-p": matches(size, "default"),
        "h-11 rounded-lg px-24 text-p": matches(size, "large")
      },
      {
        "font-normal": matches(weight, "normal"),
        "font-medium": matches(weight, "medium"),
        "font-semibold": matches(weight, "semibold"),
        "font-bold": matches(weight, "bold")
      },
      {
        "aspect-square h-auto rounded-full": matches(shape, "circle")
      },
      className
    )}
    {...props}>
    {children}
  </motion.button>
);

export default Button;
