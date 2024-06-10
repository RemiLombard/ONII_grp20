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
    <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-purple-950 p-4 rounded-lg max-w-md mx-auto space-y-4">
        <h2 class="text-lg font-bold">Modifier {{ fieldLabel }}</h2>
        <input v-model="localValue" class="w-full p-2 border border-gray-300 rounded bg-purple-900 text-white" />
        <div class="flex justify-end space-x-2">
          <button @click="handleCancel" class="bg-gray-500 text-white rounded p-2">Annuler</button>
          <button @click="handleSave" class="bg-fuchsia-700 text-white rounded p-2">Sauvegarder</button>
        </div>
      </div>
    </div>
  </template>
  
  
  