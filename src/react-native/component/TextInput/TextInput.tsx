import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

import {forwardRef, ForwardRefRenderFunction, useImperativeHandle, useRef, useState, useEffect} from 'react';
import S from './TextInput.style';

export interface TextInputRef {
  focus: () => void;
  blur: () => void;
  clear: () => void;
  getValue: () => string | undefined;
}

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
const TextInputComponent: ForwardRefRenderFunction<TextInputRef, TextInputProps> = (
  {
    label,
    labelPosition = 'top',
    validation,
    errorMessage,
    errorStyle,
    style,
    value: externalValue,
    onChange,
    TextInputProps,
  },
  ref,
) => {
  const inputRef = useRef<RNTextInput>(null);
  const [internalValue, setInternalValue] = useState<string>('');

  // uncontrolled 컴포넌트로 설계하기 위해 내부 상태만 사용
  // 외부에서 초기값을 제공하는 경우에만 사용하고 이후에는 내부 상태만 사용

  // 초기값 설정 (처음 렌더링시에만 실행)
  useEffect(() => {
    if (externalValue !== undefined) {
      setInternalValue(externalValue);
    }
  }, []);

  const isDefault = !internalValue;
  const isError = internalValue && validation && errorMessage && !validation(internalValue);
  const isFocus = inputRef.current?.isFocused();

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
    clear: () => {
      inputRef.current?.clear();
      setInternalValue('');
    },
    getValue: () => internalValue,
  }));

  return (
    <S.Container style={style}>
      <S.TextInputWrapper labelPosition={labelPosition}>
        {label && <S.Label onPress={() => inputRef.current?.focus()}>{label}</S.Label>}
        <S.TextInputContainer>
          <S.TextInput
            ref={inputRef}
            {...TextInputProps}
            condition={(() => {
              // 에러 상태가 가장 우선순위가 높음
              if (isError) return 'error';

              // 포커스 상태이면서 에러가 아닌 경우 primary 반환
              if (isFocus) return 'primary';

              // 기본값(입력값 없음) 상태일 경우 default 반환
              if (isDefault) return 'default';

              // 그 외의 경우 primary 반환
              return 'primary';
            })()}
            value={internalValue}
            onChangeText={(text: string) => {
              setInternalValue(text);
              onChange?.(text);
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

const TextInput = forwardRef(TextInputComponent);

export default TextInput;
