<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { pb } from '@/backend'
import IconBack from '@/components/icons/IconBack.vue'
import { useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const dream = ref(null)
const errorMessage = ref('')

const fetchDreamDetails = async () => {
  try {
    const dreamId = route.params.id
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
  <div class="relative min-h-screen">
    <!-- Fixed Header -->
    <section
      class="fixed top-[86px] left-0 right-0 bg-slate-950 flex justify-between items-center p-5 z-10"
    >
      <IconBack class="text-white" @click="goBack" />
      <div class="text-end ml-5">
        <h1 class="m-0">{{ dream?.title }}</h1>
        <p class="text-gray-400 text-sm">{{ new Date(dream?.date).toLocaleDateString('fr-FR') }}</p>
      </div>
    </section>

    <!-- Dream Content -->
    <section class="mt-[97.6px] p-5">
      <div v-if="dream" class="space-y-6">
        <div class="mb-10">
          <p class="text-lg text-white mt-4">{{ dream.fullText }}</p>
        </div>
      </div>
      <div v-else class="text-white text-center">{{ errorMessage }}</div>
    </section>
  </div>
</template>
