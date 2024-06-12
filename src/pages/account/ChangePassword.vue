<template>
  <div class="bg-nightblue py-10 my-10 px-5 rounded-3xl">
    <h1 class="text-center mt-0 mb-10 text-white">Changer de mot de passe</h1>
    <form @submit.prevent="handleChangePassword">
      <div class="mb-5">
        <label for="currentEmail" class="text-lg font-bold font-Quicksand text-left text-white">Email actuel:</label>
        <input
          class="text-white border bg-violet-950 border-none mt-1 rounded-lg w-full py-2 px-3"
          type="email"
          id="currentEmail"
          v-model="currentEmail"
          placeholder="Email actuel"
          required
        />
      </div>
      <div class="mb-5">
        <label for="currentPassword" class="text-lg font-bold font-Quicksand text-left text-white">Mot de passe actuel:</label>
        <input
          class="text-white border bg-violet-950 border-none mt-1 rounded-lg w-full py-2 px-3"
          type="password"
          id="currentPassword"
          v-model="currentPassword"
          placeholder="Mot de passe actuel"
          required
        />
      </div>
      <div class="mb-5">
        <label for="newPassword" class="text-lg font-bold font-Quicksand text-left text-white">Nouveau mot de passe:</label>
        <input
          class="text-white border bg-violet-950 border-none mt-1 rounded-lg w-full py-2 px-3"
          type="password"
          id="newPassword"
          v-model="newPassword"
          placeholder="Nouveau mot de passe"
          required
        />
      </div>
      <div class="mb-5">
        <label for="newPasswordConfirm" class="text-lg font-bold font-Quicksand text-left text-white">Confirmer nouveau mot de passe:</label>
        <input
          class="text-white border bg-violet-950 border-none mt-1 rounded-lg w-full py-2 px-3"
          type="password"
          id="newPasswordConfirm"
          v-model="newPasswordConfirm"
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
          text="Changer le mot de passe"
          size="medium"
          type="submit"
          :disabled="isLoading"
        />
      </div>
      <div v-if="successMessage" class="mt-4 text-green-400">
        {{ successMessage }}
      </div>
      <div v-if="countdown > 0" class="mt-4 text-white">
        Redirection dans {{ countdown }} ...
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ButtonUser from '@/components/ButtonUser.vue';
import { changePassword } from '@/backend';

const router = useRouter();

const currentEmail = ref('');
const currentPassword = ref('');
const newPassword = ref('');
const newPasswordConfirm = ref('');
const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const countdown = ref(0);

const handleChangePassword = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  successMessage.value = '';
  try {
    if (newPassword.value !== newPasswordConfirm.value) {
      throw new Error('Les mots de passe ne correspondent pas.');
    }
    await changePassword(currentEmail.value, currentPassword.value, newPassword.value);
    
    successMessage.value = 'Mot de passe changé avec succès !';
    
    countdown.value = 3;
    const interval = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0) {
        clearInterval(interval);
        router.push('/'); // Redirection vers la page d'accueil
      }
    }, 1000); // 1000 millisecondes = 1 seconde

  } catch (error) {
    console.error('Error changing password:', error);
    errorMessage.value = 'Erreur lors du changement de mot de passe : ' + (error as Error).message;
  } finally {
    isLoading.value = false;
  }
};
</script>
