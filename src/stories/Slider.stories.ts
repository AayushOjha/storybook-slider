import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Slider } from '../components/Slider';

const meta = {
  title: 'Master/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onChange: fn() },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleContinious: Story = {
  args: {
    type: "Continuous",
    subtype: "Single",
    defaultValue: 30,
  },
};

export const RangeContinious: Story = {
  args: {
    type: "Continuous",
    subtype: "Range",
    defaultValue: [20, 60],
  },
};

export const DiscreateSingle: Story = {
  args: {
    type: "Discreet",
    subtype: "Single",
    steps: 9,
    defaultValue: 10,
  },
};