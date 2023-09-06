const felt = '31, 114, 70'; // #1f7246
const orientals = '0, 80, 207'; // '#0050cf'

module.exports = {
  content: ['./src/**/*.{html,js}'],
  important: true,
  theme: {
    extend: {
      colors: {
        orientals: {
          '03': `rgba(${orientals}, .3)`,
          DEFAULT: `rgba(${orientals})`,
        },
        felt: {
          '01': `rgba(${felt}, .1)`,
          DEFAULT: `rgba(${felt})`,
        },
        forest: '#324191',
        mercury: '#ebebeb',
        teal: '#ababab',
        dove: '#6c6c6c',
        grand: '#85be9f',
        gravity: '#e0e0e0',
        honey: '#fb0002',
      },
    },
  },
  plugins: [],
};
