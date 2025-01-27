import clsx, { ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { tailwindFontSizeTokens } from "@/designSystem/tokens/typography";

import { theme } from "@/designSystem/theme";

type FetchOptionsArgs = {
  method?: string;
  body?: unknown;
  token?: string | null;
  signal?: AbortSignal | null;
};

type Options = {
  method: string;
  headers: {
    accept: string;
    "content-type": string;
  };
  body?: string;
  signal?: AbortSignal;
};

export const fetchOptions = (args?: FetchOptionsArgs): Options => {
  const { method = "GET", body = null, signal = null } = args ?? {};

  const options: Options = {
    method,
    headers: {
      accept: "application/json",
      "content-type": "application/json;charset=utf-8"
    }
  };

  if (body) options.body = JSON.stringify(body);
  if (signal) options.signal = signal;

  return options;
};

export const copyToClipboard = async ({ text, nodeId }: { text: string; nodeId: string }) => {
  try {
    let textToCopy;

    if (nodeId) {
      textToCopy = (document.getElementById(nodeId) as HTMLInputElement)?.value;
    } else {
      textToCopy = text || window.location.href;
    }

    await navigator.clipboard.writeText(textToCopy);
  } catch {
    throw new Error("error copying to clipboard");
  }
};

export const matches = (item1: unknown, item2: unknown) => item1 === item2;

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: Object.keys(tailwindFontSizeTokens) }]
    }
  }
});

export const cn = (...classNames: ClassValue[]) => {
  return twMerge(clsx(...classNames));
};

export const breakpointAsNumber = (breakpoint: keyof typeof theme.breakpoints) => {
  const breakpointValue = theme.breakpoints[breakpoint];
  return parseInt(breakpointValue.replace("px", ""));
};
