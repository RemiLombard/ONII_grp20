<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { addUser } from '@/backend';

const router = useRouter();
const email = ref('');
const username = ref('');
const name = ref('');
const firstName = ref('');
const password = ref('');
const passwordConfirm = ref('');
const avatar = ref<File | null>(null);
const isLoading = ref(false);
const errorMessage = ref('');

const handleSignUp = async () => {
    isLoading.value = true;
    errorMessage.value = '';
    try {
        await addUser({
            email: email.value,
            password: password.value,
            passwordConfirm: passwordConfirm.value,
            username: username.value,
            firstName: firstName.value,
            name: name.value,
            avatar: avatar.value as File,
        });
        router.push('/login');
    } catch (error) {
        errorMessage.value = "Erreur lors de l'inscription: " + (error as Error).message;
    } finally {
        isLoading.value = false;
    }
};

const handleAvatarChange = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        avatar.value = file;
    }
};
</script>

<template>
  <form @submit.prevent="handleSignUp">
    <div>
      <label for="email">Email:</label>
      <input
        class="text-black"
        type="email"
        id="email"
        v-model="email"
        placeholder="Ex : damals@gmail.com"
        required
      />
    </div>
    <div>
      <label for="username">Nom d'utilisateur:</label>
      <input
        class="text-black"
        type="text"
        id="username"
        v-model="username"
        placeholder="Ex : damals25"
        required
      />
    </div>
    <div>
      <label for="firstName">Prénom:</label>
      <input
        class="text-black"
        type="text"
        id="firstName"
        v-model="firstName"
        placeholder="Ex : David"
        required
      />
    </div>
    <div>
      <label for="name">Nom:</label>
      <input
        class="text-black"
        type="text"
        id="name"
        v-model="name"
        placeholder="Ex : Malsot"
        required
      />
    </div>
    <div>
      <label for="password">Mot de passe:</label>
      <input class="text-black" type="password" id="password" v-model="password" required />
    </div>
    <div>
      <label for="passwordConfirm">Confirmez le mot de passe:</label>
      <input
        class="text-black"
        type="password"
        id="passwordConfirm"
        v-model="passwordConfirm"
        required
      />
    </div>
    <div>
      <label for="avatar">Avatar:</label>
      <input class="text-black" type="file" id="avatar" @change="handleAvatarChange" accept="image/*" />
    </div>
    <div v-if="password !== passwordConfirm" class="error-message">
      Les mots de passe ne correspondent pas
    </div>
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    <button type="submit" :disabled="isLoading">S'inscrire</button>
  </form>
</template>
