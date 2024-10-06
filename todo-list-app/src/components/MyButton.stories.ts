// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import MyButton from './MyButton.vue';

export default {
  title: 'Components/MyButton',
  component: MyButton,
};

const Template = (args) => ({
  components: { MyButton },
  setup() {
    return { args };
  },
  template: '<MyButton v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {
  label: 'Primary Button',
  type: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Secondary Button',
  type: 'secondary',
};
