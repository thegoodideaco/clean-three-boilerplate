import type { Meta, StoryObj } from '@storybook/vue3'
import Component from './ViewProps.vue'

const meta = {
  title: 'Hooks/useViewProps',
  component: Component
} satisfies Meta<any>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {}
}
