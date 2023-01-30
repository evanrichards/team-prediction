module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  // corePlugins: {
  //   preflight: false,
  // },
  plugins: [
    require('@tailwindcss/typography'),
    require('@catppuccin/tailwindcss')({
      prefix: false,
      defaultFlavour: 'macchiato',
    }),
  ],
};
