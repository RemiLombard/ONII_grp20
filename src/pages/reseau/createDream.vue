<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createDream } from '@/backend'
import ButtonUser from '@/components/ButtonUser.vue'
import IconBack from '@/components/icons/IconBack.vue'

const router = useRouter()
const title = ref('')
const fullText = ref('')
const date = ref('')
const recurrent = ref('')
const lucide = ref('')
const type = ref('') // 'cauchemar' ou 'reve'
const categorie = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const handleCreateDream = async () => {
  if (!title.value || !fullText.value || !date.value || !recurrent.value || !lucide.value || !type.value || !categorie.value) {
    errorMessage.value = 'Tous les champs doivent être remplis'
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  try {
    const newDream = await createDream({
      title: title.value,
      fullText: fullText.value,
      date: date.value,
      recurrent: recurrent.value,
      lucide: lucide.value,
      type: type.value,
      categorie: categorie.value,
      partage: true // Toujours partager avec la communauté
    })
    router.push('/reseau')
  } catch (error) {
    errorMessage.value = 'Erreur lors de la création du rêve: ' + (error as Error).message
  } finally {
    isLoading.value = false
  }
}

const goBack = () => {
  router.back()
}
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
        text="Partager"
        size="medium"
        @click="handleCreateDream"
        :disabled="isLoading"
      />
    </section>

    <!-- Form Content -->
    <section class="mt-[97.6px] mb-10">
      <form @submit.prevent="handleCreateDream" class="mb-10">
        <div class="mb-10">
          <h2>Général</h2>
          <div class="mb-5">
            <label for="title" class="block text-lg font-Quicksand font-bold text-white">Titre du rêve :</label>
            <input
              class="text-white bg-nightblue border border-none mt-1 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-1 focus:ring-yellow-200"
              type="text"
              id="title"
              placeholder="Ajoutez un titre"
              v-model="title"
              required
            />
          </div>
          <div>
            <label for="fullText" class="block text-lg font-Quicksand font-bold text-white"
              >Contenu du rêve :</label
            >
            <textarea
              class="text-white bg-nightblue border border-none mt-1 rounded-lg w-full pt-2 pb-32 px-3 focus:outline-none focus:ring-1 focus:ring-yellow-200"
              id="fullText"
              v-model="fullText"
              placeholder="Décrivez votre rêve"
              required
            ></textarea>
          </div>
        </div>

        <div class="">
          <h2>Détails</h2>
          <div class="mb-5">
            <label for="type" class="block text-lg font-Quicksand font-bold text-white">Type de rêve :</label>
            <select
              class="text-white bg-nightblue border border-none mt-1 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-1 focus:ring-yellow-200"
              id="type"
              v-model="type"
              required
            >
              <option value="Cauchemar">Cauchemar</option>
              <option value="Rêve">Rêve</option>
            </select>
          </div>
          <div class="mb-5">
            <label for="date" class="block text-lg font-Quicksand font-bold text-white">Date du rêve :</label>
            <input
              class="text-white bg-nightblue border border-none mt-1 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-1 focus:ring-yellow-200"
              type="date"
              id="date"
              v-model="date"
              required
            />
          </div>
          <div class="mb-5">
            <label for="recurrent" class="block text-lg font-Quicksand font-bold text-white">Rêve récurrent ? :</label>
            <select
              class="text-white bg-nightblue border border-none mt-1 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-1 focus:ring-yellow-200"
              id="recurrent"
              v-model="recurrent"
              required
            >
              <option value="Oui">Oui</option>
              <option value="Non">Non</option>
            </select>
          </div>
          <div class="mb-5">
            <label for="lucide" class="block text-lg font-Quicksand font-bold text-white">Rêve lucide ? :</label>
            <select
              class="text-white bg-nightblue border border-none mt-1 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-1 focus:ring-yellow-200"
              id="lucide"
              v-model="lucide"
              required
            >
              <option value="Oui">Oui</option>
              <option value="Non">Non</option>
            </select>
          </div>
          <div class="mb-5">
            <label for="categorie" class="block text-lg font-Quicksand font-bold text-white">Catégorie :</label>
            <select
              class="text-white bg-nightblue border border-none mt-1 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-1 focus:ring-yellow-200"
              id="categorie"
              v-model="categorie"
              required
            >
              <option value="Joie">Joie</option>
              <option value="Peur">Peur</option>
              <option value="Tristesse">Tristesse</option>
              <option value="Colère">Colère</option>
              <option value="Amour">Amour</option>
              <option value="Famille">Famille</option>
              <option value="Amis">Amis</option>
              <option value="Loisirs">Loisirs</option>
              <option value="Aventure">Aventure</option>
              <option value="Fantastique">Fantastique</option>
              <option value="Exploration">Exploration</option>
              <option value="Voyage">Voyage</option>
              <option value="Suspens">Suspens</option>
              <option value="Historique">Historique</option>
              <option value="Culture pop">Culture pop</option>
              <option value="Spiritualité">Spiritualité</option>
            </select>
          </div>
        </div>
        <div v-if="errorMessage" class="text-red-400 text-center">
          {{ errorMessage }}
        </div>
      </form>
    </section>
  </div>
</template>
