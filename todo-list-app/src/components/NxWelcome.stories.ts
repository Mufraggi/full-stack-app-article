import type { Meta, StoryObj } from '@storybook/vue3';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
// @ts-ignore
import NxWelcome from './NxWelcome.vue';



const meta: Meta<typeof NxWelcome> = {
  component: NxWelcome,
  title: 'NxWelcome',
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    title: 'title',
  },
};

export const Heading: Story = {
  args: {
    title: 'title',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Welcome to NxWelcome!/gi)).toBeTruthy();
  },
};
