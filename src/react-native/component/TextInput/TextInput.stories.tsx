import type {Meta} from '@storybook/react-vite';
import {useRef, useState} from 'react';
import TextInput, {TextInputRef} from './TextInput';

const meta: Meta<typeof TextInput> = {
  title: 'Components/TextInput',
  component: TextInput,
  parameters: {},
  argTypes: {
    label: {control: 'text'},
    errorMessage: {control: 'text'},
    errorStyle: {control: 'object'},
    style: {control: 'object'},
    value: {control: 'text'},
    validation: {},
  },
};

export default meta;

export const Default = () => {
  const inputRef = useRef<TextInputRef>(null);

  return (
    <TextInput
      ref={inputRef}
      label="text label"
      errorMessage="text must be more than 3 characters"
      validation={(value: string) => value.length > 3}
    />
  );
};

export const WithForm = () => {
  const inputRef = useRef<TextInputRef>(null);
  const [result, setResult] = useState<string | undefined>(undefined);

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          setResult(inputRef.current?.getValue());
        }}>
        <TextInput
          ref={inputRef}
          label="text label"
          errorMessage="text must be more than 3 characters"
          validation={(value: string) => value.length > 3}
        />
        <button type="submit" style={{margin: '8px 0'}}>
          Submit
        </button>
      </form>
      <div>
        <p>제출된 결과</p>
        <p>{result}</p>
      </div>
    </>
  );
};
