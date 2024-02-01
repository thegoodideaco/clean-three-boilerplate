import { type Meta, type StoryFn } from '@storybook/vue3'
import RapierView from './RapierView.vue'

export default {
  title: 'Views/3D/Rapier',
  component: RapierView,
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta

const Template: StoryFn = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { RapierView },
  template: '<RapierView v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  // Add any necessary props here
}
