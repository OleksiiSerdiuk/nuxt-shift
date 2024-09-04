<template>
  <transition name="fade">
    <div
      ref="sidebarRef"
      v-show="isVisible"
      class="absolute top-0 right-0 bg-white w-[457px] h-full shadow-[0px_6px_40px_rgba(0,0,0,0.25)] p-5">
      <h2 class="text-2xl mb-4">Create</h2>

      <form @submit.prevent="handleSubmit">
        <v-input
          label="Title:"
          v-model="shift.title"
          type="input"
          id="title"
          placeholder="Shift Title"
          required
        />
        <v-input
          label="Description:"
          v-model="shift.description"
          type="textarea"
          id="description"
          placeholder="Describe the duties"
          required
        />

        <div
          v-for="(entry, index) in shift.data"
          :key="index"
          class="bg-gray-700 p-[10px] rounded-[5px] mb-[10px]"
        >
          <v-input
            label="Date:"
            v-model="entry.date"
            type="date"
            :id="`date-${index}`"
            :white-label="true"
            required
          />
          <v-input
            label="Start Time:"
            v-model="entry.starttime"
            placeholder="00:00"
            type="time"
            :id="`starttime-${index}`"
            :white-label="true"
            required
          />
          <v-input
            label="End Time:"
            v-model="entry.endtime"
            placeholder="00:00"
            type="time"
            :id="`endtime-${index}`"
            :white-label="true"
            required
          />
          <v-input
            label="Type:"
            v-model="entry.type"
            placeholder="Type"
            :id="`type-${index}`"
            :white-label="true"
            required
          />
          <v-input
            label="Price:"
            v-model="entry.price"
            placeholder="Price"
            type="number"
            :id="`price-${index}`"
            :white-label="true"
            required
          />

          <v-button
            v-if="shift.data.length > 1"
            class="shift-modal__remove-btn"
            @click="removeDate(index)"
            type="button"
          >
            Remove
          </v-button>
        </div>

        <div class="flex justify-center my-5">
          <v-button circular class="btn-add-date" type="button" @click="addDate">
            <span>+</span>
          </v-button>
        </div>

        <div class="flex justify-between gap-5">
          <v-button secondary class="flex-1" type="button" @click="closeSidebar">Cancel</v-button>
          <v-button primary class="flex-1" type="submit" @click.prevent="handleSubmit">Save</v-button>
        </div>
      </form>
    </div>
  </transition>
</template>

<script setup>
import { defineProps } from 'vue'
import VButton from "~/src/components/elements/v-button.vue";
import VInput from "~/src/components/elements/v-input.vue";

const props = defineProps({
  isVisible: Boolean
})

const emit = defineEmits(['close', 'save'])
const sidebarRef = ref(null);
const defaultShiftData = () => ({
  title: '',
  description: '',
  data: [{
    date: '',
    starttime: '',
    endtime: '',
    type: '',
    price: null
  }]
});

const shift = reactive(defaultShiftData())


const closeSidebar = () => {
  emit('close');
}

const onClickOutside = (event) => {
  if (sidebarRef.value && !sidebarRef.value.contains(event.target)) {
    closeSidebar();
  }
}

const addDate = () => {
  shift.data.push({
    date: '',
    starttime: '',
    endtime: '',
    type: '',
    price: null
  });
};

const removeDate = (index) => {
  shift.data.splice(index, 1);
};

const handleSubmit = () => {
  emit('save', shift);
  Object.assign(shift, defaultShiftData());
  closeSidebar();
}

onMounted(() => {
  document.addEventListener('mousedown', onClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', onClickOutside);
});
</script>

<style lang="postcss">
.fade-enter-active, .fade-leave-active {
  transition: transform 0.3s, opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
