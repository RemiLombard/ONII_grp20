<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import CardDiary from '@/components/CardDiary.vue';
import ButtonStat from '@/components/ButtonStat.vue';
import IconNew from '@/components/icons/IconNew.vue';
import IconFilter from '@/components/icons/IconFilter.vue';
import { getUserDreams, searchUserDreams, filterUserDreams } from '@/backend';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

const dreams = ref([]);
const groupedDreams = ref({});
const searchQuery = ref('');
const route = useRoute();
const router = useRouter();

const groupDreamsByMonthYear = (dreams) => {
  const grouped = dreams.reduce((acc, dream) => {
    const date = parseISO(dream.date);
    const monthYear = format(date, 'MMMM yyyy', { locale: fr });
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(dream);
    return acc;
  }, {});
  return grouped;
};

const fetchDreams = async (filters = {}) => {
  try {
    const userDreams = await filterUserDreams(filters);
    dreams.value = userDreams.sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
    groupedDreams.value = groupDreamsByMonthYear(dreams.value);
  } catch (error) {
    console.error('Erreur lors de la récupération des rêves:', error);
  }
};

const searchDreams = async () => {
  try {
    const userDreams = await searchUserDreams(searchQuery.value);
    dreams.value = userDreams.sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
    groupedDreams.value = groupDreamsByMonthYear(dreams.value);
  } catch (error) {
    console.error('Erreur lors de la recherche des rêves:', error);
  }
};

const handleDeleteDream = (id) => {
  dreams.value = dreams.value.filter(dream => dream.id !== id);
  groupedDreams.value = groupDreamsByMonthYear(dreams.value);
};

onMounted(() => {
  fetchDreams(route.query);
});

watch(
  () => route.query,
  (newQuery) => {
    fetchDreams(newQuery);
  }
);

watch(searchQuery, (newQuery) => {
  if (newQuery) {
    searchDreams();
  } else {
    fetchDreams(route.query);
  }
});
</script>

<template>
  <div class="flex justify-between w-full items-center">
    <h1 class="text-4xl">Vos rêves</h1>
    <RouterLink to="/journal/stats" class="text-white">
      <ButtonStat />
    </RouterLink>
  </div>
  <div class="flex items-center justify-between mb-8">
    <input
      type="text"
      placeholder="Rechercher des rêves"
      v-model="searchQuery"
      class="py-3 px-2.5 bg-nightblue w-full mr-2.5 text-white rounded focus:outline-none focus:ring-1 focus:ring-yellow-200"
    />
    <RouterLink to="/journal/filter" class="ml-2 p-3.5 bg-nightblue text-white rounded">
      <IconFilter />
    </RouterLink>
  </div>
  <section class="mb-8 flex flex-col gap-5">
    <div v-if="dreams.length === 0" class="flex items-center justify-center h-96">
      <p class="text-center text-gray-400">Vous n'avez pas encore de rêve enregistré dans votre journal.</p>
    </div>
    <div v-else>
      <div v-for="(dreams, monthYear) in groupedDreams" :key="monthYear" class="mb-10">
        <p class="text-sm italic font-light mb-5 text-gray-400">{{ monthYear }}</p>
        <article v-for="dream in dreams" :key="dream.id" class="mb-5">
          <CardDiary
            :id="dream.id"
            :title="dream.title"
            :excerpt="dream.excerpt"
            :date="dream.date"
            :categorie="dream.categorie"
            @deleteDream="handleDeleteDream"
          />
        </article>
      </div>
    </div>
  </section>
  <RouterLink to="/journal/create">
    <button
      class="fixed bottom-4 right-4 p-3 bg-blue-200 text-black rounded-[500px]"
    >
      <IconNew />
    </button>
  </RouterLink>
</template>
