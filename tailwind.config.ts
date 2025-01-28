import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import { colors } from "./src/designSystem/tokens/colors";
import { tailwindSpacingTokens } from "./src/designSystem/tokens/spacings";
import { tailwindFontSizeTokens } from "./src/designSystem/tokens/typography";
import { borderRadiusTokens, breakpoints, transitionTimings, zIndexTokens } from "./src/designSystem/tokens/misc";

const variants = Object.keys(breakpoints);

export default {
  content: ["./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  safelist: [
    { pattern: /grid-cols-/, variants },
    { pattern: /col-span-/, variants }
  ],
  theme: {
    colors,
    margin: {
      auto: "auto",
      ...tailwindSpacingTokens
    },
    padding: tailwindSpacingTokens,
    gap: tailwindSpacingTokens,
    fontSize: tailwindFontSizeTokens,
    borderRadius: borderRadiusTokens,
    screens: breakpoints,
    transitionDuration: transitionTimings,
    zIndex: zIndexTokens,
    fontFamily: {
      manrope: "var(--font-manrope)"
    }
  },
  plugins: [
    // ref: https://github.com/tailwindlabs/tailwindcss/discussions/1739#discussioncomment-9914554
    plugin(({ addVariant }) => {
      // detect hover
      addVariant("has-hover", "@media (hover: hover) and (pointer: fine)");
      addVariant("no-hover", "@media (hover: none) and (pointer: coarse)");

      // apply hover styles if the device has hover capabilities
      addVariant("can-hover", "@media (hover: hover) and (pointer: fine) { &:hover }");
      addVariant("group-can-hover", "@media (hover: hover) and (pointer: fine) { :merge(.group):hover & }");
    })
  ]
} satisfies Config;
