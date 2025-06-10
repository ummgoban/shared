import {TextInputProps as RNTextInputProps, StyleProp, TextStyle, ViewStyle} from 'react-native';

import {useState} from 'react';
import S from './TextInput.style';

export type TextInputProps = {
  label?: string;
  labelPosition?: 'top' | 'left';
  validation?: (value: string) => boolean;
  errorMessage?: string;
  errorStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  value?: string;
  onChange?: (text: string) => void;
  TextInputProps?: RNTextInputProps;
};

/**
 * @description
 * label={undefined}: label을 사용할 경우 아웃라인에 표시되기 때문에 undefined 이용
 *
 */
const TextInput = ({
  label,
  labelPosition = 'top',
  validation,
  errorMessage,
  errorStyle,
  style,
  value,
  onChange,
  TextInputProps,
}: TextInputProps) => {
  const isDefault = !value;
  const isError = value && validation && errorMessage && !validation(value);

  const [textInputCondition, setTextInputCondition] = useState<'default' | 'focus'>('default');

  return (
    <S.Container style={style}>
      <S.TextInputWrapper labelPosition={labelPosition}>
        {label && <S.Label>{label}</S.Label>}
        <S.TextInputContainer>
          <S.TextInput
            {...TextInputProps}
            condition={(() => {
              // 에러 상태가 가장 우선순위가 높음
              if (isError) return 'error';

              // 포커스 상태이면서 에러가 아닌 경우 primary 반환
              if (textInputCondition === 'focus') return 'primary';

              // 기본값(입력값 없음) 상태일 경우 default 반환
              if (isDefault) return 'default';

              // 그 외의 경우 primary 반환
              return 'primary';
            })()}
            value={value}
            onChangeText={onChange}
            onFocus={e => {
              TextInputProps?.onFocus?.(e);
              setTextInputCondition('focus');
            }}
            onBlur={e => {
              TextInputProps?.onBlur?.(e);
              setTextInputCondition('default');
            }}
          />
        </S.TextInputContainer>
      </S.TextInputWrapper>
      {isError && (
        <S.ErrorContainer>
          <S.ErrorText style={errorStyle}>{errorMessage}</S.ErrorText>
        </S.ErrorContainer>
      )}
    </S.Container>
  );
};

export default TextInput;
