
<script setup lang="ts">
  import { ref } from 'vue';
  import { pb, Collections } from '@/backend';
  import { UsersResponse } from '@/pocketbase-types';
  
  const props = defineProps({
    isVisible: Boolean,
  });
  
  const emit = defineEmits(['close']);
  
  const username = ref('');
  const avatar = ref<File | null>(null);
  
  const fetchCurrentUser = async () => {
    try {
      const userId = pb.authStore.model?.id;
      if (!userId) {
        throw new Error('Utilisateur non connecté');
      }
      const user = await pb.collection(Collections.Users).getOne<UsersResponse>(userId);
      username.value = user.username;
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };
  
  const handleAvatarChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      avatar.value = target.files[0];
    }
  };
  
  const updateProfile = async () => {
    try {
      const userId = pb.authStore.model?.id;
      if (!userId) {
        throw new Error('Utilisateur non connecté');
      }
      const formData = new FormData();
      formData.append('username', username.value);
      if (avatar.value) {
        formData.append('avatar', avatar.value);
      }
      await pb.collection(Collections.Users).update(userId, formData);
      emit('close');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  const close = () => {
    emit('close');
  };
  
  fetchCurrentUser();
  </script>
  
<template>
    <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div class="bg-white p-8 rounded-lg">
        <h2 class="text-xl font-bold mb-4">Modifier le profil</h2>
        <form @submit.prevent="updateProfile">
          <div class="mb-4">
            <label for="username" class="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
            <input v-model="username" id="username" type="text" class="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-200" required />
          </div>
          <div class="mb-4">
            <label for="avatar" class="block text-sm font-medium text-gray-700">Avatar</label>
            <input @change="handleAvatarChange" id="avatar" type="file" class="mt-1 block w-full text-sm text-gray-400 focus:outline-none focus:ring-1 focus:ring-yellow-200" />
          </div>
          <div class="flex space-x-4">
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Enregistrer</button>
            <button type="button" @click="close" class="px-4 py-2 bg-gray-300 rounded">Annuler</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  
  