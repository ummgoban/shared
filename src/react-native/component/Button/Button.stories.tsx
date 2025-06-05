import type {Meta, StoryObj} from '@storybook/react-vite';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    // 필요한 경우 여기에 추가 파라미터 설정
  },
  argTypes: {
    title: {control: 'text'},
    color: {control: 'color'},
    disabled: {control: 'boolean'},
    onPress: {action: 'pressed'},
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    title: '버튼',
    color: '#007AFF',
  },
};

export const Primary: Story = {
  args: {
    title: '확인',
    color: '#007AFF',
  },
};

export const Secondary: Story = {
  args: {
    title: '취소',
    color: '#FF3B30',
  },
};

export const Disabled: Story = {
  args: {
    title: '비활성화',
    disabled: true,
  },
};
