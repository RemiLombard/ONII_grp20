<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import IconBin from './icons/IconBin.vue'
import IconModif from './icons/IconModif.vue'

const emit = defineEmits(['edit', 'delete'])
const isVisible = ref(false)

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
</script>

<template>
  <div class="relative">
    <button @click="toggleVisibility">
      <slot></slot>
    </button>
    <div
      v-if="isVisible"
      class="absolute right-0 w-48 bg-nightblue rounded-[15px] text-white"
    >
      <button @click="editDream" class="flex gap-2 items-center p-2.5">
        <IconModif />
        <p>Editer le rêve</p>
      </button>
      <div class="border-t border-gray-400 mx-2.5"></div>
      <button @click="deleteDream" class="flex gap-2 items-center p-2.5">
        <IconBin />
        <p class="text-red-400">Supprimer le rêve</p>
      </button>
    </div>
  </div>
</template>
