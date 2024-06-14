<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive, watch } from 'vue'
import FeedForYou from '@/components/FeedForYou.vue'
import FeedSubscriptions from '@/components/FeedSubscriptions.vue'
import { useRouter, useRoute } from 'vue-router'
import IconFilter from '@/components/icons/IconFilter.vue'
import IconNew from '@/components/icons/IconNew.vue'

const activeTab = ref('pour-vous')
const searchQuery = ref('')
const filters = reactive({
  sortOption: '',
  category: '',
  type: '',
  recurrent: '',
  lucide: ''
})
const router = useRouter()
const route = useRoute()

const setActiveTab = (tab: string) => {
  activeTab.value = tab
}

const openFilter = () => {
  router.push('/reseau/filter')
}

const isHeaderVisible = ref(true)
let lastScrollTop = 0

const handleScroll = () => {
  const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop
  if (currentScrollTop > lastScrollTop) {
    isHeaderVisible.value = false
  } else {
    isHeaderVisible.value = true
  }
  lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // Initialize filters from route query
  Object.assign(filters, route.query)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(route, () => {
  // Update filters when route changes
  Object.assign(filters, route.query)
})
</script>

<template>
  <head>
      <title>Explorez les Rêves Partagés - Réseau</title>
      <meta name="description" content="Découvrez et explorez les rêves partagés par la communauté. Recherchez, filtrez et trouvez des inspirations oniriques." />
      <meta name="keywords" content="réseau de rêves, rêves partagés, communauté onirique, exploration de rêves" />
      <meta name="author" content="Votre Nom" />
    </head>
  <div class="mb-10">
    <section :class="['fixed flex opacity-95 flex-col left-0 right-0 bg-slate-950 justify-between items-center z-10 px-5 transition-transform duration-300', isHeaderVisible ? 'translate-y-0' : '-translate-y-full']">
      <div class="flex items-center w-full justify-between my-8">
        <input
          type="text"
          placeholder="Rechercher des rêves"
          v-model="searchQuery"
          class="py-3 px-2.5 bg-nightblue w-full mr-2.5 text-white rounded focus:outline-none focus:ring-1 focus:ring-yellow-200"
        />
        <button @click="openFilter" class="ml-2 p-3.5 bg-nightblue text-white rounded">
          <IconFilter />
        </button>
      </div>

      <div class="flex justify-center space-x-14 lg:space-x-96">
        <button
          class="pb-2.5 flex-grow text-center text-lg font-bold"
          :class="{ 'border-b-4 text-yellow-200 border-yellow-200': activeTab === 'pour-vous' }"
          @click="setActiveTab('pour-vous')"
        >
          Pour vous
        </button>
        <button
          class="pb-2.5 flex-grow text-center text-lg font-bold"
          :class="{ 'border-b-4 text-yellow-200 border-yellow-200': activeTab === 'abonnements' }"
          @click="setActiveTab('abonnements')"
        >
          Abonnements
        </button>
      </div>
    </section>

    <div class="pt-48">
      <div v-if="activeTab === 'pour-vous'">
        <FeedForYou :searchQuery="searchQuery" :filters="filters" />
      </div>
      <div v-else>
        <FeedSubscriptions :searchQuery="searchQuery" :filters="filters" />
      </div>
    </div>

    <RouterLink to="/reseau/create">
      <button
        class="fixed bottom-4 right-4 p-3 bg-blue-200 text-black rounded-[500px]"
      >
        <IconNew />
      </button>
    </RouterLink>
  </div>
</template>
