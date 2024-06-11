<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { fetchSharedDreams, searchSharedDreams, filterSharedDreams } from '@/backend'
import CardDream from '@/components/CardReseau.vue'

const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  }
})

const dreams = ref([])

const loadDreams = async (filters = {}) => {
  try {
    const result = await filterSharedDreams(filters)
    console.log('Fetched shared dreams:', result)
    dreams.value = result
  } catch (error) {
    console.error('Error loading dreams:', error)
  }
}

const searchDreams = async () => {
  try {
    const result = await searchSharedDreams(props.searchQuery)
    console.log('Searched shared dreams:', result)
    dreams.value = result
  } catch (error) {
    console.error('Error searching dreams:', error)
  }
}

onMounted(() => {
  loadDreams()
})

watch(() => props.searchQuery, (newQuery) => {
  if (newQuery) {
    searchDreams()
  } else {
    loadDreams()
  }
})
</script>

<template>
  <div>
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
