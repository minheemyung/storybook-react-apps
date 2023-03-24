// src/components/Badge/Badge.stories.tsx
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Badge } from './Badge'

// Metadata of our component
export default {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    design: {
      type: 'figspec',
      url: 'https://www.figma.com/file/3Q1HTCalD0lJnNvcMoEw1x/Mealdrop?node-id=1906%3A3469',
    },
  },
} as ComponentMeta<typeof Badge>

// Base Template
const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />

// Story, a component variation consisting of a template + args
export const Default = Template.bind({})
Default.args = {
  text: 'Comfort food',
}

export const DarkTheme = Template.bind({})
DarkTheme.parameters = {
  theme: 'dark',
}
