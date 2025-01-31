import React, { ComponentPropsWithRef, ElementType } from "react";

import { cn } from "@/utils/helper";

const LayoutContainer = ({ children, className, ref, tag: Element = "div", ...props }: ComponentPropsWithRef<"div"> & { tag?: ElementType }) => (
  <Element ref={ref} className={cn("mx-auto w-full max-w-screen-xl px-2048", className)} {...props}>
    {children}
  </Element>
);

export default LayoutContainer;
