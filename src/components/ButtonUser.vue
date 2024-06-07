<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const isLoading = ref(false)
const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'dark' | 'outlined' 
    size?: 'small' | 'medium' | 'large'
    url?: string
    text?: string
    icon?: string | object | undefined
  }>(),
  {
    variant: 'default',
    size: 'medium'
  }
)

const variantClass = {
  default: 'border border-fuchsia-700 text-white justify-center bg-fuchsia-700 hover:opacity-80',
  dark: 'border border-black bg-black justify-center text-white',
  outlined: 'border border-white text-white justify-center bg-transparent hover:opacity-80',
  common: 'border border-'
}

const sizeClass = {
  small: 'px-4 py-2.5 text-sm',
  medium: 'px-8 py-2.5 text-base',
  large: 'px-8 py-4 text-base'
}
</script>

<template>
  <button type="submit" :disabled="isLoading"
    class="inline-flex items-center gap-2 font-bold rounded-[30px] transition duration-300 ease-in-out"
    :class="[variantClass[props.variant], sizeClass[props.size]]"
  >
    <component
      v-if="props.icon"
      :is="props.icon"
      :class="props.variant === 'dark' ? 'stroke-white' : 'stroke-black'"
      class="size-5"
    />
    {{ props.text }}
  </button>
</template>
