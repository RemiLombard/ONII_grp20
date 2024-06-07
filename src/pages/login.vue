<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { logIn } from '@/backend';
import ButtonUser from '@/components/ButtonUser.vue';
import IconLogo from '@/components/icons/IconLogo.vue';

const router = useRouter();
const email = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

const handleSignIn = async () => {
    isLoading.value = true;
    errorMessage.value = '';
    try {
        const authData = await logIn(email.value, password.value);
        console.log('authData:', authData); // Ajout de log pour diagnostiquer le problème
        if (authData && authData.token) {
            localStorage.setItem('authToken', authData.token);
            localStorage.setItem('userId', authData.record.id); // Utilisez authData.record.id
            router.push('/journal');
        } else {
            throw new Error('Les données de session sont manquantes.');
        }
    } catch (error) {
        errorMessage.value = 'Erreur lors de la connexion: ' + (error as Error).message;
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
  <div class="flex items-center gap-3">
    <h1>Bienvenue sur</h1>
    <IconLogo />
  </div>
  <div class="bg-nightblue py-10 px-5 rounded-3xl">
    <h1 class="text-center mt-0 mb-10 text-white">Connexion</h1>
    <form @submit.prevent="handleSignIn">
      <div class="mb-5">
        <label for="email" class="text-lg font-bold font-Quicksand text-left text-white">Email:</label>
        <input
          class="text-white border bg-violet-950 border-yellow-200 mt-1 rounded-lg w-full py-2 px-3"
          type="email"
          id="email"
          v-model="email"
          placeholder="Ex : damals@gmail.com"
          required
        />
      </div>
      <div class="mb-5">
        <label for="password" class="text-lg font-bold font-Quicksand text-left text-white">Mot de passe:</label>
        <input
          class="text-white border bg-violet-950 border-yellow-200 mt-1 rounded-lg w-full py-2 px-3"
          type="password"
          id="password"
          v-model="password"
          placeholder="8 caractères minimum"
          required
        />
      </div>
      <div v-if="errorMessage" class="mb-4 text-red-400">
        {{ errorMessage }}
      </div>
      <div class="flex flex-col items-center justify-center gap-5">
        <ButtonUser
          variant="default"
          text="Se connecter"
          size="medium"
          type="submit"
          :disabled="isLoading"
        />
        <p>
          Vous n'avez pas de compte ?
          <RouterLink to="/signup" class="text-yellow-200 hover:underline">Inscrivez-vous !</RouterLink>
        </p>
      </div>
    </form>
  </div>
</template>
