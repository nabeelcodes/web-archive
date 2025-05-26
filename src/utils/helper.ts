import { extendTailwindMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";
import { SearchParams } from "nuqs";

import { tailwindFontSizeTokens } from "@/designSystem/tokens/typography";
import { theme } from "@/designSystem/theme";
import apiEndpoints from "@/data/apiEndpoints";

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

/**
 * The function fetches metadata from a specified URL using Cloudflare Workers.
 * @param {string} url - The `url` parameter is a string that represents the URL for which you want to
 * fetch metadata.
 * @returns The function `fetchMetadataFromCFW` is returning the metadata fetched from the provided
 * URL.
 */
export const fetchMetadataFromCFW = async (url: string) => {
  try {
    const response = await fetch(apiEndpoints.metaData.getMetaDataFromUrl(url));

    if (!response.ok) {
      throw new Error(`Failed to fetch metadata: ${response.statusText}`);
    }

    const metadata = await response.json();
    return metadata;
  } catch (error) {
    console.error("Error fetching metadata:", error);
    throw error;
  }
};

/**
 * Result type for URL validation
 * Contains success status and either error message or null
 */
type URLValidationResult = {
  isValid: boolean;
  error: string | null;
};

/**
 * Validates whether a given string is a valid URL
 * Uses a combination of native URL constructor and regex for optimal performance
 *
 * @param url - The URL string to validate
 * @returns Object containing validation result and specific error message if invalid
 */
export const validateURL = (url: string): URLValidationResult => {
  // Early return for obviously invalid inputs to improve performance
  if (!url) {
    return {
      isValid: false,
      error: "URL cannot be null or undefined"
    };
  }

  if (typeof url !== "string") {
    return {
      isValid: false,
      error: "URL must be a string"
    };
  }

  if (url.length === 0) {
    return {
      isValid: false,
      error: "URL cannot be empty"
    };
  }

  // Quick length check - URLs longer than 2083 characters are generally not supported
  // by most browsers and servers (Internet Explorer limit)
  if (url.length > 2083) {
    return {
      isValid: false,
      error: "URL exceeds maximum length of 2083 characters"
    };
  }

  // Trim whitespace to handle common input errors
  const trimmedUrl = url.trim();

  if (trimmedUrl.length === 0) {
    return {
      isValid: false,
      error: "URL cannot be only whitespace"
    };
  }

  // Check for minimum viable URL structure using regex
  // Updated regex to handle IPv6 and international domains better
  const basicUrlPattern = /^https?:\/\/[\w\-\.:\[\]]+/i;

  // Quick regex check first (faster than URL constructor for obviously invalid URLs)
  if (!basicUrlPattern.test(trimmedUrl)) {
    return {
      isValid: false,
      error:
        "URL must have valid format (protocol://domain). Only http and https protocols are supported"
    };
  }

  try {
    // Use native URL constructor for comprehensive validation
    // This handles edge cases, encoding, and follows URL specification
    const urlObject = new URL(trimmedUrl);

    // Additional checks for common requirements
    // Ensure protocol is http or https (modify as needed for your use case)
    const validProtocols = new Set(["http:", "https:"]);
    if (!validProtocols.has(urlObject.protocol)) {
      return {
        isValid: false,
        error: `Invalid protocol '${urlObject.protocol}'. Only http and https are supported`
      };
    }

    // Ensure hostname exists and is not empty
    if (!urlObject.hostname || urlObject.hostname.length === 0) {
      return {
        isValid: false,
        error: "URL must contain a valid hostname"
      };
    }

    // Validate port if present
    if (urlObject.port && (parseInt(urlObject.port) < 1 || parseInt(urlObject.port) > 65535)) {
      return {
        isValid: false,
        error: `Invalid port '${urlObject.port}'. Port must be between 1 and 65535`
      };
    }

    // Check for valid hostname pattern (allows IPv6, IDN, and standard domains)
    // Skip detailed hostname validation for IPv6 addresses (enclosed in brackets)
    if (!urlObject.hostname.startsWith("[") && !urlObject.hostname.endsWith("]")) {
      // Check if hostname is a valid domain (must contain at least one dot for TLD)
      // Exception: 'localhost' is considered valid
      if (urlObject.hostname !== "localhost" && !urlObject.hostname.includes(".")) {
        return {
          isValid: false,
          error: `Invalid hostname '${urlObject.hostname}'. Domain must contain at least one dot (e.g., example.com) or be 'localhost'`
        };
      }

      // Additional check: ensure it's not just a single word without proper TLD
      if (urlObject.hostname !== "localhost" && urlObject.hostname.includes(".")) {
        const parts = urlObject.hostname.split(".");
        const tld = parts[parts.length - 1];

        // TLD must be at least 2 characters and contain only letters
        if (tld.length < 2 || !/^[a-zA-Z\u00a1-\uffff]{2,}$/.test(tld)) {
          return {
            isValid: false,
            error: `Invalid top-level domain '${tld}'. TLD must be at least 2 characters and contain only letters`
          };
        }

        // Check for empty domain parts (e.g., "example..com")
        if (parts.some((part) => part.length === 0)) {
          return {
            isValid: false,
            error: `Invalid hostname '${urlObject.hostname}'. Domain contains empty parts`
          };
        }
      }

      // Allow IDN domains and punycode with proper domain structure
      const hostnamePattern =
        /^[a-zA-Z0-9\u00a1-\uffff]([a-zA-Z0-9\u00a1-\uffff-]{0,61}[a-zA-Z0-9\u00a1-\uffff])?(\.[a-zA-Z0-9\u00a1-\uffff]([a-zA-Z0-9\u00a1-\uffff-]{0,61}[a-zA-Z0-9\u00a1-\uffff])?)*$/;
      if (!hostnamePattern.test(urlObject.hostname)) {
        return {
          isValid: false,
          error: `Invalid hostname '${urlObject.hostname}'. Hostname contains invalid characters or format`
        };
      }
    }

    // If we get here, the URL passed all validation checks
    return {
      isValid: true,
      error: null
    };
  } catch (error) {
    // URL constructor throws TypeError for invalid URLs
    const errorMessage = error instanceof Error ? error.message : "Unknown URL parsing error";
    return {
      isValid: false,
      error: `Invalid URL format: ${errorMessage}`
    };
  }
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
