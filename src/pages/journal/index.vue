<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { RouterLink } from 'vue-router';
import CardDiary from '@/components/CardDiary.vue';
import ButtonStat from '@/components/ButtonStat.vue';
import IconNew from '@/components/icons/IconNew.vue';
import { getUserDreams, searchUserDreams } from '@/backend';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

const dreams = ref([]);
const groupedDreams = ref({});
const searchQuery = ref('');

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

const fetchDreams = async () => {
    try {
        const userDreams = await getUserDreams();
        dreams.value = userDreams.sort((a, b) => new Date(b.date) - new Date(a.date));
        groupedDreams.value = groupDreamsByMonthYear(dreams.value);
    } catch (error) {
        console.error('Erreur lors de la récupération des rêves:', error);
    }
};

const searchDreams = async () => {
    try {
        const userDreams = await searchUserDreams(searchQuery.value);
        dreams.value = userDreams.sort((a, b) => new Date(b.date) - new Date(a.date));
        groupedDreams.value = groupDreamsByMonthYear(dreams.value);
    } catch (error) {
        console.error('Erreur lors de la recherche des rêves:', error);
    }
};

onMounted(() => {
    fetchDreams();
});

watch(searchQuery, (newQuery) => {
    if (newQuery) {
        searchDreams();
    } else {
        fetchDreams();
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
  <div class="flex items-center justify-between mb-6">
    <input
      type="text"
      placeholder="Rechercher des rêves"
      v-model="searchQuery"
      class="py-3 px-2.5 bg-nightblue text-white rounded"
    />
  </div>
  <section class="mb-8 flex flex-col gap-5">
    <div v-for="(dreams, monthYear) in groupedDreams" :key="monthYear">
      <p class="text-sm italic font-light mb-5 text-gray-400">{{ monthYear }}</p>
      <article v-for="dream in dreams" :key="dream.id">
        <CardDiary
          :id="dream.id"
          :title="dream.title"
          :excerpt="dream.excerpt"
          :date="dream.date"
          :categorie="dream.categorie"
          class="mb-5"
        />
      </article>
    </div>
  </section>
  <RouterLink to="/journal/create">
    <button
      class="fixed bottom-4 right-4 p-3 bg-gradient-to-r from-blue-100 to-blue-300 text-black rounded-[500px]"
    >
      <IconNew />
    </button>
  </RouterLink>
</template>

