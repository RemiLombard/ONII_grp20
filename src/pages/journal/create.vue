<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createDream } from '@/backend';

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
        errorMessage.value = 'Erreur lors de la création du rêve: ' + (error as Error).message;
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
  <div class="bg-nightblue py-10 px-5 my-10 rounded-3xl max-w-lg mx-auto">
    <h1 class="text-2xl font-bold text-center text-white mb-8">Créer un nouveau rêve</h1>
    <form @submit.prevent="handleCreateDream" class="space-y-6">
      <div>
        <label for="title" class="block text-lg font-bold text-white">Titre du rêve :</label>
        <input class="text-white bg-violet-950 border border-yellow-200 mt-1 rounded-lg w-full py-2 px-3" type="text" id="title" v-model="title" required />
      </div>
      <div>
        <label for="fullText" class="block text-lg font-bold text-white">Contenu du rêve :</label>
        <textarea class="text-white bg-violet-950 border border-yellow-200 mt-1 rounded-lg w-full py-2 px-3" id="fullText" v-model="fullText" required></textarea>
      </div>
      <div>
        <label for="date" class="block text-lg font-bold text-white">Date du rêve :</label>
        <input class="text-white bg-violet-950 border border-yellow-200 mt-1 rounded-lg w-full py-2 px-3" type="date" id="date" v-model="date" required />
      </div>
      <div class="flex items-center">
        <input class="text-white bg-violet-950 border border-yellow-200 mr-2 rounded" type="checkbox" id="recurent" v-model="recurent" />
        <label for="recurent" class="text-lg font-bold text-white">Rêve récurrent</label>
      </div>
      <div class="flex items-center">
        <input class="text-white bg-violet-950 border border-yellow-200 mr-2 rounded" type="checkbox" id="lucide" v-model="lucide" />
        <label for="lucide" class="text-lg font-bold text-white">Rêve lucide</label>
      </div>
      <div>
        <label for="type" class="block text-lg font-bold text-white">Type de rêve :</label>
        <select class="text-white bg-violet-950 border border-yellow-200 mt-1 rounded-lg w-full py-2 px-3
" id="type" v-model="type" required>
          <option value="cauchemar">Cauchemar</option>
          <option value="reve">Rêve</option>
        </select>
      </div>
      <div>
        <label for="categorie" class="block text-lg font-bold text-white">Catégorie :</label>
        <select class="text-white bg-violet-950 border border-yellow-200 mt-1 rounded-lg w-full py-2 px-3" id="categorie" v-model="categorie" required>
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
      <div v-if="errorMessage" class="text-red-400 text-center">
        {{ errorMessage }}
      </div>
      <div class="flex justify-center">
        <button type="submit" class="bg-gradient-to-r from-blue-100 to-blue-300 text-black font-bold py-2 px-4 rounded-full" :disabled="isLoading">
          Créer le rêve
        </button>
      </div>
    </form>
  </div>
</template>
