<script setup lang="ts">
import { ref } from 'vue';
import PocketBase from 'pocketbase';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const login = async () => {
  const pb = new PocketBase('http://127.0.0.1:8090'); // URL de votre instance PocketBase

  try {
    const authData = await pb.collection('users').authWithPassword(email.value, password.value);
    console.log('Logged in successfully', authData);
    // Redirection après connexion réussie, par exemple vers une page d'accueil
    router.push('/home');
  } catch (error) {
    console.error('Login failed', error);
    // Gestion des erreurs de connexion, par exemple afficher un message d'erreur
    alert('Login failed: ' + error.message);
  }
};
</script>


<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
        <form @submit.prevent="login">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              v-model="email"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div class="mb-6">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              v-model="password"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full bg-indigo-500 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
        <RouterLink to="/signup" class="text-indigo-500 mt-4 inline-block text-center w-full">Sign up</RouterLink>
      </div>
    </div>
  </template>
  
