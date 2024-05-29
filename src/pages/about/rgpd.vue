<script setup lang="ts">
import { useRouter } from 'vue-router'
import IconBack from '@/components/icons/IconBack.vue'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}
</script>

<template>
  <section class="flex justify-between items-center flex-grow">
    <IconBack class="text-white" @click="goBack" />
    <div class="flex-grow text-right">
      <h1 class="text-white">Politique des cookies</h1>
    </div>
  </section>
  <section
    class="flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5 p-2.5 rounded-[15px] bg-nightblue mb-10"
  >
    <p class="self-stretch flex-grow-0 flex-shrink-0 text-left text-white">
      <span
        class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
        >Bienvenue ! </span
      ><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
        >Nous sommes ONII SAS (”ONII”). Merci de prendre le temps de lire ce document.</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >Chez ONII, nous attachons une grande importance à la confidentialité et à la transparence
        concernant l'utilisation des cookies sur notre site web. Cette politique des cookies
        explique ce que sont les cookies, comment nous les utilisons, vos choix concernant leur
        utilisation, et d'autres informations importantes concernant votre vie privée en
        ligne.</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
        >1. Qu'est-ce qu'un cookie ?</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >Un cookie est un petit fichier texte placé sur votre ordinateur ou appareil mobile lorsque
        vous visitez un site web. Les cookies sont largement utilisés pour permettre au site web de
        fonctionner efficacement et pour fournir des informations aux propriétaires du site.</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
        >2. Comment utilisons-nous les cookies ?</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >Nous utilisons des cookies pour diverses raisons, notamment :</span
      ><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >Pour assurer le bon fonctionnement de notre site web.</span
      ><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >Pour améliorer votre expérience utilisateur en mémorisant vos préférences.</span
      ><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >Pour analyser l'utilisation de notre site web et en tirer des informations pour améliorer
        nos services.</span
      ><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >Pour afficher des publicités ciblées adaptées à vos intérêts.</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
        >3. Types</span
      ><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
      >
      </span
      ><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white"
        >de cookies que nous utilisons </span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >Cookies essentiels : Ces cookies sont nécessaires au fonctionnement de notre site web et
        vous permettent d'utiliser ses fonctionnalités de base.</span
      ><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >Cookies de performance : Ces cookies nous aident à comprendre comment vous utilisez notre
        site web, afin que nous puissions l'améliorer et fournir une meilleure expérience
        utilisateur.</span
      ><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >Cookies de fonctionnalité : Ces cookies permettent au site web de se souvenir de vos choix
        et de personnaliser votre expérience, comme votre langue préférée ou la région dans laquelle
        vous vous trouvez.</span
      ><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >Cookies de ciblage ou publicitaires : Ces cookies sont utilisés pour diffuser des
        publicités qui sont pertinentes pour vous et pour vos centres d'intérêt. Ils sont également
        utilisés pour limiter le nombre de fois où vous voyez une publicité et pour mesurer
        l'efficacité des campagnes publicitaires.</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
        >4. Vos choix concernant les cookies </span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >Vous pouvez contrôler et gérer les cookies de diverses manières. La plupart des navigateurs
        web vous permettent de refuser ou d'accepter les cookies, ainsi que de supprimer les cookies
        déjà enregistrés sur votre appareil. Cependant, veuillez noter que le fait de désactiver les
        cookies peut affecter votre expérience utilisateur sur notre site web.</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
        >5. Modification de notre politique des cookies </span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >Nous pouvons mettre à jour notre politique des cookies de temps à autre pour refléter les
        changements dans nos pratiques en matière de cookies. Nous vous encourageons à consulter
        régulièrement cette page pour rester informé des mises à jour.</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
        >6. Contact</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >Si vous avez des questions concernant ces Conditions d’Utilisation, n’hésitez-pas à nous
        contacter à contact@onii.fr.</span
      ><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >ONII SAS est une entreprise incorporée Francaise dont l’adresse légale se situe à 4 Pl.
        Lucien Tharradin, 25200 Montbéliard. </span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
        >7. Conclusion</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >En utilisant notre site web, vous consentez à notre utilisation des cookies conformément à
        cette politique des cookies. Si vous n'êtes pas d'accord avec l'utilisation des cookies
        décrite dans cette politique, veuillez cesser d'utiliser notre site web.</span
      >
    </p>
  </section>
</template>
