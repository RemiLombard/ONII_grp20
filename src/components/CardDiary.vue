<script setup lang="ts">
import { defineProps, computed, ref } from 'vue'
import IconPoints from './icons/IconPoints.vue'
import IconTag from './icons/IconTag.vue'
import { RouterLink, useRouter } from 'vue-router'
import ButtonLink from './ButtonLink.vue'
import Modal from './Modal.vue'

const props = defineProps({
  id: String,
  title: String,
  excerpt: String,
  date: String,
  categorie: String
})

const formattedDate = computed(() => {
  const dateObj = new Date(props.date ?? '')
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(dateObj)
})

const router = useRouter()
const showModal = ref(false)

const handleAnalyzeClick = () => {
  const noShowModal = localStorage.getItem('noShowModal')
  if (noShowModal) {
    router.push(`/journal/${props.id}/analyse`)
  } else {
    showModal.value = true
  }
}

const confirmModal = () => {
  showModal.value = false
  router.push(`/journal/${props.id}/analyse`)
}

const cancelModal = () => {
  showModal.value = false
}
</script>

<template>
  <div class="flex flex-col items-end space-y-[-20px]">
    <div
      class="flex flex-col justify-start items-start w-full gap-5 p-2.5 rounded-[15px] bg-violet-950"
    >
      <!-- Titre de l'article avec les points d'icônes -->
      <div class="flex justify-between items-center w-full">
        <h3 class="text-lg font-bold font-Quicksand text-left text-white">{{ title }}</h3>
        <div>
          <IconPoints />
        </div>
      </div>

      <!-- Contenu de l'article -->
      <div class="w-full">
        <p class="text-base text-left text-white">{{ excerpt }}</p>
      </div>

      <!-- Tags -->
      <div class="flex justify-between self-stretch">
        <RouterLink :to="{ name: 'dream-details', params: { id: props.id } }">
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
      <ButtonLink
        variant="common"
        size="common"
        text="Analyser ce rêve avec l'IA"
        @click="handleAnalyzeClick"
      />
    </div>

    <Modal v-if="showModal" @confirm="confirmModal" @cancel="cancelModal" />
  </div>
</template>
