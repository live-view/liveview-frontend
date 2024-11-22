import type { Config } from "tailwindcss";

import twAnimate from "tailwindcss-animate";

export default {
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [twAnimate],
} satisfies Config;
