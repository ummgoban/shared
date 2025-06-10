import styled from '@emotion/native';
import theme from '../../theme/theme';

const S = {
  Container: styled.View`
    display: flex;
    flex-direction: column;

    width: 100%;
  `,

  TextInputWrapper: styled.View<{labelPosition: 'top' | 'left'}>`
    display: flex;
    gap: 8px;

    ${props => props.labelPosition === 'top' && `flex-direction: column;`}
    ${props => props.labelPosition === 'left' && `flex-direction: row;`}
  `,

  TextInputContainer: styled.View`
    width: 100%;
    height: 48px;
  `,

  Label: styled.Text`
    ${theme.fonts.body1}
  `,

  TextInput: styled.TextInput<{condition: 'default' | 'error' | 'primary'}>`
    background-color: white;
    height: 48px;
    outline-style: solid;
    outline-width: 1px;
    border-radius: 4px;

    margin-horizontal: 2px;
    padding-horizontal: 8px;

    ${props => props.condition === 'default' && `outline-color: ${theme.colors.dark};`}
    ${props => props.condition === 'error' && `outline-color: ${theme.colors.error};`}
    ${props => props.condition === 'primary' && `outline-color: ${theme.colors.primary};`}
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
