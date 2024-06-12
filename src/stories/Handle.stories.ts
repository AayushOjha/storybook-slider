import type { Meta, StoryObj } from '@storybook/react';
import { Handle } from '../components/Handle';

const meta = {
  title: 'Master/Handle',
  component: Handle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { handleMouseDown: (thumb: "left" | "right") => () => {} }
} satisfies Meta<typeof Handle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: '24px',
    type: 'left',
    value: 0,
  },
};
