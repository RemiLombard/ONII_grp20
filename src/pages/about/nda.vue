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
      <h1 class="text-white">Politique de confidentialité</h1>
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
      >Nous sommes ONII SAS  (”ONII”). Merci de prendre le temps de lire ce document.</span
    ><br /><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
      >Cette Politique de Confidentialité décrit comment ONII SA (”ONII”, “Nous”) collecte et
      utilise vos informations personnelles lorsque vous utilisez ou accédez à notre application
      mobile, site web, et autres services en ligne (collectivement, les “Services”).</span
    ><br /><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
      >À ONII, nous croyons que les rêves sont des données très intimes et personnelles, et qu’ils
      devraient être protégés avec beaucoup d’attention. Nous apprécions que vous nous fassiez
      confiance avec vos informations, et nous avons l’intention de toujours garder cette
      confiance.</span
    ><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
      >La confidentialité est un des principes essentiels dans le développement de ONII. Nous
      faisons en sorte de ne collecter et de n’utiliser vos données personnelles seulement qu’à des
      fins qui bénéficient l’utilisateur, et d’être complètement transparents dans la gestion de vos
      données. En aucun cas nous ne vendons, ne louons, ne dévoilons ou ne communiquons vos données
      personnelles à d’autres entreprises en échange d’argent ou d’autre considération.</span
    ><br /><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
      >1. Où cette Politique de Confidentialité s’applique</span
    ><br /><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
      >Cette Politique de Confidentialité s’applique à ONII et le site web www.onii.fr </span
    ><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
      >Lorsque vous accédez à Le site web pour la première fois, vous serez amené·e à lire et à
      accepter nos Conditions d’Utilisation et notre Politique de Confidentialité. L’utilisation de
      Le site web et l’utilisation de vos données sont régies par ces deux documents, et vous ne
      pouvez utiliser Le site web sans accepter ces documents expressément.</span
    ><br /><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
      >2. Données collectées</span
    ><br /><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
      >Il va sans dire qu’en tant qu’application de journal, c’est dans la fonction principale de
      ONII de collecter et stocker des données personnelles. Notre responsabilité est d’assurer la
      confidentialité et la sécurité de ces données. Les types de données que vous fournissez ou qui
      sont collectées sont décrits ci-dessous. Veuillez noter que les données sont les vôtres, et
      nous ne contrôlons pas le contenu que vous soumettez dans Le site web.</span
    ><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
      >Lorsque vous créez un compte ONII et utilisez les fonctions de synchronisation, nous pouvons
      collecter les données personnelles suivantes:</span
    ><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
      >Vos identifiants de connexion, comme l’adresse email, le nom d’utilisateur, ou le mot de
      passe chiffré</span
    ><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
      >Les données entrées par l’utilisateur (ex : textes, visuels ou autre contenu appelé
      “rêves”)</span
    ><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
      >Lorsque vous utilisez Le site web, nous pouvons aussi collecter des données d’usages, telles
      que des logs, sessions, type d’appareil, ou version du logiciel, afin d’identifier des
      problèmes et améliorer nos Services.</span
    ><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
      >Si vous participez à une étude ou un programme spécifique, nous pouvons collecter des
      informations additionnelles que vous acceptez de partager avec nous tel que votre nom, date de
      naissance, sexe, et pays de résidence.</span
    ><br /><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
      >3. Utilisation des données</span
    ><br /><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
      >La principale raison pour laquelle nous utilisons vos données est pour vous fournir et pour
      améliorer les services proposés par Le site web. Les différents cas d’utilisations de vos
      données sont listés ci-dessous:</span
    ><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
      >Pour créer et gérer votre compte, suite à l’ouverture d’un compte dans Le site web</span
    ><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
      >Pour vous fournir les produits, services ou informations que vous avez demandé, en fonction
      de notre relation contractuelle</span
    ><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
      >Pour remplir la fonction pour laquelle vous nous avez fourni les données</span
    ><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
      >Pour fournir du support technique, de la résolution de problèmes, ou autre assistance pour Le
      site web, afin de fournir les Services</span
    ><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
      >Pour améliorer Le site web, incluant les tests, la recherche, les statistiques internes, et
      le développement du produit</span
    ><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
      >Pour personnaliser Le site web en fonction de vos préférences</span
    ><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
      >Pour de la protection de fraude ou d’autres raisons de sécurité</span
    ><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
      >Pour vous tenir informé·e des mises à jour et changement de contenu ou de fonctionnalité dans
      Le site web ou autres informations importantes</span
    ><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
      >Pour vos envoyer des emails et autre communications, en fonction de vos préférences</span
    ><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
      >En supplément des points ci-dessus, les informations personnelles que vous nous fournissez
      dans le contexte d’une étude peuvent être utilisées dans le but de l’étude pour laquelle elles
      ont été collectées. Vos données peuvent être utilisées anonymement pour des statistiques ou
      d’autres fins de recherche, qui pourront être publiées dans des articles scientifiques.</span
    ><br /><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
      >4. Divulgation des données</span
    ><br /><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
      >En aucun cas nous ne vendons, ne louons, ne dévoilons ou ne communiquons vos données
      personnelles à d’autres entreprises en échange d’argent ou d’autre considération. Cependant,
      nous dépendons de tierces parties pour nous aider à opérer et améliorer nos services. Ces
      tierces parties nous assistent pour différentes tâches, dont le stockage et la maintenance des
      données, la communication, et la gestion des paiements. Les tierces parties que nous utilisons
      et leur fonction dans notre service sont décrites dans la prochaine section.</span
    ><br /><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
      >5. Rétention et suppression des données</span
    ><br /><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
      >Les données personnelles sont seulement stockées et utilisées pour la durée nécessaire à
      l’objet de leur collection, c’est à dire pour vous permettre d’utiliser nos Services.</span
    ><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
      >Le site web inclue une option pour supprimer votre compte, qui supprime de manière permanente
      et irrévocable toutes vos données personnelles. Les données concernant l’utilisation de Le
      site web sont conservées mais rendues anonymes.</span
    ><br /><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
      >6. Accès à vos données</span
    ><br /><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
      >Vous pouvez nous demander de voir une copie des données que nous avons à propos de vous.
      Selon la juridiction, cela peut-être appelé droit d’accès, droit de portabilité, ou une
      variation de ces termes. Pour effectuer cette demande, veuillez nous contacter en utilisant
      les informations au bas de cette page. Vous pouvez effectuer plusieurs fois cette demande mais
      en cas d’abus, nous nous réservons le droit de la décliner ou de demander une
      compensation.</span
    ><br /><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
      >7. Sécurité</span
    ><br /><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
      >La plupart des services de Le site web sont fournis par des services populaires avec de hauts
      standards de sécurité. Nous travaillons dur pour vous protéger de la divulgation non
      autorisée, l’altération ou la destruction de vos données personnelles. Notre Application
      utilise du cryptage pour protéger vos données, et l’accès aux données personnelles est
      seulement donné selon le besoin de savoir à des personnes avec des obligations de
      confidentialité. Nous surveillons régulièrement nos systèmes afin de détecter des
      vulnérabilités et des attaques potentielles et examinons régulièrement nos pratiques de
      collecte, de stockage et de traitement des informations pour mettre à jour nos mesures de
      sécurité. Nous pouvons suspendre votre utilisation de tout ou une partie des services sans
      préavis si nous soupçonnons ou détectons toute infraction à la sécurité. Si vous pensez que
      votre compte ou vos informations ne sont plus sécurisées, veuillez nous le notifier
      immédiatement. Veuillez noter que vous êtes responsables de décider ce que vous souhaitez
      partager/télécharger sur Le site web.</span
    ><br /><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
      >8. Droits des ressortissants européens (RGPD)</span
    ><br /><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
      >Si vous êtes ressortissant·e de l’Union Européenne (« UE »), du Royaume-Uni, du Lichtenstein,
      de Norvège ou d’Islande, vous avez des droits définis par le Règlement Général de Protection
      des Données (RGPD). En pratique, notre Politique de Confidentialité inclue déjà ces droits
      pour tous nos utilisateurs. Veuillez lire les sections ci-dessus pour comprendre vos droits de
      suppression et droits d’accès.</span
    ><br /><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
      >9. Modifications de cette Politique de Confidentialité</span
    ><br /><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
      >Nous améliorons continuellement nos services, donc nous pouvons mettre à jour cette Politique
      de Confidentialité de temps en temps, mais nous vous alerterons de ces changements sur le site
      web de ONII, en vous envoyant un email, ou par un autre moyen. Veuillez noter que si vous avez
      désactivez les notifications légales de notre part, ou si vous nous avez pas communiqué
      d’adresse email, la nouvelle Politique de Confidentialité régulera quand même votre
      utilisation de Le site web, et vous êtes tout de même responsable de la lire et de la
      comprendre. Si vous utilisez Le site web après les changements à cette Politique de
      Confidentialité, cela veut dire que vous acceptez les changements concernés. L’utilisation des
      données collectées est sujette à la Politique de Confidentialité en vigueur au moment ou les
      données ont été collectées.</span
    ><br /><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
      >10. Contact</span
    ><br /><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
      >Si vous avez des questions concernant ces Conditions d’Utilisation, n’hésitez-pas à nous
      contacter à contact@onii.fr.</span
    ><br /><span
      class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
      >ONII SAS est une entreprise incorporée Francaise dont l’adresse légale se situe à 4 Pl.
      Lucien Tharradin, 25200 Montbéliard.
    </span>
  </p>
</section>
</template>
