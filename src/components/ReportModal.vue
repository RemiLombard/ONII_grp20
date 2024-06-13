<!-- ReportModal.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  isVisible: Boolean,
  dreamId: String
})

const emit = defineEmits(['close', 'submit'])

const reason = ref('')

const submitReport = () => {
  emit('submit', reason.value)
  reason.value = ''
}

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
    <div class="bg-nightblue p-5 rounded-lg">
      <p class="font-Quicksand text-lg font-bold mb-4">Signaler</p>
      <textarea v-model="reason" rows="4" class="bg-violet-950 text-black w-full p-2 rounded mb-4 focus:outline-none focus:ring-1 focus:ring-yellow-200" placeholder="Raison du signalement"></textarea>
      <div class="flex justify-between gap-2">
        <button @click="closeModal" class="bg-blue-200 text-black rounded p-2">Annuler</button>
        <button @click="submitReport" class="bg-fuchsia-700 text-white rounded p-2">Envoyer</button>
      </div>
    </div>
  </div>
</template>
