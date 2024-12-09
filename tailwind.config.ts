import type { Config } from "tailwindcss";

import twAnimate from "tailwindcss-animate";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0052ff",
        secondary: "#c5dafc",
      },
    },
  },
  plugins: [twAnimate],
} satisfies Config;
