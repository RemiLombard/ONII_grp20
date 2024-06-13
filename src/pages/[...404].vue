<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/journal')
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <h1 class="text-4xl font-bold">404</h1>
    <p class="text-xl mt-2">Page non trouvée</p>
    <button @click="goHome" class="mt-4 px-4 py-2 bg-fuchsia-700 rounded-full text-white">Retour à l'accueil</button>
  </div>
</template>

