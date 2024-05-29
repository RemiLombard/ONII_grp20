<script setup lang="ts">
import { ref } from 'vue';
import { logIn } from '@/assets/backend';

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const login = async () => {
  try {
    await logIn({ email: email.value, password: password.value });
    // Redirection après la connexion réussie
    window.location.href = '/dashboard'; // Suppose que '/dashboard' est la page de tableau de bord après la connexion
  } catch (error: any) {
    errorMessage.value = error.message;
  }
};
</script>

<template>
    <div>
      <h1>Connexion</h1>
      <form @submit.prevent="login">
        <div>
          <label for="email">Email:</label>
          <input class="text-black" type="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Mot de passe:</label>
          <input class="text-black" type="password" v-model="password" required />
        </div>
        <button type="submit">Se connecter</button>
      </form>
      <div v-if="errorMessage">{{ errorMessage }}</div>
    </div>
  </template>
  
