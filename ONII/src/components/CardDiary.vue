<script setup lang="ts">

    import IconPoints from './icons/IconPoints.vue';

</script>

<template>
  <div class="flex flex-col items-end space-y-[-20px]">
    <div class="flex flex-col justify-start items-start w-full gap-5 px-2.5 py-2.5 rounded-[15px] bg-violet-950">
      <!-- Titre de l'article avec les points d'icônes -->
      <div class="flex justify-between items-center w-full">
        <p class="text-lg font-bold text-left text-white">
          Balade au centre de l’univers
        </p>
        <div>
          <IconPoints />
        </div>
      </div>

      <!-- Contenu de l'article -->
      <div class="w-full">
        <p class="text-base text-left text-white">
          Je me suis retrouvé flottant au milieu de l'espace infini. Des milliers d'étoiles scintillaient autour de moi, formant des constellations inconnues. Soudain, une lumière éblouissante a surgi, révélant un astre éclatant
          <span class="text-base font-light">... </span>
          <span class="text-base font-bold text-yellow-200">Voir plus</span>
        </p>
      </div>

      <!-- Tags -->
      <ul class="flex justify-between items-start w-full gap-2.5">
        <li class="p-2.5 rounded-[50px] border-[0.5px] border-white">
          <p class="text-sm italic text-left text-white">Fantastique</p>
        </li>
        <li class="p-2.5 rounded-[50px] border-[0.5px] border-white">
          <p class="text-sm italic text-left text-white">Exploration</p>
        </li>
        <li class="p-2.5 rounded-[50px] border-[0.5px] border-white">
          <p class="text-sm italic text-left text-white">Spiritualité</p>
        </li>
      </ul>

      <!-- Date -->
      <div class="w-full gap-2.5">
        <p class="text-sm italic font-light text-left text-white">04/03/2024</p>
      </div>
    </div>

    <!-- Bouton d'analyse -->
    <div class="flex flex-col items-end h-10 pr-2.5">
      <div class="flex justify-center items-center text-sm gap-2.5 px-3.5 py-2.5 rounded-[50px] bg-fuchsia-700">
        <RouterLink to="/" class="text-white">
          Analyser ce rêve avec l’IA
        </RouterLink>
      </div>
    </div>
  </div>
</template>