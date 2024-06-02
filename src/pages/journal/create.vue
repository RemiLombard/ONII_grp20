<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createDream } from '@/assets/backend';

const router = useRouter();
const title = ref('');
const fullText = ref('');
const date = ref('');
const recurent = ref(false);
const lucide = ref(false);
const type = ref(''); // 'cauchemar' ou 'reve'
const categorie = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

const handleCreateDream = async () => {
    isLoading.value = true;
    errorMessage.value = '';
    try {
        const newDream = await createDream({
            title: title.value,
            fullText: fullText.value,
            date: date.value,
            recurent: recurent.value,
            lucide: lucide.value,
            type: type.value,
            categorie: categorie.value
        });
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
            <label for="title">Titre du rêve :</label>
            <input class="text-black" type="text" id="title" v-model="title" required>
        </div>
        <div>
            <label for="fullText">Contenu du rêve :</label>
            <textarea class="text-black" id="fullText" v-model="fullText" required></textarea>
        </div>
        <div>
            <label for="date">Date du rêve :</label>
            <input class="text-black" type="date" id="date" v-model="date" required>
        </div>
        <div>
            <label for="recurent">Rêve récurrent :</label>
            <input class="text-black" type="checkbox" id="recurent" v-model="recurent">
        </div>
        <div>
            <label for="lucide">Rêve lucide :</label>
            <input class="text-black" type="checkbox" id="lucide" v-model="lucide">
        </div>
        <div>
            <label for="type">Type de rêve :</label>
            <select class="text-black" id="type" v-model="type" required>
                <option value="cauchemar">Cauchemar</option>
                <option value="reve">Rêve</option>
            </select>
        </div>
        <div>
            <label for="categorie">Catégorie :</label>
            <select class="text-black" id="categorie" v-model="categorie" required>
                <option value="joie">Joie</option>
                <option value="peur">Peur</option>
                <option value="tristesse">Tristesse</option>
                <option value="colère">Colère</option>
                <option value="amour">Amour</option>
                <option value="famille">Famille</option>
                <option value="amis">Amis</option>
                <option value="loisirs">Loisirs</option>
                <option value="aventure">Aventure</option>
                <option value="fantastique">Fantastique</option>
                <option value="exploration">Exploration</option>
                <option value="voyage">Voyage</option>
                <option value="suspens">Suspens</option>
                <option value="historique">Historique</option>
                <option value="culture pop">Culture pop</option>
                <option value="spiritualité">Spiritualité</option>
            </select>
        </div>
        <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
        </div>
        <button type="submit" :disabled="isLoading">Créer le rêve</button>
    </form>
</template>
