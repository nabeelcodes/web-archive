import { extendTailwindMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";
import { SearchParams } from "nuqs";
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

/**
 * The fetchOptions function in TypeScript creates and returns options for making HTTP requests with
 * specified method, body, and signal.
 * @param {FetchOptionsArgs} [args] - The `args` parameter in the `fetchOptions` function is an
 * optional object that can contain the following properties:
 * @returns The function `fetchOptions` returns an object of type `Options` with the specified method,
 * headers, body, and signal based on the provided arguments or default values.
 */
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

/**
 * The `copyToClipboard` function copies the specified text or the value of an HTML element to the
 * clipboard.
 * @param  - The `copyToClipboard` function takes an object as a parameter with two properties:
 */
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

/**
 * The `matches` function in TypeScript compares two items for strict equality.
 * @param {unknown} item1 - The `item1` parameter is of type `unknown`, which means that its type is
 * not known at compile time. It could be any type of value.
 * @param {unknown} item2 - The `item2` parameter is the second item that will be compared for equality
 * in the `matches` function.
 */
export const matches = (item1: unknown, item2: unknown) => item1 === item2;

/* The `const twMerge = extendTailwindMerge({ ... })` statement is configuring the `twMerge` function
to extend Tailwind CSS utility classes with additional custom classes related to font sizes. */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: Object.keys(tailwindFontSizeTokens) }]
    }
  }
});

/**
 * The function `cn` in TypeScript merges multiple class names into a single string.
 * @param {ClassValue[]} classNames - The `classNames` parameter is an array of class names or class
 * values that you want to combine and merge together.
 * @returns The `cn` function returns a string (tailwind classes). It takes in an array of class names and merges them
 * using the `clsx` function and `twMerge` function.
 */
export const cn = (...classNames: ClassValue[]) => {
  return twMerge(clsx(...classNames));
};

/**
 * The function `breakpointAsNumber` takes a breakpoint key from a theme object, retrieves the
 * corresponding value, removes "px", and returns it as a number.
 * @param breakpoint - The `breakpoint` parameter in the `breakpointAsNumber` function is expected to
 * be a key of the `theme.breakpoints` object. This key represents a specific breakpoint defined in the
 * theme configuration.
 * @returns The function `breakpointAsNumber` takes a breakpoint key as input and returns the numerical
 * value of that breakpoint without the "px" unit.
 */
export const breakpointAsNumber = (breakpoint: keyof typeof theme.breakpoints) => {
  const breakpointValue = theme.breakpoints[breakpoint];
  return parseInt(breakpointValue.replace("px", ""));
};

/**
 * The scrollToTop function scrolls the window to the top smoothly.
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
};

/**
 * The function `getUrlQueryParams` extracts query parameters from the URL's `searchParams`, checks if
 * any of them is an Array. If even one of them is an Array then the function returns empty object, else
 * it returns the url query params.
 * @param searchParams - A Promise that resolves to an object containing the following properties:
 * query (string), tags (string), page (number), and timedOut (boolean).
 * @returns The function `getUrlQueryParams` returns an object containing the properties `query`,
 * `tags`, `page`, and `timedOut` from the resolved `searchParams` Promise. If any of `query`, `tags`,
 * or `page` are arrays, an empty object is returned.
 */
export const getUrlQueryParams = async (searchParams: Promise<SearchParams>) => {
  const { query, tags, page, timedOut } = await searchParams;

  if (Array.isArray(query) || Array.isArray(tags) || Array.isArray(page)) {
    return {};
  }

  return { query, tags, page, timedOut };
};

// TODO: Export "loginChecker" from here
// export const loginChecker = async ({
//   verifyToken
// }: {
//   verifyToken: () => Promise<{
//     success: boolean;
//   }>;
// }) => {
//   const { success } = await verifyToken();
//   // Do nothing if user logged in
//   if (!success) {
//     // user NOT logged in
//     toast.error("Please login again", {
//       description: "User timed out!"
//     });
//     reset();
//     // TODO : close modal
//     signOut({ redirect: false });
//   }
// };
