<template>
    <svg width="26" height="26" viewBox="0 0 26 26" :fill="fillColor" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M13.0001 8.04762C13.6191 4.95238 18.3771 4.758 20.4287 6.80953C22.4133 8.79419 22.2858 12.1754 20.4287 14.2381L13.0001 21.6667L5.57153 14.2381C4.58655 13.253 4.0332 11.9169 4.0332 10.5238C4.0332 9.13072 4.58655 7.79467 5.57153 6.80953C7.49057 4.89048 12.381 4.95238 13.0001 8.04762Z" 
        :stroke="strokeColor" 
        stroke-width="0.952381" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
    </svg>
  </template>
  
  <script setup>
  const props = defineProps({
    fillColor: {
      type: String,
      default: 'transparent'
    },
    strokeColor: {
      type: String,
      default: 'white'
    }
  })
  </script>
  