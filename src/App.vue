<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import HeaderPage from './components/HeaderPage.vue'
  import { useRoute } from 'vue-router'
  
  
</script>

<template>
  <HeaderPage v-if="!['/signup','/', '/forgot-password', '/auth/confirm-password-reset'].includes($route.path)"/>

  <main>
    <RouterView />
  </main>

</template>