import styled from '@emotion/native';

import type {TextInputProps} from './TextInput.type';

import theme from '../../theme/theme';

// TODO: labelPosition에 따른 스타일을 적용하기

const S = {
  Container: styled.View<{full: boolean}>`
    display: flex;
    flex-direction: column;

    ${props => props.full && `width: 100%;`}
  `,

  TextInputWrapper: styled.View<{labelPosition: Required<TextInputProps['labelPosition']>}>`
    display: flex;
    gap: 8px;

    ${({labelPosition}) => {
      if (!labelPosition) return '';
      const [mainPosition, subPosition] = labelPosition.split('-');
      let style = '';
      if (mainPosition === 'top' || mainPosition === 'bottom') {
        style = mainPosition === 'bottom' ? 'flex-direction: column-reverse' : 'flex-direction: column';

        if (subPosition === 'left') {
          style += 'justify-content: flex-start';
        } else if (subPosition === 'right') {
          style += 'justify-content: flex-end';
        } else {
          style += 'justify-content: center';
        }
      } else if (mainPosition === 'left' || mainPosition === 'right') {
        style = mainPosition === 'right' ? 'flex-direction: row-reverse' : 'flex-direction: row';
        if (subPosition === 'top') {
          style += 'align-items: flex-start';
        } else if (subPosition === 'bottom') {
          style += 'align-items: flex-end';
        } else {
          style += 'align-items: center';
        }
      }
      return style;
    }}
  `,

  TextInputContainer: styled.View<{full: boolean}>`
    height: 48px;

    ${props => props.full && `width: 100%;`}
  `,

  Label: styled.Text`
    ${theme.fonts.body1}
  `,

  TextInput: styled.TextInput<{
    condition: 'default' | 'error' | 'primary';
    labelPosition: Required<TextInputProps['labelPosition']>;
  }>`
    background-color: white;
    height: 48px;
    outline-style: solid;
    outline-width: 1px;
    border-radius: 4px;

    margin: ${({labelPosition}) => {
      if (!labelPosition) return '0 2px';
      const [mainPosition] = labelPosition.split('-');
      if (mainPosition === 'top' || mainPosition === 'bottom') {
        return '0 2px';
      }
      return '2px 0';
    }};
    padding-horizontal: 8px;

    ${({condition}) => condition === 'default' && `outline-color: ${theme.colors.dark};`}
    ${({condition}) => condition === 'error' && `outline-color: ${theme.colors.error};`}
    ${({condition}) => condition === 'primary' && `outline-color: ${theme.colors.primary};`}
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
