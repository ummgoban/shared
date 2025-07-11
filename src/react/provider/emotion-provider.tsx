import {Theme, ThemeProvider} from '@emotion/react';
import React from 'react';

export const EmotionProvider = ({theme, children}: React.PropsWithChildren<{theme: Theme}>) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
