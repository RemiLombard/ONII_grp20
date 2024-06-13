<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { pb, fetchUserSharedDreams, fetchLikedDreams } from '@/backend'
import CardDream from '@/components/CardReseau.vue'
import IconBack from '@/components/icons/IconBack.vue'

const router = useRouter()

const activeTab = ref('posts')
const userDreams = ref([])
const likedDreams = ref([])
const userProfile = ref(null)
const followingCount = ref(0)
const followersCount = ref(0)
const username = ref('')
const userAvatar = ref('')

// Fetch user profile details
const fetchUserProfile = async () => {
  try {
    const userId = pb.authStore.model?.id
    if (!userId) throw new Error('User not logged in')
    const user = await pb.collection('users').getOne(userId)
    userProfile.value = user
    username.value = user.username
    userAvatar.value = user.avatar
      ? `http://127.0.0.1:8090/api/files/${user.collectionId}/${user.id}/${user.avatar}`
      : '/default-avatar.png'
    followingCount.value = user.following || 0
    followersCount.value = user.followers || 0
  } catch (error) {
    console.error('Error fetching user profile:', error)
  }
}

// Fetch user dreams
const fetchUserDreams = async () => {
  try {
    const dreams = await fetchUserSharedDreams()
    userDreams.value = dreams
  } catch (error) {
    console.error('Error fetching user dreams:', error)
  }
}

// Fetch liked dreams
const loadLikedDreams = async () => {
  try {
    const dreams = await fetchLikedDreams()
    likedDreams.value = dreams
  } catch (error) {
    console.error('Error fetching liked dreams:', error)
  }
}

const setActiveTab = (tab: string) => {
  activeTab.value = tab
}

const editProfile = () => {
  router.push({ name: 'edit-profile' })
}

onMounted(() => {
  fetchUserProfile()
  fetchUserDreams()
  loadLikedDreams()
})

const goBack = () => {
  console.log('Go back clicked') // Debug log
  router.go(-1)
}
</script>

<template>
  <div class="w-full h-20 bg-nightblue absolute left-0 -z-10 flex items-center"></div>
  <IconBack class="absolute mt-5" @click="goBack" />
  <section class="flex flex-col items-center p-5 pt-0">
    <img
      :src="userAvatar"
      alt="Profile"
      class="w-40 h-40 rounded-full mb-5 border-[25px] border-nightblue border-solid"
    />
    <h2 class="">{{ username }}</h2>
    <div class="flex space-x-5">
      <p class="text-white">{{ followingCount }} <span class="text-gray-400">Abonnements</span></p>
      <p class="text-white">{{ followersCount }} <span class="text-gray-400">Abonnés</span></p>
    </div>
    <button @click="editProfile" class="mt-5 px-4 py-2 bg-fuchsia-700 text-white rounded-full">
      Editer le profil
    </button>
  </section>

  <div class="flex justify-center space-x-14 mt-3">
    <button
      class="pb-2.5 flex-grow text-center text-lg font-bold"
      :class="{ 'border-b-4 text-yellow-200 border-yellow-200': activeTab === 'posts' }"
      @click="setActiveTab('posts')"
    >
      Posts
    </button>
    <button
      class="pb-2.5 flex-grow text-center text-lg font-bold"
      :class="{ 'border-b-4 text-yellow-200 border-yellow-200': activeTab === 'likes' }"
      @click="setActiveTab('likes')"
    >
      J'aime
    </button>
  </div>

  <div class="mt-6">
    <div v-if="activeTab === 'posts'">
      <CardDream
        v-for="dream in userDreams"
        :key="dream.id"
        :id="dream.id"
        :title="dream.title"
        :excerpt="dream.excerpt"
        :date="dream.created"
        :user="dream.user"
        :likes="dream.likes || 0"
        :comments="dream.comments || 0"
        @deleteDream="fetchUserDreams"
      />
    </div>
    <div v-if="activeTab === 'likes'">
      <CardDream
        v-for="dream in likedDreams"
        :key="dream.id"
        :id="dream.id"
        :title="dream.title"
        :excerpt="dream.excerpt"
        :date="dream.created"
        :user="dream.user"
        :likes="dream.likes || 0"
        :comments="dream.comments || 0"
        @deleteDream="loadLikedDreams"
      />
    </div>
  </div>
</template>
