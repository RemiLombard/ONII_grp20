<script setup lang="ts">
import { ref } from 'vue';
import { userSignup } from '@/assets/backend';

interface FormData {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  name: string;
  avatar?: File;
}

const formData = ref<FormData>({
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
  firstName: '',
  name: '',
});

const errorMessage = ref('');

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    formData.value.avatar = target.files[0];
  }
};

const signup = async () => {
  try {
    await userSignup(formData.value);
    // Redirection après l'inscription réussie
    window.location.href = '/welcome';
  } catch (error: any) {
    errorMessage.value = error.message;
  }
};
</script>

<template>
    <div>
      <h1>Inscription</h1>
      <form @submit.prevent="signup">
        <div>
          <label for="username">Nom d'utilisateur:</label>
          <input class="text-black" type="text" v-model="formData.username" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input class="text-black" type="email" v-model="formData.email" required />
        </div>
        <div>
          <label for="firstName">Prénom:</label>
          <input class="text-black" type="text" v-model="formData.firstName" required />
        </div>
        <div>
          <label for="lastName">Nom:</label>
          <input class="text-black" type="text" v-model="formData.name" required />
        </div>
        <div>
          <label for="password">Mot de passe:</label>
          <input class="text-black" type="password" v-model="formData.password" required />
        </div>
        <div>
          <label for="confirmPassword">Confirmer le mot de passe:</label>
          <input class="text-black" type="password" v-model="formData.passwordConfirm" required />
        </div>
        <div>
          <label for="avatar">Avatar (optionnel):</label>
          <input type="file" @change="onFileChange" />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
      <div v-if="errorMessage">{{ errorMessage }}</div>
    </div>
  </template>
