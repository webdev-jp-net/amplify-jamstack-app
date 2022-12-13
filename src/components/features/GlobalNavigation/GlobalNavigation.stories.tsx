import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { GlobalNavigation } from './GlobalNavigation';

export default {
  title: 'GlobalNavigation',
  component: GlobalNavigation,
  args: {},
} as ComponentMeta<typeof GlobalNavigation>;
export const Basic: ComponentStory<typeof GlobalNavigation> = args => <GlobalNavigation {...args}></GlobalNavigation>;
