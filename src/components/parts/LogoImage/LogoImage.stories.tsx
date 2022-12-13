import type { ComponentMeta, Story } from '@storybook/react';

import { LogoImage } from './LogoImage';
export default {
  title: 'parts/LogoImage',
  component: LogoImage,
} as ComponentMeta<typeof LogoImage>;
export const Basic: Story = () => <LogoImage></LogoImage>;
