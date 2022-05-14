module.exports = ({ file, options, env }) => {
  return {
    plugins: [
      require("postcss-import"),
      require("tailwindcss/nesting"),
      require("tailwindcss"),
      require("autoprefixer")
    ],
  };
};
