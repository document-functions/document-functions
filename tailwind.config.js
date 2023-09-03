const felt = '31, 114, 70'; // #1f7246

module.exports = {
  content: ['./src/**/*.{html,js}'],
  important: true,
  theme: {
    extend: {
      colors: {
        orientals: '#0050cf',
        forest: '#324191',
        mercury: '#ebebeb',
        teal: '#ababab',
        dove: '#6c6c6c',
        felt: {
          '01': `rgba(${felt}, .1)`,
          DEFAULT: `rgba(${felt})`,
        },
        grand: '#85be9f',
        gravity: '#e0e0e0',
      },
    },
  },
  plugins: [],
};
