<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { pb } from '@/backend'
import IconBack from '@/components/icons/IconBack.vue'

// Définir le prop 'id'
const props = defineProps({
  id: String
})

const route = useRoute()
const router = useRouter()
const dream = ref(null)
const errorMessage = ref('')

const fetchDreamDetails = async () => {
  try {
    const dreamId = route.params.id || props.id // Utiliser le prop 'id' si disponible
    const response = await pb.collection('reve').getOne(dreamId)
    dream.value = response
  } catch (error) {
    errorMessage.value = 'Erreur lors de la récupération des détails du rêve : ' + error.message
  }
}

const goBack = () => {
  router.back()
}

onMounted(() => {
  fetchDreamDetails()
})
</script>

<template>
  <!-- Fixed Header -->
  <section class="flex justify-between items-center my-10">
    <div class="flex-none">
      <IconBack class="text-white w-9 h-9 cursor-pointer" @click="goBack" />
    </div>
    <div class="text-end ml-5">
      <h1 class="mb-1 mt-0">{{ dream?.title }}</h1>
      <p class="text-gray-400 italic font-light text-sm">
        {{ new Date(dream?.date).toLocaleDateString('fr-FR') }}
      </p>
    </div>
  </section>

  <!-- Dream Content -->
  <section class="">
    <div v-if="dream" class="">
      <div class="mb-10">
        <h2>Récit</h2>
        <div class="bg-nightblue p-2.5 rounded-[15px]">
          <p class="text-lg text-white">{{ dream.fullText }}</p>
        </div>
      </div>

      <div class="mb-8">
        <h2>Détails</h2>
        <div class="mb-5">
          <p class="block text-lg font-bold text-white">Type de rêve :</p>
          <p class="text-white bg-nightblue border border-none mt-1 rounded-lg w-full py-2 px-3">
            {{ dream.type }}
          </p>
        </div>
        <div class="mb-5">
          <p class="text-lg font-bold text-white">Rêve récurrent :</p>
          <p class="text-white bg-nightblue border border-none mt-1 rounded-lg w-full py-2 px-3">
            {{ dream.recurrent ? 'Oui' : 'Non' }}
          </p>
        </div>
        <div class="mb-5">
          <p class="text-lg font-bold text-white">Rêve lucide :</p>
          <p class="text-white bg-nightblue border border-none mt-1 rounded-lg w-full py-2 px-3">
            {{ dream.lucide ? 'Oui' : 'Non' }}
          </p>
        </div>
        <div class="mb-5">
          <p class="block text-lg font-bold text-white">Catégorie :</p>
          <p class="text-white bg-nightblue border border-none mt-1 rounded-lg w-full py-2 px-3">
            {{ dream.categorie }}
          </p>
        </div>
      </div>
    </div>
    <div v-else class="text-white text-center">{{ errorMessage }}</div>
  </section>
</template>
