<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isJournalPage = computed(() => route.path.startsWith('/journal'))
const isReseauPage = computed(() => route.path.startsWith('/reseau'))
</script>

<template>
    <nav class="flex px-5 justify-center space-x-28 lg:space-x-96">
        <RouterLink to="/journal" class="text-white text-lg font-bold border-b-2 w-20 text-center border-transparent" :class="{ 'text-yellow-200 pb-2 border-yellow-200': isJournalPage }">Journal</RouterLink>
        <RouterLink to="/reseau" class="text-white text-lg font-bold border-b-2 w-20 text-center border-transparent" :class="{ 'text-yellow-200 pb-2 border-yellow-200': isReseauPage }">Réseau</RouterLink>
    </nav>
</template>