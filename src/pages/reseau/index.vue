<script setup lang="ts">
import { ref } from 'vue'
import FeedForYou from '@/components/FeedForYou.vue'
import FeedSubscriptions from '@/components/FeedSubscriptions.vue'
import { useRouter } from 'vue-router'
import IconFilter from '@/components/icons/IconFilter.vue'

const activeTab = ref('pour-vous')
const searchQuery = ref('')
const router = useRouter()

const setActiveTab = (tab: string) => {
  activeTab.value = tab
}

const openFilter = () => {
  router.push('/reseau/filter')
}
</script>

<template>
  <div>
    <section class="">
      <div class="flex items-center justify-between my-10">
        <input
          type="text"
          placeholder="Rechercher des rêves"
          v-model="searchQuery"
          class="py-3 px-2.5 bg-nightblue w-full mr-2.5 text-white rounded"
        />
        <button @click="openFilter" class="ml-2 p-3.5 bg-nightblue text-white rounded">
          <IconFilter />
        </button>
      </div>

      <div class="flex justify-around bg-slate-950 text-white">
        <button
          class="p-2.5 flex-grow text-center text-lg font-bold"
          :class="{ 'border-b-4 text-yellow-200 border-yellow-200': activeTab === 'pour-vous' }"
          @click="setActiveTab('pour-vous')"
        >
          Pour vous
        </button>
        <button
          class="p-2.5 flex-grow text-center text-lg font-bold"
          :class="{ 'border-b-4 text-yellow-200 border-yellow-200': activeTab === 'abonnements' }"
          @click="setActiveTab('abonnements')"
        >
          Abonnements
        </button>
      </div>
    </section>

    <div v-if="activeTab === 'pour-vous'">
      <FeedForYou :searchQuery="searchQuery" />
    </div>
    <div v-else>
      <FeedSubscriptions />
    </div>
  </div>
</template>
