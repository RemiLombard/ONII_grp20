<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { requestPasswordReset } from '@/backend';
import ButtonUser from '@/components/ButtonUser.vue';

const router = useRouter();
const email = ref('');
const isLoading = ref(false);
const message = ref('');
const errorMessage = ref('');
const isCountdown = ref(false);
const countdown = ref(5); // Début du compte à rebours à 5 secondes

const handleForgotPassword = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  message.value = '';
  try {
    await requestPasswordReset(email.value);
    message.value = 'Un email de réinitialisation a été envoyé.';
    isCountdown.value = true;
    startCountdown();
  } catch (error) {
    errorMessage.value = 'Erreur lors de la demande de réinitialisation: ' + (error as Error).message;
  } finally {
    isLoading.value = false;
  }
};

const startCountdown = () => {
  const interval = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value -= 1;
    } else {
      clearInterval(interval);
      router.push('/'); // Redirection vers la page de connexion
    }
  }, 1000);
};
</script>

<template>
    <div class="bg-nightblue py-10 px-5 rounded-3xl">
      <h1 class="text-center mt-0 mb-10 text-white">Réinitialiser le mot de passe</h1>
      <form @submit.prevent="handleForgotPassword">
        <div v-if="!isCountdown" class="mb-5">
          <label for="email" class="text-lg font-bold font-Quicksand text-left text-white">Email:</label>
          <input
            class="text-white border bg-violet-950 border-none mt-1 rounded-lg w-full py-2 px-3"
            type="email"
            id="email"
            v-model="email"
            placeholder="Entrez votre email"
            required
          />
        </div>
        <div v-if="message" class="mb-4 text-yellow-400">
          {{ message }}
        </div>
        <div v-if="errorMessage" class="mb-4 text-red-400">
          {{ errorMessage }}
        </div>
        <div v-if="isCountdown" class="mb-4 text-yellow-400">
          Redirection vers la page de connexion dans {{ countdown }} secondes...
        </div>
        <div v-if="!isCountdown" class="flex flex-col items-center justify-center gap-5">
          <ButtonUser
            variant="default"
            text="Envoyer"
            size="medium"
            type="submit"
            :disabled="isLoading"
          />
        </div>
      </form>
    </div>
  </template>
  
 
  