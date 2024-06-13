<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { pb, Collections, addLike, removeLike, addComment, deleteDream, reportPost, blockUser } from '@/backend'
import { ReveResponse, UsersResponse, CommentsResponse } from '@/pocketbase-types'
import defaultAvatar from '/default-avatar.png'
import IconBack from '@/components/icons/IconBack.vue'
import IconLike from '@/components/icons/IconLike.vue'
import IconCom from '@/components/icons/IconCom.vue'
import IconPoints from '@/components/icons/IconPoints.vue'
import CardCom from '@/components/CardCom.vue'
import ParamsDetail from '@/components/ParamsDetail.vue'
import { RouterLink } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}

const route = useRoute()
const dream = ref<ReveResponse | null>(null)
const userProfile = ref<UsersResponse | null>(null)
const liked = ref(false)
const totalLikes = ref(0)
const comments = ref<CommentsResponse[]>([])
const newComment = ref('')

const fetchDreamDetails = async () => {
  try {
    const dreamId = route.params.id as string
    const dreamData = await pb
      .collection(Collections.Reve)
      .getOne<ReveResponse>(dreamId, { expand: 'userId' })
    dream.value = dreamData
    userProfile.value = dreamData.expand?.userId as UsersResponse
    totalLikes.value = dreamData.likes || 0
    await fetchComments(dreamId)
    checkIfLiked()
  } catch (error) {
    console.error('Error fetching dream details:', error)
  }
}

const fetchComments = async (dreamId: string) => {
  try {
    const commentsData = await pb.collection(Collections.Comments).getFullList<CommentsResponse>({
      filter: `dreamId = '${dreamId}'`,
      expand: 'userId'
    })
    comments.value = commentsData
  } catch (error) {
    console.error('Error fetching comments:', error)
  }
}

