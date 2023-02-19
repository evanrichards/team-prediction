// .storybook/preview.js
import '../src/styles/global.css';

export const parameters = {
  backgrounds: {
    default: 'dark',
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
