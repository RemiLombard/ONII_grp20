<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderPage from './components/HeaderPage.vue'

</script>

<template>
  <HeaderPage v-if="!['/signup', '/', '/forgot-password', '/auth/confirm-password-reset/:token'].includes($route.path)" />

  <main>
    <RouterView v-slot="{ Component, route }">
      <component :is="Component" v-bind="route.params" />
    </RouterView>
  </main>
</template>
