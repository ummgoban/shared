import type {Meta} from '@storybook/react-vite';
import {useRef, useState} from 'react';
import {Button, Text, View} from 'react-native';

import TextInput from './TextInput';
import type {TextInputProps, TextInputRef} from './TextInput.type';

const meta: Meta<typeof TextInput> = {
  title: 'Components/TextInput',
  component: TextInput,
  parameters: {},
  args: {},
  argTypes: {
    label: {control: 'text'},
    errorMessage: {control: 'text'},
    errorStyle: {control: 'object'},
    style: {control: 'object'},
    value: {control: 'text'},
    validation: {},
    full: {control: 'boolean'},
    labelPosition: {
      control: 'radio',
      options: [
        'top-left',
        'top-right',
        'top-center',
        'bottom-left',
        'bottom-right',
        'bottom-center',
        'left-top',
        'left-middle',
        'left-bottom',
        'right-top',
        'right-middle',
        'right-bottom',
      ],
    },
    TextInputProps: {control: 'object'},
  },
};

export default meta;

export const Default = (args: TextInputProps) => {
  const inputRef = useRef<TextInputRef>(null);

  return <TextInput ref={inputRef} {...args} />;
};

export const Full = (args: TextInputProps) => {
  const inputRef = useRef<TextInputRef>(null);

  return <TextInput ref={inputRef} full {...args} />;
};

export const WithLabel = (args: TextInputProps) => {
  const inputRef = useRef<TextInputRef>(null);

  return (
    <TextInput
      ref={inputRef}
      label="text label"
      labelPosition="top-left"
      errorMessage="text must be more than 3 characters"
      validation={(value: string) => value.length > 3}
      {...args}
    />
  );
};

export const WithLabelFull = (args: TextInputProps) => {
  const inputRef = useRef<TextInputRef>(null);

  return (
    <TextInput
      ref={inputRef}
      label="text label"
      labelPosition="top-left"
      errorMessage="text must be more than 3 characters"
      validation={(value: string) => value.length > 3}
      full
      {...args}
    />
  );
};

export const WithLabelHorizontal = (args: TextInputProps) => {
  const inputRef = useRef<TextInputRef>(null);

  return (
    <TextInput
      ref={inputRef}
      label="text label"
      labelPosition="left-middle"
      errorMessage="text must be more than 3 characters"
      validation={(value: string) => value.length > 3}
      {...args}
    />
  );
};

export const WithLabelHorizontalFull = (args: TextInputProps) => {
  const inputRef = useRef<TextInputRef>(null);

  return (
    <TextInput
      ref={inputRef}
      label="text label"
      labelPosition="left-middle"
      errorMessage="text must be more than 3 characters"
      validation={(value: string) => value.length > 3}
      full
      {...args}
    />
  );
};

export const WithForm = (args: TextInputProps) => {
  const inputRef = useRef<TextInputRef>(null);
  const [result, setResult] = useState<string | undefined>(undefined);

  return (
    <>
      <View>
        <TextInput
          ref={inputRef}
          label="text label"
          errorMessage="text must be more than 3 characters"
          validation={(value: string) => value.length > 3}
          full
          {...args}
        />
        <View style={{marginVertical: 8}}>
          <Button onPress={() => setResult(inputRef.current?.value)} title="Submit" />
        </View>
      </View>
      <View>
        <Text>제출된 결과</Text>
        <Text>{result}</Text>
      </View>
    </>
  );
};

export const LabelComponent = (args: TextInputProps) => {
  const inputRef = useRef<TextInputRef>(null);

  return (
    <TextInput
      ref={inputRef}
      label={<Text style={{color: 'red', fontSize: 16}}>custom label component</Text>}
      labelPosition="left-middle"
      errorMessage="text must be more than 3 characters"
      validation={(value: string) => value.length > 3}
      full
      {...args}
    />
  );
};

export const CustomStyle = (args: TextInputProps) => {
  const inputRef = useRef<TextInputRef>(null);

  const style = {
    width: 200,
  };

  const errorStyle = {
    color: 'yellow',
  };

  const TextInputProps: TextInputProps['TextInputProps'] = {
    placeholder: 'placeholder',
    placeholderTextColor: 'gray',
  };

  return (
    <View>
      <View>
        <Text style={{marginVertical: 4, fontSize: 16}}>CustomStyle</Text>
        <Text>style: {JSON.stringify(style)}</Text>
        <Text>errorStyle: {JSON.stringify(errorStyle)}</Text>
        <Text>TextInputProps: {JSON.stringify(TextInputProps)}</Text>
      </View>
      <View style={{height: 2, backgroundColor: 'gray', width: '100%', marginVertical: 4}} />
      <TextInput
        ref={inputRef}
        label="text label"
        labelPosition="left-middle"
        errorMessage="text must be more than 3 characters"
        validation={(value: string) => value.length > 3}
        full
        style={style}
        errorStyle={errorStyle}
        TextInputProps={TextInputProps}
        {...args}
      />
    </View>
  );
};
