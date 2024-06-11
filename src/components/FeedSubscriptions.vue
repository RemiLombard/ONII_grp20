<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getSubscriptionDreams } from '@/backend'
import CardDream from '@/components/CardReseau.vue'

const dreams = ref([])
const errorMessage = ref('')

const fetchSubscriptionDreams = async () => {
  try {
    dreams.value = await getSubscriptionDreams()
  } catch (error) {
    errorMessage.value = error.message
  }
}

onMounted(fetchSubscriptionDreams)
</script>

<template>
  <div>
    <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>
    <div v-else>
      <CardDream
        v-for="dream in dreams"
        :key="dream.id"
        :id="dream.id"
        :title="dream.title"
        :excerpt="dream.excerpt"
        :date="dream.date"
        :user="{ username: dream.expand.userId.username, avatar: dream.expand.userId.avatar }"
        :likes="dream.likes"
        :comments="dream.comments"
      />
    </div>
  </div>
</template>

<style scoped>
/* Ajoutez ici vos styles personnalisés */
</style>
