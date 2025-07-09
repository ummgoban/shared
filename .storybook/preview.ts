import type {Preview} from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    reactNative: {
      // React Native 옵션 설정
    },
  },
};

export default preview;
