<script setup lang="ts">
import { ref } from 'vue'
import FeedForYou from '@/components/FeedForYou.vue'
import FeedSubscriptions from '@/components/FeedSubscriptions.vue'

const activeTab = ref('pour-vous')

const setActiveTab = (tab: string) => {
  activeTab.value = tab
}
</script>

<template>
  <div>
    <div class="flex justify-around bg-slate-950 text-white py-4">
      <button class="p-2.5 flex-grow text-center text-lg font-bold" :class="{ 'border-b-4 border-fuchsia-700': activeTab === 'pour-vous' }" @click="setActiveTab('pour-vous')">Pour vous</button>
      <button class="p-2.5 flex-grow text-center text-lg font-bold" :class="{ 'border-b-4 border-fuchsia-700': activeTab === 'abonnements' }" @click="setActiveTab('abonnements')">Abonnements</button>
    </div>

    <div v-if="activeTab === 'pour-vous'">
      <FeedForYou />
    </div>
    <div v-else>
      <FeedSubscriptions />
    </div>
  </div>
</template>

