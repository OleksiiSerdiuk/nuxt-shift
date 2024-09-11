<template>
  <div class="mt-4">
    <input type="range" min="0" :max="maxPrice" v-model="model" ref="priceSlider" class="w-full price-slider" @input="emitPrice"/>
    <div class="text-left text-lg">
      Filter by price: ${{ model }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  events: {
    type: Array,
    default: [],
  }
})
const maxPrice = ref(0);
const priceSlider = ref(null);
const model = defineModel();
const emit = defineEmits(['update']);

const updateSliderBackground = () => {
  if (priceSlider.value && maxPrice.value) {
    const percentage = (model.value / maxPrice.value) * 100;
    priceSlider.value.style.background = `linear-gradient(to right, rgb(89 151 240) ${percentage}%, #ccc ${percentage}%, #ccc 100%)`;
  }
}

watchEffect(() => {
  maxPrice.value = props.events.reduce((acc, curr) => {
    const maxEventPrice = Math.max(...curr.data.map(date => date.price));
    return Math.max(acc, maxEventPrice);
  }, 0);

  if (model.value === 0 || model.value > maxPrice.value) {
    model.value = maxPrice.value;
  }

  updateSliderBackground();
});

const emitPrice = () => emit('update:model', model);

onMounted(() => updateSliderBackground);
watch([model, maxPrice], updateSliderBackground);
watch(props.events, () => {
  let currentMaxPrice = 0;
  props.events.filter((event) => {
    if (event.price > currentMaxPrice) currentMaxPrice = event.price;
  })
  model.value = currentMaxPrice;
})
</script>

<style lang="postcss" scoped>
.price-slider {
  @apply w-full h-2 rounded-lg bg-gray-300 outline-none appearance-none;
}

.price-slider::-webkit-slider-thumb {
  @apply w-5 h-5 rounded-full bg-blue-500 cursor-pointer appearance-none;
}

.price-slider::-moz-range-thumb {
  @apply w-5 h-5 rounded-full bg-blue-500 cursor-pointer;
}
</style>
