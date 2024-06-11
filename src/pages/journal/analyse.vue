<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { pb } from '@/backend';
import IconBack from '@/components/icons/IconBack.vue';
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const dream = ref(null);
const analysisResult = ref('');
const isLoading = ref(false);
const errorMessage = ref('');
const userProfile = ref(null);

// Fonction pour récupérer les détails du rêve
const fetchDreamDetails = async () => {
  try {
    const dreamId = route.params.id;
    const response = await pb.collection('reve').getOne(dreamId, { expand: 'userId' });
    dream.value = response;
    userProfile.value = response.expand?.userId || {};
  } catch (error) {
    errorMessage.value = 'Erreur lors de la récupération des détails du rêve : ' + error.message;
  }
};

// Fonction pour analyser le rêve avec l'IA
const analyzeDream = async (dreamText) => {
  const url = 'https://api.together.xyz/v1/chat/completions';
  const apiKey = '89614d88374f9ae4488178d9c315ef8faec5bfbe7c14309a0a06393d85a0b6ad';

  const data = {
    model: "openchat/openchat-3.5-1210",
    messages: [
      { role: "system", content: "tu es un expert en psychologie Freudienne et en analyse de rêve. analyse les rêves suivants. Fait moi une réponse en 150 mots." },
      { role: "user", content: dreamText }
    ]
  };

  isLoading.value = true;
  errorMessage.value = '';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Erreur: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    analysisResult.value = result.choices[0].message.content;
  } catch (error) {
    errorMessage.value = 'Erreur lors de l\'analyse du rêve : ' + error.message;
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
    <section class="fixed top-[86px] left-0 right-0 bg-slate-950 flex justify-between items-center p-5 z-10">
      <IconBack class="text-white" @click="goBack" />
      <div class="text-end ml-5">
        <h1 class="m-0">Analyse de votre rêve</h1>
      </div>
    </section>

    <!-- Dream Content -->
    <section class="">
      <div v-if="dream" class="mt-24 mb-10 space-y-5">
        <div class="bg-violet-950 text-white p-2.5 rounded-[15px]">
          <div class="flex items-center mb-5">
            <img :src="userProfile?.avatar ? `http://127.0.0.1:8090/api/files/${userProfile?.collectionId}/${userProfile?.id}/${userProfile?.avatar}` : 'default-avatar.png'" alt="Profile" class="w-10 h-10 rounded-full mr-3" />
            <div>
              <p class="text-lg font-bold">Vous</p>
              <p class="text-sm text-gray-400">{{ new Date(dream?.date).toLocaleDateString('fr-FR') }}</p>
            </div>
          </div>
          <h3 class="font-bold">{{ dream?.title }}</h3>
          <p class="text-base mt-4">{{ dream.fullText }}</p>
        </div>
        <button @click="analyzeDream(dream.fullText)" :disabled="isLoading" class="py-2 px-4 bg-fuchsia-700 rounded-[15px] w-full text-white font-bold">
          Analyser le rêve
        </button>
        <div v-if="isLoading" class="text-base font-bold text-white">Analyse en cours...</div>
        <div v-if="analysisResult" class="bg-nightblue p-2.5 rounded-[15px] border border-yellow-200">
          <div class="flex items-center mb-5">
            <img src="/public/img/pdp_onii.png" alt="logo onii" class="w-10 h-10 rounded-full mr-3 border border-yellow-200">
            <div>
              <p class="text-lg font-bold">Onii IA</p>
              <p class="text-sm text-gray-400">{{ new Date(dream?.date).toLocaleDateString('fr-FR') }}</p>
            </div>
          </div>
          <h3 class="font-bold mb-5">Résultat de l'analyse</h3>
          <p class="text-base">{{ analysisResult }}</p>
          <p class="text-sm text-gray-400 font-light italic mt-5 text-center">
            Généré par une IA, basé sur de la science. Si vous êtes confus(e) ou avez besoin de parler à quelqu'un, contactez-nous ou allez voir un psychologue.
          </p>
        </div>
      </div>
      <div v-else class="text-white text-center">{{ errorMessage }}</div>
    </section>
  </div>
</template>
