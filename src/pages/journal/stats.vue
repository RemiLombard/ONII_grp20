<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getUserDreamStatistics } from '@/backend'
import { useRouter } from 'vue-router'
import IconBack from '@/components/icons/IconBack.vue'

const router = useRouter()

const statistics = ref({
  totalDreams: 0,
  averageDaysBetweenDreams: 0,
  nightmarePercentage: 0,
  recurrentPercentage: 0,
  lucidPercentage: 0,
  mostFrequentCategory: 'N/A'
})
const errorMessage = ref('')

const fetchStatistics = async () => {
  try {
    const stats = await getUserDreamStatistics()
    statistics.value = stats
  } catch (error) {
    errorMessage.value = 'Erreur lors de la récupération des statistiques : ' + error.message
  }
}

onMounted(() => {
  fetchStatistics()
})

const goBack = () => {
  router.go(-1)
}
</script>

<template>
  <section class="flex justify-between items-center">
    <IconBack class="text-white" @click="goBack" />
    <h1 class="">Vos statistiques</h1>
  </section>
  <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>
  <div v-else class="mb-10">
    <section class="mb-10">
      <h2 class="">Général</h2>
      <div class="flex gap-4">
        <div class="bg-nightblue flex flex-col justify-between py-3 px-2.5 rounded-[15px] text-center flex-1">
          <p>Rêve(s) enregistré(s)</p>
          <p class="text-2xl font-bold">{{ statistics.totalDreams }}</p>
        </div>
        <div class="bg-nightblue flex flex-col justify-between py-3 px-2.5 rounded-[15px] text-center flex-1">
          <p>Jour(s) entre chaque rêve</p>
          <p class="text-2xl font-bold">{{ statistics.averageDaysBetweenDreams.toFixed(2) }}</p>
        </div>
      </div>
    </section>

    <section class="mb-10">
      <h2 class="">Données</h2>
      <div class="flex gap-2.5 justify-between">
        <div
          class="bg-nightblue py-3 px-2.5 rounded-[15px] text-center flex-1 relative max-w-[30%]"
        >
          <div class="flex items-center justify-center">
            <svg class="w-16 h-16 transform -rotate-90">
              <circle
                class="text-gray-700"
                stroke-width="4"
                stroke="currentColor"
                fill="transparent"
                r="30"
                cx="50%"
                cy="50%"
              />
              <circle
                class="text-fuchsia-700"
                stroke-width="4"
                :stroke-dasharray="`${statistics.nightmarePercentage * 1.88} 188`"
                stroke="currentColor"
                fill="transparent"
                r="30"
                cx="50%"
                cy="50%"
              />
            </svg>
          </div>
          <p class="mt-5">{{ statistics.nightmarePercentage.toFixed(2) }}%</p>
          <p>Cauchemars</p>
        </div>
        <div
          class="bg-nightblue py-3 px-2.5 rounded-[15px] text-center flex-1 relative max-w-[30%]"
        >
          <div class="flex items-center justify-center">
            <svg class="w-16 h-16 transform -rotate-90">
              <circle
                class="text-gray-700"
                stroke-width="4"
                stroke="currentColor"
                fill="transparent"
                r="30"
                cx="50%"
                cy="50%"
              />
              <circle
                class="text-fuchsia-700"
                stroke-width="4"
                :stroke-dasharray="`${statistics.lucidPercentage * 1.88} 188`"
                stroke="currentColor"
                fill="transparent"
                r="30"
                cx="50%"
                cy="50%"
              />
            </svg>
          </div>
          <p class="mt-5">{{ statistics.lucidPercentage.toFixed(2) }}%</p>
          <p>Lucides</p>
        </div>
        <div
          class="bg-nightblue py-3 px-2.5 rounded-[15px] text-center flex-1 relative max-w-[30%]"
        >
          <div class="flex items-center justify-center">
            <svg class="w-16 h-16 transform -rotate-90">
              <circle
                class="text-gray-700"
                stroke-width="4"
                stroke="currentColor"
                fill="transparent"
                r="30"
                cx="50%"
                cy="50%"
              />
              <circle
                class="text-fuchsia-700"
                stroke-width="4"
                :stroke-dasharray="`${statistics.recurrentPercentage * 1.88} 188`"
                stroke="currentColor"
                fill="transparent"
                r="30"
                cx="50%"
                cy="50%"
              />
            </svg>
          </div>
          <p class="mt-5">{{ statistics.recurrentPercentage.toFixed(2) }}%</p>
          <p>Récurrents</p>
        </div>
      </div>
    </section>

    <section>
      <h2 class="">Catégorie la plus fréquente</h2>
      <div class="flex flex-wrap gap-2 justify-center">
        <span
          v-for="category in statistics.mostFrequentCategory.split(', ')"
          :key="category"
          class="bg-nightblue text-white py-1 px-3 rounded-full "
          >{{ category }}</span
        >
      </div>
    </section>
  </div>
</template>
