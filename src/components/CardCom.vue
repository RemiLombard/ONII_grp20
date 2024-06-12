<script setup lang="ts">
import { computed } from 'vue'
import defaultAvatar from '/default-avatar.png'
import IconPoints from './icons/IconPoints.vue'

const props = defineProps({
  username: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: false,
    default: null
  },
  userId: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
})

const userAvatar = computed(() => {
  return props.avatar
    ? `http://127.0.0.1:8090/api/files/_pb_users_auth_/${props.userId}/${props.avatar}`
    : defaultAvatar
})
</script>

<template>
  <div class="bg-nightblue text-white p-4 rounded-lg flex items-start">
    <img :src="userAvatar" alt="avatar" class="w-10 h-10 rounded-full mr-3" />
    <div class="flex-1">
      <div class="flex justify-between items-center mb-2">
        <span class="font-bold">{{ username }}</span>
        <IconPoints />
      </div>
      <p>{{ content }}</p>
    </div>
  </div>
</template>


