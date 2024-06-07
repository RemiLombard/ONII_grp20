<script setup lang="ts">
import { ref } from 'vue'
import { logOut } from '@/backend'
import { useRouter } from 'vue-router'
import IconDisconnect from '@/components/icons/IconDisconnect.vue'
import IconBin from '@/components/icons/IconBin.vue'

const router = useRouter()

const handleLogOut = () => {
  logOut()
  router.push('/') // Rediriger l'utilisateur vers la page de connexion
}
</script>

<template>
  <div class="bg-violet-950 rounded-[15px] p-2.5 mt-8">
    <div
      to="/about"
      class="flex justify-start items-center box-content self-stretch flex-grow-0 flex-shrink-0 h-6 relative gap-2 border-b border-white border-opacity-50 pb-3.5"
      @click="handleLogOut"
    >
      <IconDisconnect />
      <p class="flex-grow w-64 font-bold text-left text-red-400">Se déconnecter</p>
      <IconTo />
    </div>
    <div
      class="flex justify-start items-center box-content self-stretch flex-grow-0 flex-shrink-0 h-6 relative gap-2 pt-3.5"
    >
      <IconBin />
      <p class="flex-grow w-64 font-bold text-left text-red-400">Supprimer le compte</p>
      <IconTo />
    </div>
  </div>
</template>
