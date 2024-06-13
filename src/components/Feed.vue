<template>
    <div class="flex flex-col space-y-4">
      <CardDream v-for="dream in dreams" :key="dream.id" :dream="dream" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { PropType } from 'vue';
  import { ReveResponse } from '@/pocketbase-types';
  import CardDream from '@/components/CardDream.vue';
  
  const props = defineProps({
    dreams: {
      type: Array as PropType<ReveResponse[]>,
      required: true,
    },
  });
  </script>
  