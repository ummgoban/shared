import styled, {css} from '@emotion/native';

import {theme} from '@/emotion/theme';
import type {TextInputProps} from './TextInput.type';

const S = {
  Container: styled.View<{full: boolean}>`
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    flex-grow: 0;
    flex-basis: auto;

    ${({full}) => (full ? `width: 100%;` : 'width: max-content')}
  `,

  TextInputWrapper: styled.View<{labelPosition: Required<TextInputProps['labelPosition']>}>`
    display: flex;

    gap: 8px;

    ${({labelPosition}) => {
      if (!labelPosition) return '';
      const [mainPosition, subPosition] = labelPosition.split('-');
      const style: string[] = [];

      if (mainPosition === 'top' || mainPosition === 'bottom') {
        style.push(mainPosition === 'bottom' ? 'flex-direction: column-reverse' : 'flex-direction: column');

        if (subPosition === 'left') {
          style.push('align-items: flex-start');
        } else if (subPosition === 'right') {
          style.push('align-items: flex-end');
        } else {
          style.push('align-items: center');
        }
      } else if (mainPosition === 'left' || mainPosition === 'right') {
        style.push(mainPosition === 'right' ? 'flex-direction: row-reverse' : 'flex-direction: row');
        if (subPosition === 'top') {
          style.push('align-items: flex-start');
        } else if (subPosition === 'bottom') {
          style.push('align-items: flex-end');
        } else {
          style.push('align-items: center');
        }
      }
      return style.join(';');
    }}
  `,

  TextInputContainer: styled.View<{full: boolean; labelPosition: Required<TextInputProps['labelPosition']>}>`
    height: 48px;

    ${({full, labelPosition}) => {
      if (!full) return '';

      const [mainPosition] = labelPosition?.split('-') || [];

      return css`
        flex-shrink: 1;
        flex-grow: 1;
        flex-basis: auto;

        ${mainPosition === 'top' || mainPosition === 'bottom' ? 'width: 100%;' : ''}
      `;
    }}
  `,

  Label: styled.Text`
    width: max-content;
    ${theme.fonts.body1}
  `,

  TextInput: styled.TextInput<{
    condition: 'default' | 'error' | 'primary';
  }>`
    background-color: white;
    height: 48px;

    border-style: solid;
    border-width: 1px;

    outline-style: solid;
    outline-width: 1px;

    border-radius: 4px;

    margin: 2px;

    padding-horizontal: 8px;

    ${({condition, readOnly}) => {
      const readOnlyCss = readOnly ? `cursor: not-allowed; color: ${theme.colors.darkDisabled};` : '';
      switch (condition) {
        case 'default':
          const color = readOnly ? theme.colors.darkDisabled : theme.colors.dark;
          return `border-color: ${color}; outline-color: ${color}; ${readOnlyCss}`;
        case 'error':
          const errorColor = readOnly ? theme.colors.errorDisabled : theme.colors.error;
          return `border-color: ${errorColor}; outline-color: ${errorColor}; ${readOnlyCss}`;
        case 'primary':
          const primaryColor = readOnly ? theme.colors.primaryDisabled : theme.colors.primary;
          return `border-color: ${primaryColor}; outline-color: ${primaryColor}; ${readOnlyCss}`;
      }
    }}
  `,

  ErrorContainer: styled.View`
    display: flex;
    justify-content: center;
    align-items: flex-start;

    margin-top: 8px;
    width: 100%;
  `,

  ErrorText: styled.Text`
    color: ${theme.colors.error};

    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
  `,
};

export default S;
