<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'
import { RouterLink } from 'vue-router'

const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'dark' | 'outlined' | 'common'
    size?: 'small' | 'medium' | 'large' | 'common'
    url?: string
    text?: string
    icon?: string | object | undefined
  }>(),
  {
    variant: 'common',
    size: 'common'
  }
)

const variantClass = {
  default: 'border border-white text-black justify-center bg-white hover:opacity-80',
  dark: 'border border-black bg-black justify-center text-white',
  outlined: 'border border-white text-white justify-center bg-transparent hover:opacity-80',
  common: 'border border-green-600 text-white justify-center bg-fuchsia-700 hover:opacity-80'
}

const sizeClass = {
  small: 'px-4 py-2.5 text-sm',
  medium: 'px-4 py-3 w-36 text-sm lg:text-base',
  large: 'px-8 py-4 text-base',
  common: 'px-8 py-2.5 text-sm lg:px-8 lg:py-2.5 lg:text-base'
}
</script>

<template>
  <RouterLink
    class="inline-flex items-center gap-2 font-bold rounded-[30px] transition duration-300 ease-in-out"
    :class="[variantClass[props.variant], sizeClass[props.size]]"
    :to="`${props.url}`"
  >
    <component
      v-if="props.icon"
      :is="props.icon"
      :class="props.variant === 'dark' ? 'stroke-white' : 'stroke-black'"
      class="size-5"
    />
    {{ props.text }}
  </RouterLink>
</template>
