import '@emotion/react';
import theme from './theme';

type ThemeTpye = typeof theme;

declare module '@emotion/react' {
  export type Theme = ThemeTpye;
}
