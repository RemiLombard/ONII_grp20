<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchSharedDreams } from '@/backend';
import CardDream from '@/components/CardDream.vue';

const dreams = ref([]);

const loadDreams = async () => {
  try {
    const result = await fetchSharedDreams();
    console.log('Fetched shared dreams:', result);
    dreams.value = result;
  } catch (error) {
    console.error('Error loading dreams:', error);
  }
};

onMounted(() => {
  loadDreams();
});
</script>

<template>
  <div>
    <h1>Pour Vous</h1>
    <div v-for="dream in dreams" :key="dream.id">
      <CardDream 
        :id="dream.id"
        :title="dream.title"
        :excerpt="dream.excerpt"
        :date="dream.created"
        :user="dream.user" 
        :likes="dream.likes || 0"
        :comments="dream.comments || 0"
      />
    </div>
  </div>
</template>
