<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { logIn } from '@/assets/backend';

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
        errorMessage.value = "Erreur lors de la connexion: " + (error as Error).message;
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <form @submit.prevent="handleSignIn">
        <div>
            <label for="email">Email:</label>
            <input class="text-black" type="email" id="email" v-model="email" required>
        </div>
        <div>
            <label for="password">Mot de passe:</label>
            <input class="text-black" type="password" id="password" v-model="password" required>
        </div>
        <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
        </div>
        <button type="submit" :disabled="isLoading">Se connecter</button>
    </form>
</template>
