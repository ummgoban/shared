import type {Preview} from '@storybook/react-vite';

import {EmotionProvider} from '@/react/provider';
import {theme} from '@/emotion/theme';

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
  decorators: [
    Story => (
      <EmotionProvider theme={theme}>
        <Story />
      </EmotionProvider>
    ),
  ],
};

export default preview;
