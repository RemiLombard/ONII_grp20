<script setup lang="ts">
  import { ref, defineProps, defineEmits, watch } from 'vue';
  
  const props = defineProps({
    show: Boolean,
    fieldLabel: String,
    fieldValue: String
  });
  
  const emits = defineEmits(['update:show', 'save']);
  
  const localValue = ref(props.fieldValue);
  
  watch(() => props.fieldValue, (newValue) => {
    localValue.value = newValue;
  });
  
  const handleCancel = () => {
    emits('update:show', false);
  };
  
  const handleSave = () => {
    emits('save', localValue.value);
    emits('update:show', false);
  };
  </script>

<template>
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div class="bg-nightblue p-5 rounded-lg">
        <p class="font-Quicksand text-lg font-bold mb-4">Modifier {{ fieldLabel }}</p>
        <input v-model="localValue" class="bg-violet-950 text-white w-full p-2 rounded mb-4" />
        <div class="flex justify-between gap-2">
          <button @click="handleCancel" class="bg-blue-200 text-black rounded p-2">Annuler</button>
          <button @click="handleSave" class="bg-fuchsia-700 text-white rounded p-2">Enregistrer</button>
        </div>
      </div>
    </div>
  </template>
  
  
  