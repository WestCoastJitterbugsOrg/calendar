const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: ["src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media", // 'class'
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      transitionProperty: {
        maxh: "max-height",
      },
    },
    minHeight: {
      4: "16px",
      8: "32px",
      screen: "100vh",
    },
    maxHeight: {
      0: "0",
      "1/5": "20%",
      "1/4": "25%",
      "2/5": "40%",
      "1/2": "50%",
      "3/5": "60%",
      "3/4": "75%",
      "4/5": "80%",
      full: "100%",
      screen: "100vh",
    },
    maxWidth: {
      0: "0",
      "1/5": "20%",
      "1/4": "25%",
      "2/5": "40%",
      "1/2": "50%",
      "3/5": "60%",
      "3/4": "75%",
      "4/5": "80%",
      full: "100%",
      screen: "100vw",
    },
    colors: ({ theme }) => ({
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.neutral,
      primary: theme("wcj-black"),
      secondary: theme("wcj-cyan"),
      danger: theme("red"),
      "wcj-cyan": "#349995",
      "wcj-red": "#AB2814",
      "wcj-sand": "#FFFAF2",
      "wcj-black": "#1D1D1B",
      "wcj-coral": "#EC6350",
      "wcj-mint": "#73BDBA",
      "wcj-red-hover": "#CB2F18",
      "wcj-red-active": "#7D1D0F",
    }),
    fontFamily: {
      sans: ["Raleway", "ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
