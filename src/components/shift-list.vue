<template>
  <div class="my-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div>
      <h1 class="text-3xl md:text-4xl font-bold underline">Filter</h1>
      <Filter :events="events" v-model="price" />
    </div>
    <div class="flex flex-col md:flex-row justify-between items-left md:space-y-0 mt-10">
      <h1 class="text-3xl md:text-4xl font-bold underline">Shifts</h1>
      <v-button
        primary
        class="w-full max-md:mt-4 max-w-[200px]"
        @click="toggleSidebar"
      >
        Add Shift
      </v-button>
    </div>
    <EventCards v-if="filteredEvents.length" :events="filteredEvents" @edit="toggleSidebar" />
  </div>

  <ShiftSidebar
    :currentShift="currentShift"
    :isVisible="isSidebarVisible"
    @close="handleCloseSidebar"
    @save="handleSave"
    @edit="handleEdit"
  />
</template>

<script setup>
import Filter from "~/src/components/filter.vue";
import VButton from "~/src/components/elements/v-button.vue";
import {useEventStore} from "~/src/store/events.js";
import ShiftSidebar from "~/src/components/shift-sidebar.vue";
import EventCards from "~/src/components/event-cards.vue";

const { events, addEvent, editEvent} = useEventStore();
const isSidebarVisible = ref(false);
const price = ref(0);
const currentShift = ref({})

const toggleSidebar = (id) => {
  if (id) {
    currentShift.value = filteredEvents.value.find(i => i.id === id);
  } else {
    currentShift.value = {}
  }
  isSidebarVisible.value = !isSidebarVisible.value

};
const handleCloseSidebar = () => isSidebarVisible.value = false;

const filteredEvents = computed(() => {
  return events.reduce((acc, event) => {
    const filteredData = event.data.filter((date) => date.price <= price.value);

    if (filteredData.length) {
      acc.push({
        ...event,
        data: filteredData
      });
    }

    return acc;
  }, []);
});

const handleSave = (newShiftData) => {
  addEvent(newShiftData);
};

const handleEdit = (newShiftData) => {
  editEvent(newShiftData);
};
</script>

<style lang="postcss">
body {
  @apply text-gray-700;
}
</style>
