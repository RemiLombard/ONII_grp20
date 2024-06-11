<!-- src/components/CardReseau.vue -->
<script setup lang="ts">
import { defineProps, computed, ref } from 'vue'
import IconPoints from './icons/IconPoints.vue'
import IconTag from './icons/IconTag.vue'
import IconLike from './icons/IconLike.vue'
import IconCom from './icons/IconCom.vue'
import { RouterLink } from 'vue-router'
import defaultAvatar from '/default-avatar.png'

const props = defineProps({
  id: String,
  title: String,
  excerpt: String,
  date: String,
  categorie: String,
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
})

const formattedDate = computed(() => {
  const dateObj = new Date(props.date ?? '')
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(dateObj)
})

const userAvatar = computed(() => {
  return props.user && props.user.avatar
    ? `https://onii.remilombard.fr:443/api/files/_pb_users_auth_/${props.user.id}/${props.user.avatar}`
    : defaultAvatar
})

const username = computed(() => {
  return props.user && props.user.username ? props.user.username : 'Utilisateur inconnu'
})
</script>

<template>
  <div class="w-full flex items-center mb-2">
    <img :src="userAvatar" alt="avatar" class="w-10 h-10 rounded-full mr-3" />
    <span class="text-white">{{ username }}</span>
  </div>

  <div class="flex flex-col items-end space-y-[-20px] mb-5">
    <div
      class="flex flex-col justify-start items-start w-full gap-5 p-2.5 rounded-[15px] bg-violet-950"
    >
      <div class="flex justify-between items-center w-full">
        <h3 class="text-lg font-bold font-Quicksand text-left text-white">{{ title }}</h3>
        <IconPoints />
      </div>
      <div class="w-full">
        <p class="text-base text-left text-white">{{ excerpt }}</p>
      </div>

      <div class="flex justify-between self-stretch">
        <RouterLink :to="{ name: 'dream-details', params: { id: props.id } }">
          <span class="text-lg font-bold font-Lato text-yellow-200">Voir plus</span>
        </RouterLink>
        <div class="flex items-center gap-2">
          <IconTag />
          <p class="text-sm font-light italic text-left font-Lato text-white">{{ categorie }}</p>
        </div>
      </div>

      <div class="w-full gap-2.5">
        <p class="text-sm italic font-light text-left text-gray-400">{{ formattedDate }}</p>
      </div>
    </div>

    <div class="flex space-x-4 items-end h-10 pr-2.5">
      <RouterLink :to="{ name: 'dream-details', params: { id: props.id } }">
        <button class="flex items-center text-white bg-fuchsia-700 py-3 px-2.5 rounded-full">
          <IconLike class="w-6 h-6 mr-1" />
          <span>{{ likes }}</span>
        </button>
      </RouterLink>
      <RouterLink :to="{ name: 'dream-details', params: { id: props.id } }">
        <button class="flex items-center text-white bg-fuchsia-700 py-3 px-2.5 rounded-full">
          <IconCom class="w-6 h-6 mr-1" />
          <span>{{ comments }}</span>
        </button>
      </RouterLink>
    </div>
  </div>
</template>
