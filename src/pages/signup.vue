<script setup lang="ts">
import { ref } from 'vue'
import PocketBase from 'pocketbase'

const email = ref('')
const password = ref('')

const register = async () => {
  const pb = new PocketBase('http://127.0.0.1:8090') // URL de votre instance PocketBase

  try {
    const newUser = await pb.collection('users').create({
      email: email.value,
      password: password.value,
      passwordConfirm: password.value // PocketBase demande une confirmation du mot de passe
    })
    console.log('User registered successfully', newUser)
    // Redirection ou traitement après inscription réussie
  } catch (error) {
    console.error('Registration failed', error)
    // Gestion des erreurs d'inscription
  }
}
</script>

<template class="bg-linear">
    <div class="flex items-center justify-center min-h-screen">
      <div class="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 class="text-2xl font-bold text-center mb-6">Register</h2>
        <form @submit.prevent="register">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              v-model="email"
              class="mt-1 block w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div class="mb-6">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              v-model="password"
              class="mt-1 block w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full bg-indigo-500 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  </template>
