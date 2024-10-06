<template>
  <button :class="type" @click="onClick">{{ label }}</button>
</template>

<script lang="ts">
export default {
  name: 'MyButton',
  props: {
    label: {
      type: String,
      default: 'Button'
    },
    type: {
      type: String,
      default: 'primary'
    }
  },
  methods: {
    onClick() {
      this.$emit('click');
    }
  }
};
</script>

<style scoped>
button.primary {
  background-color: blue;
  color: white;
}
button.secondary {
  background-color: gray;
  color: white;
}
</style>
