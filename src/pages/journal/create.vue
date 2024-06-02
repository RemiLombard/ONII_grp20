<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createDream } from '@/assets/backend';

const router = useRouter();
const title = ref('');
const fullText = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

const handleCreateDream = async () => {
    isLoading.value = true;
    errorMessage.value = '';
    try {
        const newDream = await createDream({ title: title.value, fullText: fullText.value });
        router.push('/journal');
    } catch (error) {
        errorMessage.value = "Erreur lors de la création du rêve: " + (error as Error).message;
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <form @submit.prevent="handleCreateDream">
        <div>
            <label for="title">Titre du rêve:</label>
            <input class="text-black" type="text" id="title" v-model="title" required>
        </div>
        <div>
            <label for="fullText">Contenu du rêve:</label>
            <textarea class="text-black" id="fullText" v-model="fullText" required></textarea>
        </div>
        <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
        </div>
        <button type="submit" :disabled="isLoading">Créer le rêve</button>
    </form>
</template>
