const defaultColors = require("tailwindcss/colors");
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
  delete defaultColors[color];
}

const customColors = {
  primary: "var(--cw-color-primary, #AB2814)",
  secondary: "var(--cw-color-secondary, #349995)",
  "primary-alt": "var(--cw-color-primary-alt, #EC6350)",
  "secondary-alt": "var(--cw-color-secondary-alt, #73BDBA)",
  dark: "var(--cw-color-dark, #1D1D1B)",
  light: "var(--cw-color-light, #FFFAF2)",
};

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
      brightness: {
        lighter: "1.185",
        darker: "0.815",
      },
    },
    ...defaultTheme,
    colors: {
      ...defaultColors,
      ...customColors,
    },
    fontFamily: {
      sans: ["Raleway", "ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: [
        "ui-monospace",
        "SFMono-Regular",
        "Andale Mono",
        "Courier New",
        "Courier",
      ],
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
