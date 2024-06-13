<script setup lang="ts">
import { ref } from 'vue';

const isSubscribed = ref(false);

const toggleSubscription = () => {
  isSubscribed.value = !isSubscribed.value;
  console.log('Abonné à la newsletter :', isSubscribed.value);
};
</script>

<template>
  <div class="relative w-10 h-5 cursor-pointer" @click="toggleSubscription">
    <input type="checkbox" id="newsletter-toggle" class="sr-only" v-model="isSubscribed" />
    <div class="block w-full h-full rounded-full" :class="{ 'bg-gray-800': !isSubscribed, 'bg-fuchsia-700': isSubscribed }"></div>
    <div
      class="dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-all duration-300"
      :class="{ 'translate-x-5': isSubscribed, 'bg-gray-400': !isSubscribed }"
    ></div>
  </div>
</template>