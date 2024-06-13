<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['confirm', 'cancel'])
const noShowAgain = ref(false)

const confirm = () => {
  if (noShowAgain.value) {
    localStorage.setItem('noShowModal', 'true')
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
      <div class="mb-4">
        <p class="text-lg font-bold">Soyez prudent(e) ⚠️</p>
      </div>
      <div class="mb-5">
        <p>
          Nous tenons à vous rappeler que l'analyse des rêves par le biais de notre intelligence
          artificielle est un service informatif et divertissant. Bien que notre IA soit équipée
          pour interpréter les rêves, il est important de noter qu'elle n'est pas un substitut à
          une consultation professionnelle.
        </p>
        <p class="mt-2.5">
          Nous espérons que notre service vous apportera une certaine clarté et une nouvelle
          perspective sur vos rêves, mais n'oubliez pas que rien ne remplace l'expertise et
          l'expérience d'un spécialist.
        </p>
        <p class="mt-2.5">Bien à vous,<br />L'équipe ONII</p>
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
