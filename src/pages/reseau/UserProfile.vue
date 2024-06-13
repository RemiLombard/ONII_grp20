<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { pb, fetchOtherUserSharedDreams, fetchOtherUserLikedDreams, followUser, unfollowUser, checkIfFollowing } from '@/backend'
import CardDream from '@/components/CardReseau.vue'
import IconBack from '@/components/icons/IconBack.vue'

const router = useRouter()
const route = useRoute()
const userId = ref(route.params.userId || '')

const activeTab = ref('posts')
const userDreams = ref([])
const likedDreams = ref([])
const userProfile = ref(null)
const followingCount = ref(0)
const followersCount = ref(0)
const username = ref('')
const userAvatar = ref('')
const isFollowing = ref(false)

// Fetch user profile details
const fetchUserProfile = async () => {
  try {
    console.log(`Fetching profile for user: ${userId.value}`);
    const user = await pb.collection('users').getOne(userId.value)
    userProfile.value = user
    username.value = user.username
    userAvatar.value = user.avatar
      ? `https://onii.remilombard.fr/api/files/${user.collectionId}/${user.id}/${user.avatar}`
      : '/default-avatar.png'
    followingCount.value = user.following || 0
    followersCount.value = user.followers || 0

    checkFollowingStatus()
  } catch (error) {
    console.error('Error fetching user profile:', error)
  }
}

// Check if current user is following the profile user
const checkFollowingStatus = async () => {
  try {
    isFollowing.value = await checkIfFollowing(userId.value)
  } catch (error) {
    console.error('Error checking following status:', error)
  }
}

// Fetch user dreams
const fetchUserDreams = async () => {
  try {
    const dreams = await fetchOtherUserSharedDreams(userId.value)
    userDreams.value = dreams
  } catch (error) {
    console.error('Error fetching user dreams:', error)
  }
}

// Fetch liked dreams
const loadLikedDreams = async () => {
  try {
    const dreams = await fetchOtherUserLikedDreams(userId.value)
    likedDreams.value = dreams
  } catch (error) {
    console.error('Error fetching liked dreams:', error)
  }
}

const setActiveTab = (tab: string) => {
  activeTab.value = tab
}

const followOrUnfollowUser = async () => {
  try {
    if (isFollowing.value) {
      await unfollowUser(userId.value)
    } else {
      await followUser(userId.value)
    }
    await fetchUserProfile() // Rafraîchir les informations de profil
  } catch (error) {
    console.error('Error following/unfollowing user:', error)
  }
}

onMounted(() => {
  fetchUserProfile()
  fetchUserDreams()
  loadLikedDreams()
})

watch(route, () => {
  userId.value = route.params.userId
  fetchUserProfile()
  fetchUserDreams()
  loadLikedDreams()
})

const goBack = () => {
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
    <button
      @click="followOrUnfollowUser"
      :class="{
        'mt-5 px-4 py-2 rounded-full': true,
        'bg-blue-200 text-black items-center': isFollowing,
        'bg-fuchsia-700 text-white items-center': !isFollowing
      }"
    >
      {{ isFollowing ? 'Se désabonner' : "S'abonner" }}
    </button>
  </section>

  <div class="flex justify-center space-x-14 mt-6">
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
