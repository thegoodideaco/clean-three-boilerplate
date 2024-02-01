import { type Meta, type StoryFn } from '@storybook/vue3'
import NewThreeView from './NewThreeView.vue'

export default {
  title: 'Views/3D/ThreeView',
  component: NewThreeView,
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta

const Template: StoryFn = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { NewThreeView },
  template: '<NewThreeView v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  // Add any necessary props here
}
