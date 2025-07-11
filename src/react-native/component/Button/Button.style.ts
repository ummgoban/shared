import styled from '@emotion/native';

import {theme} from '@/emotion/theme';

const S = {
  Button: styled.TouchableOpacity<{themeColor: keyof (typeof theme)['colors']}>`
    padding: 12px 24px;
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: background-color opacity 0.3s ease-in-out;

    ${({themeColor, theme}) => {
      const defaultColorStyle = [`background-color: ${theme.colors[themeColor]};`];

      if (themeColor.startsWith('secondary')) {
        defaultColorStyle.push(`border: 1px solid ${theme.colors.dark};`);
      }

      return defaultColorStyle.join(';');
    }}

    ${({disabled}) => disabled && 'opacity: 0.5;'}
  `,
  Text: styled.Text<{themeColor: keyof (typeof theme)['colors']}>`
    ${({themeColor}) => {
      if (themeColor.startsWith('secondary')) {
        return `color: ${theme.colors.dark};`;
      }
      return `color: ${theme.colors.secondary};`;
    }}
    font-size: 16px;
    font-weight: bold;
  `,
};

export default S;
