import type {Meta, StoryObj} from '@storybook/react-vite';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {},
  argTypes: {
    children: {control: 'text'},
    themeColor: {control: 'radio', options: ['primary', 'secondary', 'tertiary']},
    disabled: {control: 'boolean'},
    onPress: {action: 'pressed'},
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: '버튼',
    themeColor: 'primary',
  },
};

export const Primary: Story = {
  args: {
    children: '확인',
    themeColor: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: '확인',
    themeColor: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    children: '확인',
    themeColor: 'tertiary',
  },
};

export const Error: Story = {
  args: {
    children: '오류',
    themeColor: 'error',
  },
};

export const Warning: Story = {
  args: {
    children: '취소',
    themeColor: 'warning',
  },
};

export const Disabled: Story = {
  args: {
    children: '비활성화',
    disabled: true,
  },
};
