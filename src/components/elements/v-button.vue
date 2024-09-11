<template>
  <button :class="buttonClasses" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script setup>
import {defineEmits, defineProps} from 'vue';

const props = defineProps({
  primary: Boolean,
  secondary: Boolean,
  circular: Boolean,
});

const emit = defineEmits(['click']);

const handleClick = (event) => emit('click', event);

const buttonClasses = computed(() => {
  let classes = ['btn', 'max-h-[50px]', 'flex', 'items-center', 'justify-center'];
  if (props.primary) {
    classes.push('bg-gray-700 hover:opacity-85 text-white');
  }
  if (props.secondary) {
    classes.push('btn-secondary');
  }
  if (props.circular) {
    classes.push('btn-rounded-full');
  }
  return classes;
});
</script>

<style lang="postcss">
.btn {
  @apply py-4 border-none rounded-lg cursor-pointer outline-none transition-all duration-300;

  &-rounded-full {
    @apply border-black border-solid border-[1px] bg-transparent rounded-full text-[30px] w-full max-w-[40px] max-h-[40px] p-[0_0_4px_0];
  }

  &-secondary {
    @apply bg-gray-500 text-black bg-transparent border-black border-solid border-[1px];
  }
}
</style>
