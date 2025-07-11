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

  const [internalValue, setInternalValue] = useState<string>('');

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
    get value() {
      return internalValue;
    },
  }));

  return (
    <S.Container full={full} style={style}>
      <S.TextInputWrapper labelPosition={labelPosition}>
        {label && <S.Label onPress={() => inputRef.current?.focus()}>{label}</S.Label>}
        <S.TextInputContainer full={full} labelPosition={labelPosition}>
          <S.TextInput
            ref={inputRef}
            {...TextInputProps}
            condition={(() => {
              if (isError) return 'error';
              if (isFocus) return 'primary';
              if (isDefault) return 'default';
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
