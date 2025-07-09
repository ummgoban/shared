import {StyleProp, TextStyle, ViewStyle, TextInputProps as RNTextInputProps} from 'react-native';

export interface TextInputRef {
  focus: () => void;
  blur: () => void;
  clear: () => void;
  getValue: () => string | undefined;
}

export type TextInputProps = {
  label?: string;
  labelPosition?:
    | 'top-left'
    | 'top-right'
    | 'top-center'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center'
    | 'left-top'
    | 'left-middle'
    | 'left-bottom'
    | 'right-top'
    | 'right-middle'
    | 'right-bottom';
  validation?: (value: string) => boolean;
  errorMessage?: string;
  errorStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  value?: string;
  full?: boolean;
  onChange?: (text: string) => void;
  TextInputProps?: RNTextInputProps;
};
