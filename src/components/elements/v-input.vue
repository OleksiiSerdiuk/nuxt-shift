<template>
  <div class="flex flex-col mb-2">
    <label
      class="text-sm font-normal"
      :class="whiteLabel ? 'text-white' : 'text-black'"
      :for="id"
    >
      {{ label }}
    </label>
    <input
      :is="type"
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :class="{'border-red-500': error}"
      @input="updateValue"
      class="border border-black px-[10px] py-[5px] rounded mt-2"
    />
    <span v-show="error" class="error-message mt-1">{{ error }}</span>
  </div>
</template>

<script setup>
import {defineProps, computed, defineEmits} from 'vue';

const props = defineProps({
  modelValue: String,
  label: String,
  type: {
    type: String,
    default: 'input'
  },
  id: String,
  placeholder: String,
  error: String,
  whiteLabel: false,
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>

<style lang="postcss">
.base-input-label {
  @apply font-normal text-sm leading-4;
}

.error-message {
  @apply text-red-600 text-xs;
}
</style>
