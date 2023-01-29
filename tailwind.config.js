module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  // corePlugins: {
  //   preflight: false,
  // },
  plugins: [
    require('@catppuccin/tailwindcss')({
      prefix: false,
      defaultFlavour: 'macchiato',
    }),
    require('flowbite/plugin'),
  ],
};
