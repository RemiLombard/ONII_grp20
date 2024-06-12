<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { fetchSharedDreams, searchSharedDreams, filterSharedDreams } from '@/backend'
import { debounce } from '@/utils/debounce'
import CardDream from '@/components/CardReseau.vue'

const props = defineProps({
  searchQuery: String,
  filters: Object
})

const dreams = ref([])
const errorMessage = ref('')

const loadDreams = async () => {
  try {
    const result = await fetchSharedDreams()
    dreams.value = result
  } catch (error) {
    errorMessage.value = error.message
    console.error('Error loading dreams:', error.message)
  }
}

const searchDreams = debounce(async () => {
  try {
    const result = await searchSharedDreams(props.searchQuery)
    dreams.value = result
  } catch (error) {
    errorMessage.value = error.message
    console.error('Error searching dreams:', error.message)
  }
}, 300) // 300ms delay

const filterDreams = debounce(async () => {
  try {
    const result = await filterSharedDreams(props.filters)
    dreams.value = result
  } catch (error) {
    errorMessage.value = error.message
    console.error('Error filtering dreams:', error.message)
  }
}, 300) // 300ms delay

watch(() => props.searchQuery, (newQuery) => {
  if (newQuery) {
    searchDreams()
  } else {
    loadDreams()
  }
})

watch(() => props.filters, () => {
  filterDreams()
}, { deep: true })

onMounted(() => {
  loadDreams()
})
</script>

<template>
  <div class="">
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <CardDream v-for="dream in dreams" :key="dream.id" :id="dream.id" :title="dream.title" :excerpt="dream.excerpt" :date="dream.created" :user="dream.user" :likes="dream.likes || 0" :comments="dream.comments || 0" />
  </div>
</template>