const checkIfLiked = async () => {
  try {
    const userId = pb.authStore.model?.id
    const filter = `dreamId = '${route.params.id}' && userId = '${userId}'`
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

const handleLike = async () => {
  try {
    if (liked.value) {
      await removeLike(route.params.id as string)
      totalLikes.value -= 1
    } else {
      await addLike(route.params.id as string)
      totalLikes.value += 1
    }
    liked.value = !liked.value
  } catch (error) {
    console.error('Error handling like:', error)
  }
}

const submitComment = async () => {
  if (newComment.value.trim() === '') return

  try {
    const { comment, newCommentCount } = await addComment(
      route.params.id as string,
      newComment.value.trim()
    )
    newComment.value = ''
    comments.value.push(comment) // Ajouter directement le nouveau commentaire
    dream.value.comments = newCommentCount // Mettre à jour le compteur de commentaires
  } catch (error) {
    console.error('Error submitting comment:', error)
  }
}

const removeComment = (commentId: string) => {
  comments.value = comments.value.filter(comment => comment.id !== commentId)
}

const handleDreamDeleted = async () => {
  try {
    if (dream.value) {
      await deleteDream(dream.value.id)
      router.push({ name: 'reseau' }) // Redirige vers la page index de la partie réseau
    }
  } catch (error) {
    console.error('Error deleting dream:', error)
  }
}

const handleDreamEdited = () => {
  // Logique pour l'édition du rêve
}

const handleDreamReported = (reason: string) => {
  if (dream.value) {
    reportPost(dream.value.id, reason)
  }
}

const handleUserBlocked = () => {
  if (userProfile.value) {
    blockUser(userProfile.value.id)
  }
}

const formattedDate = computed(() => {
  if (dream.value) {
    const dateObj = new Date(dream.value.date)
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(dateObj)
  }
  return ''
})

const userAvatar = computed(() => {
  return userProfile.value && userProfile.value.avatar
    ? `https://onii.remilombard.fr/api/files/${userProfile.value.collectionId}/${userProfile.value.id}/${userProfile.value.avatar}`
    : defaultAvatar
})

const username = computed(() => {
  return userProfile.value && userProfile.value.username
    ? userProfile.value.username
    : 'Utilisateur inconnu'
})

const isOwner = computed(() => {
  return pb.authStore.model?.id === userProfile.value?.id
})

const userProfileRoute = computed(() => {
  if (userProfile.value) {
    if (isOwner.value) {
      return { name: 'profil-user' } // Route vers le profil de l'utilisateur connecté
    } else {
      return { name: 'user-profile', params: { userId: userProfile.value.id } } // Route vers le profil de l'autre utilisateur
    }
  }
  return null
})

onMounted(() => {
  fetchDreamDetails()
})
</script>

<template>
  <section class="flex justify-between items-center flex-grow">
    <IconBack class="text-white" @click="goBack" />
    <div class="flex-grow text-right">
      <h1 class="text-white">Post</h1>
    </div>
  </section>
  <div class="flex flex-col items-end space-y-[-20px] mb-8 w-full">
    <div class="bg-violet-950 text-white p-2.5 rounded-[15px] w-full">
      <div class="flex justify-between items-center mb-5">
        <div class="flex items-center">
          <RouterLink v-if="userProfileRoute" :to="userProfileRoute">
            <img :src="userAvatar" alt="Profile" class="w-10 h-10 rounded-full mr-3 cursor-pointer" />
          </RouterLink>
          <div>
            <RouterLink v-if="userProfileRoute" :to="userProfileRoute">
              <p class="text-lg font-bold cursor-pointer">{{ username }}</p>
            </RouterLink>
            <p class="text-sm text-gray-400">{{ formattedDate }}</p>
          </div>
        </div>
        <ParamsDetail
          :dreamId="dream?.id" 
          :isOwner="isOwner"
          @delete="handleDreamDeleted"
          @edit="handleDreamEdited"
          @report="handleDreamReported"
          @block="handleUserBlocked"
        >
          <IconPoints />
        </ParamsDetail>
      </div>
      <h3 class="font-bold">{{ dream?.title }}</h3>
      <p class="text-base mt-4">{{ dream?.fullText }}</p>
      <div class="flex gap-2 mt-5 text-sm italic font-light text-gray-400">
        <p>{{ totalLikes }} Like(s)</p>
        <p>{{ dream?.comments }} Réponse(s)</p>
      </div>
    </div>

    <div class="flex space-x-4 items-end h-10 pr-2.5">
      <button
        @click="handleLike"
        :class="[
          'flex items-center py-3 px-2.5 rounded-full',
          liked ? 'bg-fuchsia-700 text-white' : 'bg-fuchsia-700 text-white'
        ]"
      >
        <IconLike
          :fillColor="liked ? '#FEF08A' : 'transparent'"
          :strokeColor="liked ? '#FEF08A' : 'white'"
          class="w-6 h-6 mr-1"
        />
        <span>{{ totalLikes }}</span>
      </button>
      <router-link :to="{ name: 'dream-post', params: { id: route.params.id } }">
        <button class="flex items-center text-white bg-fuchsia-700 py-3 px-2.5 rounded-full">
          <IconCom class="w-6 h-6 mr-1" />
          <span>{{ dream?.comments }}</span>
        </button>
      </router-link>
    </div>
  </div>

  <div class="mt-6 mb-24 w-full">
    <div class="flex-1 overflow-auto">
      <div v-for="comment in comments" :key="comment.id" class="mb-5">
        <CardCom
          :commentId="comment.id"
          :userId="comment.userId"
          :username="comment.expand.userId.username"
          :avatar="comment.expand.userId.avatar"
          :content="comment.content"
          @deleteComment="removeComment"
        />
      </div>
    </div>
    <form @submit.prevent="submitComment" class="fixed bottom-0 left-0 w-full bg-slate-950 flex p-5 items-center rounded-tl-[15px] rounded-tr-[15px] border-t border-t-gray-400">
      <input
        v-model="newComment"
        type="text"
        placeholder="Ajouter un commentaire"
        class="flex-1 p-2 rounded bg-nightblue text-white mr-2 focus:outline-none focus:ring-1 focus:ring-yellow-200"
      />
      <button type="submit" class="p-2 bg-fuchsia-700 text-white rounded">Envoyer</button>
    </form>
  </div>
</template>
