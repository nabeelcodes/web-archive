import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import { colors } from "@/designSystem/tokens/colors";
import { tailwindSpacingTokens } from "@/designSystem/tokens/spacings";
import { tailwindFontSizeTokens } from "@/designSystem/tokens/typography";
import { borderRadiusTokens, breakpoints, transitionTimings, zIndexTokens } from "@/designSystem/tokens/misc";

const variants = Object.keys(breakpoints);

export default {
  content: ["@/components/**/*.{js,ts,jsx,tsx,mdx}", "@/app/**/*.{js,ts,jsx,tsx,mdx}"],
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
