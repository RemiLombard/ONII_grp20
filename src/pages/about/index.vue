<script setup lang="ts">
import { useRouter } from 'vue-router'
import IconBack from '@/components/icons/IconBack.vue'
import IconTo from '@/components/icons/IconTo.vue'
import IconCondition from '@/components/icons/IconCondition.vue'
import IconShield from '@/components/icons/IconShield.vue'
import IconCookie from '@/components/icons/IconCookie.vue'
import IconTeam from '@/components/icons/IconTeam.vue'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}
</script>

<template>
  <section class="flex justify-between items-center flex-grow">
    <IconBack class="text-white" @click="goBack" />
    <h1 class="text-white">À propos</h1>
  </section>
  <section>
    <div class="w-full">
      <div class="bg-violet-950 rounded-[15px] p-2.5 w-full">
        <RouterLink
          to="/about/cgu"
          class="flex justify-start items-center box-content self-stretch flex-grow-0 flex-shrink-0 h-6 relative gap-2 border-b border-white border-opacity-50 pb-3.5"
        >
          <IconCondition />
          <p class="flex-grow w-64 text-lg font-bold text-left text-white">
            Conditions d'utilisation
          </p>
          <IconTo />
        </RouterLink>
        <RouterLink
          to="/about/nda"
          class="flex justify-start items-center box-content self-stretch flex-grow-0 flex-shrink-0 h-6 relative gap-2 border-b border-white border-opacity-50 py-3.5"
        >
          <IconShield />
          <p class="flex-grow w-64 text-lg font-bold text-left text-white">
            Politique de confidentialité
          </p>
          <IconTo />
        </RouterLink>
        <RouterLink
          to="/about/rgpd"
          class="flex justify-start items-center box-content self-stretch flex-grow-0 flex-shrink-0 h-6 relative gap-2 pt-3.5"
        >
          <IconCookie />
          <p class="flex-grow w-64 text-lg font-bold text-left text-white">
            Politique des cookies
          </p>
          <IconTo />
        </RouterLink>
      </div>
      <div class="bg-violet-950 rounded-[15px] p-2.5 mt-8">
        <RouterLink
          to="/about/us"
          class="flex justify-start items-center box-content self-stretch flex-grow-0 flex-shrink-0 h-6 relative gap-2"
        >
          <IconTeam />
          <p class="flex-grow w-64 text-lg font-bold text-left text-white">À propos de nous</p>
          <IconTo />
        </RouterLink>
      </div>
    </div>
  </section>
</template>
