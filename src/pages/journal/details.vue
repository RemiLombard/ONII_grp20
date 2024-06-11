<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { pb } from '@/backend'
import IconBack from '@/components/icons/IconBack.vue'
import ButtonLink from '@/components/ButtonLink.vue'
import IconBigModif from '@/components/icons/IconBigModif.vue'
import Modal from '@/components/Avertissement.vue'

const showModal = ref(false)

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
  <section class="mb-28">
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
  <!-- Fixed Bottom Buttons -->
  <div class="fixed bottom-0 left-0 right-0 p-5 flex justify-between items-center z-10">
    <ButtonLink
      variant="common"
      size="common"
      text="Analyser ce rêve avec l'IA"
      @click="handleAnalyzeClick"
      class="bg-fuchsia-700 text-white py-2 h-[51px] w-full mr-2.5 px-4 rounded-[30px]"
    />
    <Modal v-if="showModal" @confirm="confirmModal" @cancel="cancelModal" />
    <button
      @click="() => router.push(`/journal/edit/${props.id}`)"
      class="bg-fuchsia-700 text-white py-2 px-4 rounded-[30px] flex items-center"
    >
      <IconBigModif />
    </button>
  </div>
</template>
