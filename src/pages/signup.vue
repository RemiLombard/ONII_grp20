<script setup lang="ts">
import { ref } from 'vue';
import { addUser } from '@/assets/backend';

const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

const handleSignUp = async () => {
    isLoading.value = true;
    errorMessage.value = '';
    try {
        await addUser({
            email: email.value,
            password: password.value,
            passwordConfirm: passwordConfirm.value
        });
        // Redirection ou mise à jour de l'état après l'inscription réussie
    } catch (error) {
        errorMessage.value = "Erreur lors de l'inscription: " + (error as Error).message;
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <form @submit.prevent="handleSignUp">
        <div>
            <label for="email">Email:</label>
            <input class="text-black" type="email" id="email" v-model="email" required>
        </div>
        <div>
            <label for="password">Mot de passe:</label>
            <input class="text-black" type="password" id="password" v-model="password" required>
        </div>
        <div>
            <label for="passwordConfirm">Confirmez le mot de passe:</label>
            <input class="text-black" type="password" id="passwordConfirm" v-model="passwordConfirm" required>
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
