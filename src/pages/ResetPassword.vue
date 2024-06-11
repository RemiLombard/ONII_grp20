<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ButtonUser from '@/components/ButtonUser.vue';
import { resetPassword } from '@/backend';
import IconLogo from '@/components/icons/IconLogo.vue';

const router = useRouter();
const route = useRoute();
const token = route.params.token as string; // Utiliser params pour obtenir le token de l'URL

const password = ref('');
const passwordConfirm = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

const handleChangePassword = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  try {
    if (password.value !== passwordConfirm.value) {
      throw new Error('Les mots de passe ne correspondent pas.');
    }
    console.log('Réinitialisation du mot de passe avec le jeton:', token);
    await resetPassword(token, password.value);
    router.push('/'); // Redirection vers la page de connexion après le changement de mot de passe
  } catch (error) {
    console.error('Erreur lors du changement de mot de passe:', error);
    errorMessage.value = 'Erreur lors du changement de mot de passe: ' + (error as Error).message;
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="flex items-center gap-3 justify-center">
    <h1>Bienvenue sur</h1>
    <IconLogo class="" />
  </div>
  <div class="bg-nightblue py-10 my-10 px-5 rounded-3xl">
    <h1 class="text-center mt-0 mb-10 text-white">Changer de mot de passe</h1>
    <form @submit.prevent="handleChangePassword">
      <div class="mb-5">
        <label for="password" class="text-lg font-bold font-Quicksand text-left text-white">Nouveau mot de passe:</label>
        <input
          class="text-white border bg-violet-950 border-none mt-1 rounded-lg w-full py-2 px-3"
          type="password"
          id="password"
          v-model="password"
          placeholder="Nouveau mot de passe"
          required
        />
      </div>
      <div class="mb-5">
        <label for="passwordConfirm" class="text-lg font-bold font-Quicksand text-left text-white">Confirmer nouveau mot de passe:</label>
        <input
          class="text-white border bg-violet-950 border-none mt-1 rounded-lg w-full py-2 px-3"
          type="password"
          id="passwordConfirm"
          v-model="passwordConfirm"
          placeholder="Confirmer nouveau mot de passe"
          required
        />
      </div>
      <div v-if="errorMessage" class="mb-4 text-red-400">
        {{ errorMessage }}
      </div>
      <div class="flex flex-col items-center justify-center gap-5">
        <ButtonUser
          variant="default"
          text="Changer de mot de passe"
          size="medium"
          type="submit"
          :disabled="isLoading"
        />
      </div>
    </form>
  </div>
</template>


