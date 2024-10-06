import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { NxWelcome } from '../../.nuxt/components';


describe('NxWelcome', () => {
  it('renders NxWelcome component', () => {
    const wrapper = mount(NxWelcome, {
      props: {
        title: 'todo-list-app'
      }
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props().title).toBe('todo-list-app');
  });
});
