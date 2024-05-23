<script setup lang="ts">

    import IconPoints from './icons/IconPoints.vue';

</script>

<template>

<div class="flex flex-col justify-start items-end self-stretch flex-grow-0 flex-shrink-0 space-y-[-20px]">
  <div class="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-5 px-2.5 py-3.5 rounded-[15px] bg-[#2e1065]">
    <div class="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative">
      <p class="flex-grow-0 flex-shrink-0 w-[283px] h-4 text-lg font-bold text-left text-white">
        Balade au centre de l’univers
      </p>
      <div>
        <IconPoints />
      </div>
    </div>
    <div
      class="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5"
    >
      <p class="flex-grow w-[315px] text-base text-left">
        <span class="flex-grow w-[315px] text-base text-left text-white"
          >Je me suis retrouvé flottant au milieu de l'espace infini. Des milliers d'étoiles
          scintillaient autour de moi, formant des constellations inconnues. Soudain, une lumière
          éblouissante a surgi, révélant un astre éclatant</span
        ><span class="flex-grow w-[315px] text-sm font-light text-left text-white">... </span
        ><span class="flex-grow w-[315px] text-sm font-bold text-left text-yellow-200"
          >Voir plus</span
        >
      </p>
    </div>
    <ul class="flex justify-between items-start self-stretch flex-grow-0 flex-shrink-0">
    <li
        class="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2.5 p-2.5 rounded-[50px] border-[0.5px] border-white"
    >
        <p class="flex-grow-0 flex-shrink-0 text-sm italic text-left text-white">Fantastique</p>
    </li>
    <li
        class="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2.5 p-2.5 rounded-[50px] border-[0.5px] border-white"
    >
        <p class="flex-grow-0 flex-shrink-0 text-sm italic text-left text-white">Exploration</p>
    </li>
    <li
        class="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2.5 p-2.5 rounded-[50px] border-[0.5px] border-white"
    >
        <p class="flex-grow-0 flex-shrink-0 text-sm italic text-left text-white">Spiritualité</p>
    </li>
    </ul>
    <div
      class="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5"
    >
      <p class="flex-grow text-sm italic font-light text-left text-white">04/03/2024</p>
    </div>
  </div>
  <div
    class="flex flex-col justify-between items-end flex-grow-0 flex-shrink-0 h-10 relative pr-2.5"
  >
    <div class="flex justify-center items-center relative text-sm gap-2.5 px-3.5 py-2.5 rounded-[50px] bg-fuchsia-700">
      
      <RouterLink to="/" class="">
        Analyser ce rêve avec l’IA
      </RouterLink>
    </div>
  </div>
</div>

</template>