<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['confirm', 'cancel'])
const noShowAgain = ref(false)

const confirm = () => {
  if (noShowAgain.value) {
    localStorage.setItem('noShowDeleteAccountModal', 'true')
  }
  emit('confirm')
}

const cancel = () => {
  emit('cancel')
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
    <div class="bg-nightblue text-white p-6 rounded-[15px] w-full mx-4">
      <div class="mb-5">
        <p>
          Toutes vos données seront supprimées de cet appareil. Vos données seront toujours
          disponibles dans votre compte, en vous reconnectant.
        </p>
      </div>
      <div class="flex items-center">
        <input type="checkbox" id="noShow" v-model="noShowAgain" class="mr-2" />
        <label for="noShow" class="text-sm text-gray-400 italic font-light"
          >Ne plus me montrer cette page</label
        >
      </div>
      <div class="mt-5 flex justify-between">
        <button @click="cancel" class="bg-blue-200 text-black rounded-md px-4 py-2">Retour</button>
        <button @click="confirm" class="bg-fuchsia-700 text-white px-4 py-2 rounded-md">
          Continuer
        </button>
      </div>
    </div>
  </div>
</template>
