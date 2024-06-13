<script setup lang="ts">
import { ref } from 'vue'
import { pb } from '@/backend'

const username = ref('')
const avatar = ref<File | null>(null)

const fetchUserProfile = async () => {
  try {
    const userId = pb.authStore.model?.id
    if (!userId) throw new Error('User not logged in')
    const user = await pb.collection('users').getOne(userId)
    username.value = user.username
  } catch (error) {
    console.error('Error fetching user profile:', error)
  }
}

const updateProfile = async () => {
  try {
    const userId = pb.authStore.model?.id
    if (!userId) throw new Error('User not logged in')

    const formData = new FormData()
    formData.append('username', username.value)
    if (avatar.value) {
      formData.append('avatar', avatar.value)
    }

    await pb.collection('users').update(userId, formData)
    alert('Profil mis à jour avec succès')
  } catch (error) {
    console.error('Error updating profile:', error)
    alert('Erreur lors de la mise à jour du profil')
  }
}

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    avatar.value = target.files[0]
  }
}

fetchUserProfile()
</script>

<template>
    <div class="bg-slate-900 min-h-screen text-white p-8">
      <h1 class="text-2xl font-bold mb-4">Editer le profil</h1>
      <form @submit.prevent="updateProfile">
        <div class="mb-4">
          <label class="block text-gray-400 mb-2">Nom d'utilisateur</label>
          <input type="text" v-model="username" class="w-full p-2 bg-nightblue rounded" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-400 mb-2">Avatar</label>
          <input type="file" @change="onFileChange" class="w-full p-2 bg-nightblue rounded" />
        </div>
        <button type="submit" class="py-2 px-6 bg-pink-600 rounded-full">Sauvegarder</button>
      </form>
    </div>
  </template>
  

  
  