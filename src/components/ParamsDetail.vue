<!-- ParamsDetail.vue -->
<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import IconBin from './icons/IconBin.vue'
import IconModif from './icons/IconModif.vue'
import IconBlock from './icons/IconBlock.vue'
import IconFlag from './icons/IconFlag.vue'
import ReportModal from './ReportModal.vue'

const props = defineProps({
  dreamId: String,
  isOwner: Boolean
})

const emit = defineEmits(['delete', 'edit', 'block', 'report'])
const isVisible = ref(false)
const showReportModal = ref(false)

const router = useRouter()

const toggleVisibility = () => {
  isVisible.value = !isVisible.value
}

const editDream = () => {
  emit('edit')
  toggleVisibility()
}

const deleteDream = () => {
  emit('delete')
  toggleVisibility()
}

const blockUser = () => {
  emit('block')
  toggleVisibility()
}

const reportPost = (reason: string) => {
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
    <div v-if="isVisible" class="absolute right-0 w-48 bg-nightblue rounded-[15px] text-white">
      <template v-if="isOwner">
        <button @click="editDream" class="flex gap-2 items-center p-2.5">
          <IconModif />
          <p>Editer le rêve</p>
        </button>
        <div class="border-t border-gray-400 mx-2.5"></div>
        <button @click="deleteDream" class="flex gap-2 items-center p-2.5">
          <IconBin />
          <p class="text-red-400">Supprimer le rêve</p>
        </button>
      </template>
      <template v-else>
        <button @click="blockUser" class="flex gap-2 items-center p-2.5">
          <IconBlock />
          <p>Bloquer</p>
        </button>
        <div class="border-t border-gray-400 mx-2.5"></div>
        <button @click="openReportModal" class="flex gap-2 items-center p-2.5">
          <IconFlag />
          <p class="text-red-400">Signaler le post</p>
        </button>
      </template>
    </div>
    <ReportModal :isVisible="showReportModal" :dreamId="props.dreamId" @close="closeReportModal" @submit="reportPost" />
  </div>
</template>
