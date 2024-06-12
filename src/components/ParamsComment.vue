<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import IconBin from './icons/IconBin.vue'
import IconBlock from './icons/IconBlock.vue'
import IconFlag from './icons/IconFlag.vue'
import ReportModal from './ReportModal.vue'

const props = defineProps({
  commentId: String,
  isOwner: Boolean
})

const emit = defineEmits(['delete', 'block', 'report'])
const isVisible = ref(false)
const showReportModal = ref(false)

const toggleVisibility = () => {
  isVisible.value = !isVisible.value
}

const deleteComment = () => {
  emit('delete')
  toggleVisibility()
}

const blockUser = () => {
  emit('block')
  toggleVisibility()
}

const reportComment = (reason: string) => {
  emit('report', reason)
  toggleVisibility()
  showReportModal.value = false
}

const openReportModal = () => {
  showReportModal.value = true
}

const closeReportModal = () => {
  showReportModal.value = false
}
</script>

<template>
  <div class="relative">
    <button @click="toggleVisibility">
      <slot></slot>
    </button>
    <div v-if="isVisible" class="absolute right-0 w-48 bg-violet-950 rounded-[15px] text-white">
      <template v-if="isOwner">
        <button @click="deleteComment" class="flex gap-2 items-center p-2.5">
          <IconBin />
          <p class="text-red-400">Supprimer</p>
        </button>
      </template>
      <template v-else>
        <button @click="blockUser" class="flex gap-2 items-center p-2.5">
          <IconBlock />
          <p>Bloquer</p>
        </button>
        <div class="border-t border-gray-400 mx-2.5"></div>
        <button @click="openReportModal" class="flex gap-2 items-center text-start p-2.5">
          <IconFlag />
          <p class="text-red-400">Signaler</p>
        </button>
      </template>
    </div>
    <ReportModal :isVisible="showReportModal" :commentId="props.commentId" @close="closeReportModal" @submit="reportComment" />
  </div>
</template>
