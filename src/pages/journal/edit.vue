<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { pb, updateDream } from '@/backend';
import ButtonUser from '@/components/ButtonUser.vue';
import IconBack from '@/components/icons/IconBack.vue';
import { ReveCategorieOptions, ReveTypeOptions, ReveLucideOptions, ReveRecurrentOptions } from '@/pocketbase-types';

const route = useRoute();
const router = useRouter();
const dream = ref({
  title: '',
  fullText: '',
  date: '',
  recurrent: '',
  lucide: '',
  type: '',
  categorie: '',
  partage: false
});
const isLoading = ref(false);
const errorMessage = ref('');

const fetchDreamDetails = async () => {
  try {
    const dreamId = route.params.id;
    if (!dreamId) {
      throw new Error('ID du rêve non fourni');
    }
    const response = await pb.collection('reve').getOne(dreamId);
    dream.value = response;
  } catch (error) {
    errorMessage.value = 'Erreur lors de la récupération des détails du rêve : ' + error.message;
  }
};

const handleUpdateDream = async () => {
  if (!dream.value.title || !dream.value.fullText || !dream.value.date || !dream.value.recurrent || !dream.value.lucide || !dream.value.type || !dream.value.categorie) {
    errorMessage.value = 'Tous les champs doivent être remplis'
    return
  }

  isLoading.value = true
  errorMessage.value = '';
  try {
    await updateDream(dream.value.id, {
      title: dream.value.title,
      fullText: dream.value.fullText,
      date: dream.value.date,
      recurrent: dream.value.recurrent,
      lucide: dream.value.lucide,
      type: dream.value.type,
      categorie: dream.value.categorie,
      partage: dream.value.partage
    });
    router.push('/journal');
  } catch (error) {
    errorMessage.value = 'Erreur lors de la mise à jour du rêve : ' + error.message;
  } finally {
    isLoading.value = false;
  }
};

const goBack = () => {
  router.back();
};

onMounted(() => {
  fetchDreamDetails();
});
</script>

<template>
  <div class="relative min-h-screen">
    <!-- Fixed Header -->
    <section
      class="fixed top-[86px] left-0 right-0 bg-slate-950 flex justify-between items-center p-5 z-10"
    >
      <IconBack class="text-white" @click="goBack" />
      <ButtonUser
        variant="default"
        text="Enregistrer"
        size="medium"
        @click="handleUpdateDream"
        :disabled="isLoading"
      />
    </section>

    <!-- Form Content -->
    <section class="mt-[97.6px]">
      <form @submit.prevent="handleUpdateDream" class="mb-10">
        <div class="mb-10">
          <h2>Général</h2>
          <div class="mb-5">
            <label for="title" class="block text-lg font-bold text-white">Titre du rêve :</label>
            <input
              class="text-white bg-nightblue border border-none mt-1 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-1 focus:ring-yellow-200"
              type="text"
              id="title"
              placeholder="Ajoutez un titre"
              v-model="dream.title"
              required
            />
          </div>
          <div>
            <label for="fullText" class="block text-lg font-bold text-white"
              >Contenu du rêve :</label
            >
            <textarea
              class="text-white bg-nightblue border border-none mt-1 rounded-lg w-full pt-2 pb-32 px-3 focus:outline-none focus:ring-1 focus:ring-yellow-200"
              id="fullText"
              v-model="dream.fullText"
              placeholder="Décrivez votre rêve"
              required
            ></textarea>
          </div>
        </div>

        <div class="">
          <h2>Détails</h2>
          <div class="mb-5">
            <label for="type" class="block text-lg font-bold text-white">Type de rêve :</label>
            <select
              class="text-white bg-nightblue border border-none mt-1 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-1 focus:ring-yellow-200"
              id="type"
              v-model="dream.type"
              required
            >
              <option :value="null" disabled>Sélectionnez une option</option>
              <option v-for="option in Object.values(ReveTypeOptions)" :key="option" :value="option">{{ option }}</option>
            </select>
          </div>
          <div class="mb-5">
            <label for="date" class="block text-lg font-bold text-white">Date du rêve :</label>
            <input
              class="text-white bg-nightblue border border-none mt-1 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-1 focus:ring-yellow-200"
              type="date"
              id="date"
              v-model="dream.date"
              required
            />
          </div>
          <div class="mb-5">
            <label for="recurrent" class="block text-lg font-bold text-white">Rêve récurrent ? :</label>
            <select
              class="text-white bg-nightblue border border-none mt-1 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-1 focus:ring-yellow-200"
              id="recurrent"
              v-model="dream.recurrent"
              required
            >
              <option :value="null" disabled>Sélectionnez une option</option>
              <option v-for="option in Object.values(ReveRecurrentOptions)" :key="option" :value="option">{{ option }}</option>
            </select>
          </div>
          <div class="mb-5">
            <label for="lucide" class="block text-lg font-bold text-white">Rêve lucide ? :</label>
            <select
              class="text-white bg-nightblue border border-none mt-1 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-1 focus:ring-yellow-200"
              id="lucide"
              v-model="dream.lucide"
              required
            >
              <option :value="null" disabled>Sélectionnez une option</option>
              <option v-for="option in Object.values(ReveLucideOptions)" :key="option" :value="option">{{ option }}</option>
            </select>
          </div>
          <div class="mb-5">
            <label for="categorie" class="block text-lg font-bold text-white">Catégorie :</label>
            <select
              class="text-white bg-nightblue border border-none mt-1 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-1 focus:ring-yellow-200"
              id="categorie"
              v-model="dream.categorie"
              required
            >
              <option :value="null" disabled>Sélectionnez une option</option>
              <option v-for="option in Object.values(ReveCategorieOptions)" :key="option" :value="option">{{ option }}</option>
            </select>
          </div>
        </div>
        <!-- Checkbox Partage -->
        <div class="mt-10 text-center">
          <input
            class="text-white bg-nightblue border border-none mr-2 rounded"
            type="checkbox"
            id="partage"
            v-model="dream.partage"
          />
          <label for="partage" class="text-lg font-bold text-white">Partager ce rêve avec la communauté</label>
        </div>
        <div v-if="errorMessage" class="text-red-400 text-center">
          {{ errorMessage }}
        </div>
      </form>
    </section>
  </div>
</template>
