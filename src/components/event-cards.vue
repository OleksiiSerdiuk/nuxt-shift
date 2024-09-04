<template>
  <div
    v-for="(event, index) in events"
    :key="`card-${event.id}`"
    class="bg-white shadow-3xl rounded-xl px-6 py-4"
    :class="{'mt-10': index === 0, 'mt-6': index !== 0}"
  >
    <h3 class="text-xl md:text-2xl">{{ event.title }}</h3>
    <p class="mt-2 text-lg font-light">{{ event.description }}</p>
    <h3 class="text-xl md:text-2xl mt-4 mb-2">Dates</h3>
    <ul
      v-for="date in event.data"
      :key="`row-${date.id}`"
      class="flex flex-col md:flex-row justify-between text-gray-50 py-3 px-4 rounded bg-gray-700"
      :class="{'mt-4': index === 0, 'mt-2': index !== 0}"
    >
      <li class="flex-1 text-left max-md:py-2">{{ date.date }}</li>
      <li class="flex-1 text-left border-t border-white md:border-none max-md:py-2">{{ date.starttime }}</li>
      <li class="flex-1 text-left border-t border-white md:border-none max-md:py-2">{{ date.endtime }}</li>
      <li class="flex-1 text-left border-t border-white md:border-none max-md:py-2">{{ date.type }}</li>
      <li class="flex-1 text-left border-t border-white md:border-none max-md:py-2">${{ date.price }}</li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  events: {
    type: Array,
    default: () => []
  }
})
</script>
