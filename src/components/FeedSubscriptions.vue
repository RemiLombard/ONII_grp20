<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getSubscriptionDreams } from '@/backend';
import CardDream from '@/components/CardReseau.vue';

const dreams = ref([]);
const errorMessage = ref('');

const loadSubscriptionDreams = async () => {
  try {
    const result = await getSubscriptionDreams();
    dreams.value = result;
  } catch (error) {
    errorMessage.value = error.message;
    console.error('Error loading subscription dreams:', error.message);
  }
};

const handleDreamDeleted = (dreamId: string) => {
  dreams.value = dreams.value.filter(dream => dream.id !== dreamId);
};

onMounted(() => {
  loadSubscriptionDreams();
});
</script>

<template>
  <div class="">
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <CardDream
      v-for="dream in dreams"
      :key="dream.id"
      :id="dream.id"
      :title="dream.title"
      :excerpt="dream.excerpt"
      :date="dream.created"
      :user="dream.user"
      :likes="dream.likes || 0"
      :comments="dream.comments || 0"
      @deleteDream="handleDreamDeleted"
    />
  </div>
</template>

