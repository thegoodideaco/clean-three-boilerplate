import { type Meta, type StoryFn } from '@storybook/vue3'
import ThreeView from './ThreeView.vue'

export default {
  title: 'Views/3D/ThreeView',
  component: ThreeView,
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta

const Template: StoryFn = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ThreeView },
  template: '<ThreeView v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  // Add any necessary props here
}
