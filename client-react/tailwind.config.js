module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },

    maxHeight: {
      '0': '0',
      '1/5': '20%',
      '1/4': '25%',
      '2/5': '40%',
      '1/2': '50%',
      '3/5': '60%',
      '3/4': '75%',
      '4/5': '80%',
      'full': '100%',
    },
    maxWidth: {
      '0': '0',
      '1/5': '20%',
      '1/4': '25%',
      '2/5': '40%',
      '1/2': '50%',
      '3/5': '60%',
      '3/4': '75%',
      '4/5': '80%',
      'full': '100%',
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#1D1D1B',
      'secondary': '#349995',
      'danger': '#AB2814',
      'wcj-cyan': '#349995',
      'wcj-red': '#AB2814',
      'wcj-sand': '#FFFAF2',
      'wcj-black': '#1D1D1B',
      'wcj-coral': '#EC6350',
      'wcj-mint': '#73BDBA',
      'wcj-red-hover': '#cb2f18'
    }),
    fontFamily: {
      'sans': ['Raleway', 'ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
