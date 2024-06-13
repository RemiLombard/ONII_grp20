<script setup lang="ts">
import { useRouter } from 'vue-router';
import IconBack from '@/components/icons/IconBack.vue';
import ButtonLink from '@/components/ButtonLink.vue';

// Importer les images
const imgRemi = '/public/imgremi.png';
const imgAnto = '/public/imganto.png';
const imgTheo = '/public/imgtheo.png';

const router = useRouter();

const goBack = () => {
  router.go(-1);
};
</script>

<template>
  <section class="flex justify-between items-center flex-grow">
    <IconBack class="text-white" @click="goBack" />
    <div class="flex-grow text-right">
      <h1 class="text-white">À propos de nous</h1>
    </div>
  </section>
  
  <!-- Ajouter cette section pour les images et les noms -->
  <section class="flex justify-between mb-5">
    <div class="flex flex-col items-center">
      <img :src="imgRemi" alt="Rémi Lombard" class="w-24 h-24 rounded-full" />
      <p class="text-white mt-2 text-center w-20">Rémi Lombard</p>
    </div>
    <div class="flex flex-col items-center">
      <img :src="imgAnto" alt="Antoine Dejeux" class="w-24 h-24 rounded-full" />
      <p class="text-white mt-2 text-center w-20">Antoine Dejeux</p>
    </div>
    <div class="flex flex-col items-center">
      <img :src="imgTheo" alt="Théo Gasner" class="w-24 h-24 rounded-full" />
      <p class="text-white mt-2 text-center w-20">Théo Gasner</p>
    </div>
  </section>
  
  <section class="flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5 p-2.5 rounded-[15px] bg-[#190936]">
    <p class="self-stretch flex-grow-0 flex-shrink-0 text-left text-white">
      <span class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand">
        Bienvenue dans l’univers onirique d’ONII, où vos rêves deviennent réalité !
      </span><br /><br />
      <span class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white">
        Nous sommes une équipe dynamique de trois jeunes étudiants passionnés, plongés dans une aventure fascinante au cœur du Bachelor Universitaire de Technologie Métiers du Multimédia et de l’Internet (BUT MMI) à Montbéliard.
      </span><br /><br />
      <span class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white">
        Notre quête commune pour les technologies numériques, le design graphique et le développement web nous a conduits à tisser ce projet étudiant ambitieux, inspiré par le monde des rêves. En tant que novices en MMI, nous sommes animés par la volonté de naviguer à travers les dimensions infinies du multimédia et de l’internet, tout en matérialisant nos compétences acquises pour donner vie à vos visions les plus fantastiques.
      </span><br /><br />
      <span class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white">
        Ensemble, nous formons une constellation de talents complémentaires, unie par notre passion pour créer un multimédia qui transcende la réalité. Nous sommes déterminés à mener à bien ce projet étudiant avec professionnalisme, innovation et une touche de magie. Nous espérons que notre site sera le portail vers un voyage enrichissant et inspirant dans le paysage de vos rêves les plus fous !
      </span><br /><br />
      <span class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white">
        Pour toute question ou suggestion, ou simplement pour partager un fragment de rêve, n’hésitez pas à nous contacter. Nous sommes impatients d’échanger avec vous et de vous accompagner dans l’exploration du monde merveilleux du multimédia et de l’internet.
      </span><br /><br />
      <span class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white">
        Avec nos pensées les plus oniriques,
      </span><br /><br />
      <span class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white">
        L’équipe ONII
      </span>
    </p>
  </section>
  
  <div class="flex mt-5 mb-10 justify-center">
    <RouterLink to="/contact" class="text-white">
    <ButtonLink
        variant="common"
        size="common"
        text="Nous contacter"
      />
    </RouterLink>
  </div>
</template>
