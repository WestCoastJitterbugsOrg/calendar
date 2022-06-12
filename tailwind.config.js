const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

// Remove deprecated colors to get rid of compilation warnings
const deprecatedColors = [
  "lightBlue",
  "warmGray",
  "trueGray",
  "coolGray",
  "blueGray",
];
for (const color of deprecatedColors) {
  delete colors[color];
}

function rem2px(input, fontSize = 16) {
  if (input == null) {
    return input;
  }
  switch (typeof input) {
    case "object":
      if (Array.isArray(input)) {
        return input.map((val) => rem2px(val, fontSize));
      } else {
        const ret = {};
        for (const key in input) {
          ret[key] = rem2px(input[key]);
        }
        return ret;
      }
    case "string":
      return input.replace(
        /(\d*\.?\d+)rem$/,
        (_, val) => parseFloat(val) * fontSize + "px"
      );
    default:
      return input;
  }
}

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: ["src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media",
  theme: rem2px({
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      transitionProperty: {
        maxh: "max-height",
      },
    },
    ...defaultTheme,
    colors: ({ theme }) => ({
      ...colors,
      primary: theme("wcj-black"),
      secondary: theme("wcj-cyan"),
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
  }),
  variants: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
