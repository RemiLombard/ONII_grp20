<script setup lang="ts">
import { defineProps, computed } from 'vue'
import IconPoints from './icons/IconPoints.vue'
import IconTag from './icons/IconTag.vue'

const props = defineProps({
  title: String,
  excerpt: String,
  date: String,
  categorie: String
})

const formattedDate = computed(() => {
  const dateObj = new Date(props.date)
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(dateObj)
})
</script>

<template>
  <div class="flex flex-col items-end space-y-[-20px]">
    <div
      class="flex flex-col justify-start items-start w-full gap-5 px-2.5 py-2.5 rounded-[15px] bg-violet-950"
    >
      <!-- Titre de l'article avec les points d'icônes -->
      <div class="flex justify-between items-center w-full">
        <h3 class="text-lg font-bold font-Quicksand text-left text-white">
          {{ title }}
        </h3>
        <div>
          <IconPoints />
        </div>
      </div>

      <!-- Contenu de l'article -->
      <div class="w-full">
        <p class="text-base text-left text-white">
          {{ excerpt }}
        </p>
      </div>

      <!-- Tags -->
      <div class="flex justify-between self-stretch">
        <RouterLink to="/">
          <span class="text-lg font-bold font-Lato text-yellow-200">Voir plus</span>
        </RouterLink>
        <div class="flex items-center gap-2">
          <IconTag />
          <p class="text-sm font-light italic text-left font-Lato text-white">{{ categorie }}</p>
        </div>
      </div>

      <!-- Date -->
      <div class="w-full gap-2.5">
        <p class="text-sm italic font-light text-left text-white">{{ formattedDate }}</p>
      </div>
    </div>

    <!-- Bouton d'analyse -->
    <div class="flex flex-col items-end h-10 pr-2.5">
      <div
        class="flex justify-center items-center text-sm gap-2.5 px-3.5 py-2.5 rounded-[50px] bg-fuchsia-700"
      >
        <RouterLink to="/" class="text-white"> Analyser ce rêve avec l’IA </RouterLink>
      </div>
    </div>
  </div>
</template>
