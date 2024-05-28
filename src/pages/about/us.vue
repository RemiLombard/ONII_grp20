<script setup lang="ts">
import { useRouter } from 'vue-router'
import IconBack from '@/components/IconBack.vue'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}
</script>

<template>
    <section class="flex justify-between items-center flex-grow">
    <IconBack class="text-white" @click="goBack" />
    <h1 class="text-white">À propos de nous</h1>
  </section>
</template>