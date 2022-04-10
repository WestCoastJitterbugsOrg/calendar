module.exports = ({ file, options, env }) => {
  return {
    plugins: [
      require("postcss-import"),
      require("tailwindcss/nesting"),
      require("tailwindcss"),
      require("autoprefixer"),
      [
        "postcss-rem-to-pixel",
        {
          rootValue: 16,
          unitPrecision: 5,
          propList: ["*"],
          selectorBlackList: [],
          replace: true,
          mediaQuery: false,
          minRemValue: 0,
        },
      ],
    ],
  };
};
