<script setup lang="ts">
import { defineProps, computed, ref } from 'vue'
import IconPoints from './icons/IconPoints.vue'
import IconTag from './icons/IconTag.vue'
import { RouterLink, useRouter } from 'vue-router'
import ButtonLink from './ButtonLink.vue'
import ParamsReve from './ParamsReve.vue'
import { deleteDream } from '@/backend'
import Modal from './Modal.vue'

const props = defineProps({
  id: String,
  title: String,
  excerpt: String,
  date: String,
  categorie: String
})

const emit = defineEmits(['deleteDream'])
const showModal = ref(false)
const router = useRouter()

const formattedDate = computed(() => {
  const dateObj = new Date(props.date ?? '')
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(dateObj)
})

const handleDelete = async () => {
  try {
    await deleteDream(props.id);
    emit('deleteDream', props.id); // Émettre l'événement avec l'ID du rêve supprimé
  } catch (error) {
    console.error('Erreur lors de la suppression du rêve:', error);
    alert('Erreur lors de la suppression du rêve');
  }
}

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
  <div class="flex flex-col items-end space-y-[-20px] mb-5">
    <div
      class="flex flex-col justify-start items-start w-full gap-5 p-2.5 rounded-[15px] bg-violet-950"
    >
      <div class="flex justify-between items-center w-full">
        <h3 class="text-lg font-bold font-Quicksand text-left text-white">{{ title }}</h3>
        <ParamsReve :dreamId="props.id" @delete="handleDelete">
          <IconPoints />
        </ParamsReve>
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
