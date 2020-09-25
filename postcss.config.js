module.exports = {
  plugins: [
    require('autoprefixer')({
      "grid": true
    }),
    require('postcss-custom-properties')({
      preserve: false,
      importFrom: [
        'src/style/fullcalendar-vars.css' 
      ]
    }),
    require('postcss-calc')
  ]
};