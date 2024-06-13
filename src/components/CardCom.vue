<!-- CardCom.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { pb, deleteComment, blockUser, reportComment } from '@/backend'
import IconPoints from './icons/IconPoints.vue'
import ParamsComment from './ParamsComment.vue'
import defaultAvatar from '/default-avatar.png'
import { RouterLink } from 'vue-router'

const props = defineProps({
  commentId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: false,
    default: ''
  },
  content: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['deleteComment'])
const showModal = ref(false)

const userAvatar = computed(() => {
  return props.avatar
    ? `http://127.0.0.1:8090/api/files/_pb_users_auth_/${props.userId}/${props.avatar}`
    : defaultAvatar
})

const isOwner = computed(() => {
  return pb.authStore.model?.id === props.userId
})

const userProfileRoute = computed(() => {
  if (isOwner.value) {
    return { name: 'profil-user' } // Route vers le profil de l'utilisateur connecté
  } else {
    return { name: 'user-profile', params: { userId: props.userId } } // Route vers le profil de l'autre utilisateur
  }
})

const handleDelete = async () => {
  try {
    await deleteComment(props.commentId)
    emit('deleteComment', props.commentId)
  } catch (error) {
    console.error('Erreur lors de la suppression du commentaire:', error)
    alert('Erreur lors de la suppression du commentaire')
  }
}

const handleBlock = async () => {
  try {
    await blockUser(props.userId)
    // Ajouter toute logique supplémentaire après avoir bloqué l'utilisateur
  } catch (error) {
    console.error('Erreur lors du blocage:', error)
  }
}

const handleReport = async (reason: string) => {
  try {
    await reportComment(props.commentId, reason)
    // Ajouter toute logique supplémentaire après avoir signalé le commentaire
  } catch (error) {
    console.error('Erreur lors du signalement du commentaire:', error)
  }
}
</script>

<template>
  <div class="text-white rounded-[15px] flex items-start">
    <RouterLink :to="userProfileRoute">
      <img :src="userAvatar" alt="avatar" class="w-10 h-10 rounded-full mr-3 cursor-pointer" />
    </RouterLink>
    <div class="flex-1">
      <div class="flex justify-between items-center mb-2">
        <RouterLink :to="userProfileRoute">
          <span class="font-bold cursor-pointer">{{ username }}</span>
        </RouterLink>
        <ParamsComment
          :commentId="props.commentId"
          :isOwner="isOwner"
          @delete="handleDelete"
          @block="handleBlock"
          @report="handleReport"
        >
          <IconPoints />
        </ParamsComment>
      </div>
      <p class="bg-nightblue px-2.5 py-3 rounded-[15px]">{{ content }}</p>
    </div>
  </div>
</template>
