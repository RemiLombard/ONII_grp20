<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import IconBack from '@/components/icons/IconBack.vue';

const router = useRouter()

const sortOptions = ['Date (récent)', 'Date (ancien)']
const categories = [
  'Joie',
  'Peur',
  'Tristesse',
  'Colère',
  'Amour',
  'Famille',
  'Amis',
  'Loisirs',
  'Aventure',
  'Fantastique',
  'Exploration',
  'Voyage',
  'Suspens',
  'Historique',
  'Culture pop',
  'Spiritualité'
]
const types = ['Cauchemar', 'Rêve']
const yesNoOptions = ['Oui', 'Non']

const selectedSortOption = ref(sortOptions[0])
const selectedCategory = ref('')
const selectedType = ref('')
const selectedRecurrent = ref('')
const selectedLucide = ref('')

const applyFilters = () => {
  const filters = {
    sortOption: selectedSortOption.value,
    category: selectedCategory.value,
    type: selectedType.value,
    recurrent: selectedRecurrent.value,
    lucide: selectedLucide.value
  }

  router.push({ name: 'journal', query: filters })
}

const goBack = () => {
  router.go(-1)
}
</script>

<template>
    <section class="flex justify-between items-center flex-grow">
      <IconBack class="text-white" @click="goBack" />
      <div class="flex-grow text-right">
        <h1 class="text-white">Filtres</h1>
      </div>
    </section>
    <div class="mb-4">
      <label for="sort" class="text-lg font-Quicksand font-bold">Trier par</label>
      <select
        id="sort"
        v-model="selectedSortOption"
        class="w-full p-2 rounded bg-nightblue text-white"
      >
        <option v-for="option in sortOptions" :key="option" :value="option">{{ option }}</option>
      </select>
    </div>
    <div class="mb-4">
      <label for="category" class="text-lg font-Quicksand font-bold">Catégorie</label>
      <select
        id="category"
        v-model="selectedCategory"
        class="w-full p-2 rounded bg-nightblue text-white"
      >
        <option value="">Aucun</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </div>
    <div class="mb-4">
      <label for="type" class="text-lg font-Quicksand font-bold">Type</label>
      <select id="type" v-model="selectedType" class="w-full p-2 rounded bg-nightblue text-white">
        <option value="">Aucun</option>
        <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
      </select>
    </div>
    <div class="mb-4">
      <label for="recurrent" class="text-lg font-Quicksand font-bold">Rêve récurrent ?</label>
      <select
        id="recurrent"
        v-model="selectedRecurrent"
        class="w-full p-2 rounded bg-nightblue text-white"
      >
        <option value="">Aucun</option>
        <option v-for="option in yesNoOptions" :key="option" :value="option">{{ option }}</option>
      </select>
    </div>
    <div class="mb-5">
      <label for="lucide" class="text-lg font-Quicksand font-bold">Rêve lucide ?</label>
      <select
        id="lucide"
        v-model="selectedLucide"
        class="w-full p-2 rounded bg-nightblue text-white"
      >
        <option value="">Aucun</option>
        <option v-for="option in yesNoOptions" :key="option" :value="option">{{ option }}</option>
      </select>
    </div>
    <button @click="applyFilters" class="w-full p-3 bg-fuchsia-700 rounded-[15px] text-white">
      Enregistrer
    </button>
    <button @click="applyFilters" class="w-full p-3 bg-blue-200 rounded-[15px] text-black mt-5">
      Réinitialiser
    </button>
</template>
