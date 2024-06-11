<script setup lang="ts">
import { defineProps, computed } from 'vue';
import IconPoints from './icons/IconPoints.vue';
import IconLike from './icons/IconLike.vue';
import IconCom from './icons/IconCom.vue';
import { RouterLink } from 'vue-router';
import defaultAvatar from '/default-avatar.png';

const props = defineProps({
  id: String,
  title: String,
  excerpt: String,
  date: String,
  user: {
    type: Object,
    required: false,
    default: null
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: {
    type: Number,
    default: 0
  }
});

const formattedDate = computed(() => {
  const dateObj = new Date(props.date ?? '');
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(dateObj);
});

const userAvatar = computed(() => {
  return props.user && props.user.avatar
    ? `https://onii.remilombard.fr/api/files/_pb_users_auth_/${props.user.id}/${props.user.avatar}`
    : defaultAvatar;
});

const username = computed(() => {
  return props.user && props.user.username ? props.user.username : 'Utilisateur inconnu';
});
</script>

<template>
  <div class="flex flex-col items-start mb-5">
    <div class="flex items-center mb-2">
      <img :src="userAvatar" alt="avatar" class="w-10 h-10 rounded-full mr-3" />
      <span class="text-white">{{ username }}</span>
    </div>
    <div class="bg-violet-950 p-4 rounded-lg w-full">
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-lg font-bold text-white">{{ title }}</h3>
        <IconPoints />
      </div>
      <p class="text-base text-white mb-2">{{ excerpt }}</p>
      <RouterLink :to="{ name: 'dream-details', params: { id: props.id }}" class="text-yellow-200">Voir plus</RouterLink>
      <p class="text-sm text-white mt-2">{{ formattedDate }}</p>
    </div>
    <div class="flex space-x-4 mt-2">
      <RouterLink :to="{ name: 'dream-details', params: { id: props.id } }">
        <button class="flex items-center text-fuchsia-700">
          <IconLike class="w-6 h-6 mr-1" />
          <span>{{ likes }}</span>
        </button>
      </RouterLink>
      <RouterLink :to="{ name: 'dream-details', params: { id: props.id } }">
        <button class="flex items-center text-fuchsia-700">
          <IconCom class="w-6 h-6 mr-1" />
          <span>{{ comments }}</span>
        </button>
      </RouterLink>
    </div>
  </div>
</template>
