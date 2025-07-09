import {TextInput as RNTextInput} from 'react-native';
import {forwardRef, ForwardRefRenderFunction, useEffect, useImperativeHandle, useRef, useState} from 'react';

import type {TextInputProps, TextInputRef} from './TextInput.type';

import S from './TextInput.style';

/**
 * @description
 * label={undefined}: label을 사용할 경우 아웃라인에 표시되기 때문에 undefined 이용
 *
 */
const TextInputComponent: ForwardRefRenderFunction<TextInputRef, TextInputProps> = (
  {
    label,
    labelPosition = 'top-left',
    validation,
    errorMessage,
    errorStyle,
    style,
    value: externalValue,
    full = false,
    onChange,
    TextInputProps,
  },
  ref,
) => {
  const inputRef = useRef<RNTextInput>(null);
  // uncontrolled 컴포넌트로 설계하기 위해 내부 상태만 사용
  // 외부에서 초기값을 제공하는 경우에만 사용하고 이후에는 내부 상태만 사용
  const [internalValue, setInternalValue] = useState<string>('');

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
    <S.Container full={full} style={style}>
      <S.TextInputWrapper labelPosition={labelPosition}>
        {label && <S.Label onPress={() => inputRef.current?.focus()}>{label}</S.Label>}
        <S.TextInputContainer full={full}>
          <S.TextInput
            ref={inputRef}
            {...TextInputProps}
            labelPosition={labelPosition}
            condition={(() => {
              // 에러 상태가 가장 우선순위가 높음
              if (isError) return 'error';

              // 포커스 상태이면서 에러가 아닌 경우 primary 반환
              if (isFocus) return 'primary';

              // 기본값(입력값 없음) 상태일 경우 default 반환
              if (isDefault) return 'default';

              // 그 외의 경우 default 반환
              return 'default';
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
