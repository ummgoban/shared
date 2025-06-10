import type {Meta} from '@storybook/react-vite';
import {useState} from 'react';
import TextInput from './TextInput';

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
  const [value, setValue] = useState<string>();

  return (
    <TextInput
      label="text label"
      errorMessage="text must be more than 3 characters"
      value={value}
      validation={value => value.length > 3}
      onChange={e => setValue(e)}
    />
  );
};
