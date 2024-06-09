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
const partage = ref(false) // Ajout du champ de partage
const isLoading = ref(false)
const errorMessage = ref('')

const handleCreateDream = async () => {
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
      partage: partage.value // Inclure le champ de partage
    })
    router.push('/journal')
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
        text="Enregistrer"
        size="medium"
        @click="handleCreateDream"
        :disabled="isLoading"
      />
    </section>

    <!-- Form Content -->
    <section class="mt-[97.6px]">
      <form @submit.prevent="handleCreateDream" class="space-y-6">
        <div class="mb-10">
          <h2>Général</h2>
          <div class="mb-5">
            <label for="title" class="block text-lg font-bold text-white">Titre du rêve :</label>
            <input
              class="text-white bg-nightblue border border-none mt-1 rounded-lg w-full py-2 px-3"
              type="text"
              id="title"
              placeholder="Ajoutez un titre"
              v-model="title"
              required
            />
          </div>
          <div>
            <label for="fullText" class="block text-lg font-bold text-white"
              >Contenu du rêve :</label
            >
            <textarea
              class="text-white bg-nightblue border border-none mt-1 rounded-lg w-full pt-2 pb-32 px-3"
              id="fullText"
              v-model="fullText"
              placeholder="Décrivez votre rêve"
              required
            ></textarea>
          </div>
        </div>

        <div class="mb-8">
          <h2>Détails</h2>
          <div class="mb-5">
            <label for="type" class="block text-lg font-bold text-white">Type de rêve :</label>
            <select
              class="text-white bg-nightblue border border-none mt-1 rounded-lg w-full py-2 px-3"
              id="type"
              v-model="type"
              required
            >
              <option value="Cauchemar">Cauchemar</option>
              <option value="Rêve">Rêve</option>
            </select>
          </div>
          <div class="mb-5">
            <label for="date" class="block text-lg font-bold text-white">Date du rêve :</label>
            <input
              class="text-white bg-nightblue border border-none mt-1 rounded-lg w-full py-2 px-3"
              type="date"
              id="date"
              v-model="date"
              required
            />
          </div>
          <div class="mb-5">
            <label for="recurrent" class="block text-lg font-bold text-white">Rêve récurrent ? :</label>
            <select
              class="text-white bg-nightblue border border-none mt-1 rounded-lg w-full py-2 px-3"
              id="recurrent"
              v-model="recurrent"
              required
            >
              <option value="Oui">Oui</option>
              <option value="Non">Non</option>
            </select>
          </div>
          <div class="mb-5">
            <label for="lucide" class="block text-lg font-bold text-white">Rêve lucide ? :</label>
            <select
              class="text-white bg-nightblue border border-none mt-1 rounded-lg w-full py-2 px-3"
              id="lucide"
              v-model="lucide"
              required
            >
              <option value="Oui">Oui</option>
              <option value="Non">Non</option>
            </select>
          </div>
          <div class="mb-5">
            <label for="categorie" class="block text-lg font-bold text-white">Catégorie :</label>
            <select
              class="text-white bg-nightblue border border-none mt-1 rounded-lg w-full py-2 px-3"
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
          <div class="mb-5 flex gap-2 justify-center">
            <input
              type="checkbox"
              v-model="partage"
              class="text-white bg-nightblue border border-none mt-1 rounded"
            />
            <label class="block text-lg font-bold text-white">Partager ce rêve :</label>
            
          </div>
        </div>
        <div v-if="errorMessage" class="text-red-400 text-center">
          {{ errorMessage }}
        </div>
      </form>
    </section>
  </div>
</template>



