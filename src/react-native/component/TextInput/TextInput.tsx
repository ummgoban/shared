import {forwardRef, ForwardRefRenderFunction, useImperativeHandle, useRef, useState} from 'react';
import {TextInput as RNTextInput} from 'react-native';

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
    defaultValue = '',
    value,
    full = false,
    onChange,
    ...rest
  },
  ref,
) => {
  const inputRef = useRef<RNTextInput>(null);

  const [internalValue, setInternalValue] = useState<string>(defaultValue || value || '');
  const [inputState, setInputState] = useState<'default' | 'error' | 'primary'>('default');

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
      setInputState('primary');
    },
    blur: () => {
      inputRef.current?.blur();
      setInputState(() => {
        if (validation !== undefined) {
          if (!validation(internalValue)) {
            return 'error';
          }
        }
        return 'default';
      });
    },
    clear: () => {
      inputRef.current?.clear();
      setInternalValue('');
      setInputState(() => {
        if (validation !== undefined) {
          if (!validation('')) {
            return 'error';
          }
        }
        return 'default';
      });
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
            {...rest}
            condition={(() => {
              if (inputState === 'error') return 'error';
              if (inputState === 'primary') return 'primary';
              if (inputState === 'default') return 'default';
              return 'default';
            })()}
            defaultValue={defaultValue || value}
            onChangeText={(text: string) => {
              setInternalValue(text);
              if (onChange !== undefined) onChange(text);
              if (validation !== undefined) {
                if (!validation(text)) {
                  setInputState('error');
                } else {
                  setInputState('primary');
                }
              }
            }}
            onBlur={e => {
              if (ref && typeof ref !== 'function') {
                ref.current?.blur();
              }
              rest.onBlur?.(e);
            }}
          />
        </S.TextInputContainer>
      </S.TextInputWrapper>
      {inputState === 'error' && (
        <S.ErrorContainer>
          <S.ErrorText style={errorStyle}>{errorMessage}</S.ErrorText>
        </S.ErrorContainer>
      )}
    </S.Container>
  );
};

const TextInput = forwardRef(TextInputComponent);

export default TextInput;
