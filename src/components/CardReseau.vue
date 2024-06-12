<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { addLike, removeLike, pb, deleteDream, reportPost, blockUser } from '@/backend'
import { Collections } from '@/pocketbase-types'
import IconPoints from './icons/IconPoints.vue'
import IconTag from './icons/IconTag.vue'
import IconLike from './icons/IconLike.vue'
import IconCom from './icons/IconCom.vue'
import { RouterLink } from 'vue-router'
import defaultAvatar from '/default-avatar.png'
import ParamsReseau from './ParamsReseau.vue'

const props = defineProps({
  id: String,
  title: String,
  excerpt: String,
  date: String,
  categorie: String,
  user: {
    type: Object,
    required: false,
    default: null
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: {
    type: Number,
    default: 0
  }
})

const liked = ref(false)
const totalLikes = ref(props.likes)

const checkIfLiked = async () => {
  try {
    const userId = pb.authStore.model?.id
    const filter = `dreamId = '${props.id}' && userId = '${userId}'`
    const existingLike = await pb.collection(Collections.Likes).getFirstListItem(filter)
    liked.value = !!existingLike
  } catch (error) {
    if (error.status === 404) {
      liked.value = false
    } else {
      console.error('Error checking like status:', error)
    }
  }
}

onMounted(() => {
  checkIfLiked()
})

const handleLike = async () => {
  try {
    if (liked.value) {
      await removeLike(props.id)
      totalLikes.value -= 1
    } else {
      await addLike(props.id)
      totalLikes.value += 1
    }
    liked.value = !liked.value
  } catch (error) {
    console.error('Error handling like:', error)
  }
}

const handleDelete = async () => {
  try {
    await deleteDream(props.id)
    // Add any additional logic you need after deleting the dream
  } catch (error) {
    console.error('Error deleting dream:', error)
  }
}

const handleBlock = async () => {
  try {
    await blockUser(props.user.id)
    // Add any additional logic you need after blocking the user
  } catch (error) {
    console.error('Error blocking user:', error)
  }
}

const handleReport = async (reason: string) => {
  try {
    await reportPost(props.id, reason)
    // Add any additional logic you need after reporting the post
  } catch (error) {
    console.error('Error reporting post:', error)
  }
}

const formattedDate = computed(() => {
  const dateObj = new Date(props.date ?? '')
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(dateObj)
})

const userAvatar = computed(() => {
  return props.user && props.user.avatar
    ? `https://onii.remilombard.fr/api/files/_pb_users_auth_/${props.user.id}/${props.user.avatar}`
    : defaultAvatar
})

const username = computed(() => {
  return props.user && props.user.username ? props.user.username : 'Utilisateur inconnu'
})

const isOwner = computed(() => {
  return pb.authStore.model?.id === props.user?.id
})
</script>

<template>
  <div class="w-full flex items-center mb-2">
    <img :src="userAvatar" alt="avatar" class="w-10 h-10 rounded-full mr-3" />
    <span class="text-white">{{ username }}</span>
  </div>

  <div class="flex flex-col items-end space-y-[-20px] mb-5">
    <div
      class="flex flex-col justify-start items-start w-full gap-5 p-2.5 rounded-[15px] bg-violet-950"
    >
      <div class="flex justify-between items-center w-full">
        <h3 class="text-lg font-bold font-Quicksand text-left text-white">{{ title }}</h3>
        <ParamsReseau :dreamId="props.id" :isOwner="isOwner" @delete="handleDelete" @block="handleBlock" @report="handleReport">
          <IconPoints />
        </ParamsReseau>
      </div>
      <div class="w-full">
        <p class="text-base text-left text-white">{{ excerpt }}</p>
      </div>

      <div class="flex justify-between self-stretch">
        <RouterLink :to="{ name: 'dream-post', params: { id: props.id } }">
          <span class="text-lg font-bold font-Lato text-yellow-200">Voir plus</span>
        </RouterLink>
        <div class="flex items-center gap-2">
          <IconTag />
          <p class="text-sm font-light italic text-left font-Lato text-white">{{ categorie }}</p>
        </div>
      </div>

      <div class="w-full gap-2.5">
        <p class="text-sm italic font-light text-left text-gray-400">{{ formattedDate }}</p>
      </div>
    </div>

    <div class="flex space-x-4 items-end h-10 pr-2.5">
      <button @click="handleLike" :class="['flex items-center py-3 px-2.5 rounded-full', liked ? 'bg-fuchsia-700 text-white' : 'bg-fuchsia-700 text-white']">
        <IconLike :fillColor="liked ? '#FEF08A' : 'transparent'" :strokeColor="liked ? '#FEF08A' : 'white'" class="w-6 h-6 mr-1" />
        <span>{{ totalLikes }}</span>
      </button>
      <RouterLink :to="{ name: 'dream-post', params: { id: props.id } }">
        <button class="flex items-center text-white bg-fuchsia-700 py-3 px-2.5 rounded-full">
          <IconCom class="w-6 h-6 mr-1" />
          <span>{{ comments }}</span>
        </button>
      </RouterLink>
    </div>
  </div>
</template>
