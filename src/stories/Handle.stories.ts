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

export const SmallNormal: Story = {
  args: {
    size: '24px',
    type: 'left',
    value: 0,
  },
};

export const SmallHovred: Story = {
  args: {
    size: '24px',
    type: 'left',
    value: 0,
    state: 'hovered'
  },
};

export const SmallFocused: Story = {
  args: {
    size: '24px',
    type: 'left',
    value: 0,
    state: 'focused'
  },
};


export const LargeNormal: Story = {
  args: {
    size: '32px',
    type: 'left',
    value: 0,
  },
};

export const LargeHovred: Story = {
  args: {
    size: '32px',
    type: 'left',
    value: 0,
    state: 'hovered'
  },
};

export const LargeFocused: Story = {
  args: {
    size: '32px',
    type: 'left',
    value: 0,
    state: 'focused'
  },
};
