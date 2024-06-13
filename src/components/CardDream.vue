<template>
    <div class="p-4 bg-gray-800 rounded-lg">
      <div class="flex items-center mb-4">
        <img :src="userAvatar" alt="User Avatar" class="w-10 h-10 rounded-full" />
        <div class="ml-4">
          <h3 class="text-lg font-bold">{{ dream.user.username }}</h3>
          <p class="text-sm text-gray-400">{{ formattedDate }}</p>
        </div>
      </div>
      <h2 class="text-xl font-bold">{{ dream.title }}</h2>
      <p class="text-gray-300">{{ dream.excerpt }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { PropType } from 'vue';
  import { ReveResponse } from '@/pocketbase-types';
  import defaultAvatar from '/default-avatar.png';
  
  const props = defineProps({
    dream: {
      type: Object as PropType<ReveResponse>,
      required: true,
    },
  });
  
  const userAvatar = computed(() => {
    return props.dream.user?.avatar
      ? `http://127.0.0.1:8090/api/files/_pb_users_auth_/${props.dream.user.id}/${props.dream.user.avatar}`
      : defaultAvatar;
  });
  
  const formattedDate = computed(() => {
    const dateObj = new Date(props.dream.date);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(dateObj);
  });
  </script>
  