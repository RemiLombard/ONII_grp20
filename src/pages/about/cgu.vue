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
      <h1 class="text-white">Conditions d'utilisation</h1>
    </div>
  </section>
  <section
    class="flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5 p-2.5 rounded-[15px] bg-nightblue mb-10"
  >
    <p class="self-stretch flex-grow-0 flex-shrink-0 text-left text-white">
      <span class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
        >Bienvenue ! </span
      ><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
        >Nous sommes ONII SAS (”ONII”). Merci de prendre le temps de lire ce document.</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white "
        >Ces Conditions d’Utilisation gouvernent votre utilisation et accès au site web www.onii.fr </span
      ><br /><span class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >Lorsque vous accédez au site web pour la première fois, vous serez amené·e à lire et à
        accepter nos Conditions d’Utilisation et notre Politique de Confidentialité. L’utilisation
        du site web et l’utilisation de vos données sont régies par ces deux documents, et vous ne
        pouvez utiliser le site web sans accepter ces documents expressément.</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
        >1. Confidentialité</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >Nous prenons très au sérieux votre confidentialité. Les règles qui régissent votre
        confidentialité et l’utilisation de vos données sont détaillées dans notre Politique de
        Confidentialité.</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
        >2. Utilisation des Services</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
        >Compte</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >Vous pouvez utiliser le site web sans créer de compte. Cependant, pour utiliser certaines
        fonctionnalités (telles que la synchronisation des données entre les appareils), il peut
        être demandé de créer un compte, sélectionner un mot de passe, et fournir quelques
        informations personnelles comme une adresse e-mail. En vous inscrivant, vous vous engagez à
        fournir des informations précises, véridiques, complètes et à jour à propos de vous. Vous ne
        devez en aucun cas entrer de coordonnées qui ne vous appartiennent pas, ou utiliser les
        données d’une tierce personne dans le but d’imiter cette personne. Vous ne pouvez pas
        transférer votre compte à quelqu’un d’autre sans notre accord écrit préalable.</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
        >Utilisation commerciale et légale</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >Vous ne pouvez utiliser le site web qu’à des fins personnelles et non-commerciales, et
        conformément à toute loi qui s’applique à vous. Vous ne pouvez pas utiliser le site web au
        nom de quelqu’un d’autre, ou pour les bénéfices d’une partie tierce. Si votre utilisation du
        site web est interdite par la loi, alors vous n’êtes pas autorisé·e à l’utiliser. Nous ne
        pouvons et ne serons pas tenus responsables pour toute utilisation illégale du site
        web</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
        >Sécurité du compte</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >Il est interdit de partager votre compte ou mot de passe avec qui que ce soit, et vous
        devez protéger la sécurité de votre compte, mot de passe et autre accréditation. Vous êtes
        responsable pour toute activité associée à votre compte ONII.</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
        >3. Responsabilité</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
        >Contenu du site web</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >Toute information ou contenu public ou privé posté ou transmis par le site web est la
        responsabilité de la personne à l’origine du dit contenu et vous accédez, sauvegardez,
        publiez, partagez, et utilisez le dit contenu à votre propre risque. Nous ne pouvons être
        tenus responsables pour toute erreur ou omission dans le contenu, ou pour tout dommage ou
        perte subis en rapport avec celui-ci. Nous ne pouvons contrôler et n’avons aucun devoir de
        prendre des mesures concernant la manière dont vous interprétez et utilisez le contenu ou
        les actions que vous effectuez après l’exposition au contenu, et vous nous libérez donc de
        toute responsabilité du fait d’être exposé ou non au dit contenu. Nous ne pouvons garantir
        l’identité des utilisateurs avec qui vous interagissez pendant l’utilisation du site web, et
        nous ne sommes pas responsables de qui peut avoir accès au site web.</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
        >Contenu envoyé</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >Vous êtes responsable du contenu que vous apportez, de quelconque manière, au site web, et
        vous garantissez avoir tous les droits nécessaires pour le contenu et la manière dont
        celui-ci est apporté. En particulier vous, en votre propre nom, choisissez ce que vous
        téléchargez, sauvegardez, supprimez, publiez et partagez sur le site web. Vous devez être
        conscient·e de tout contenu sensible que vous publiez sur le site web.</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
        >Liens vers des services tiers ou sites web externes</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >Le site web peut contenir des liens ou des connexions à des services tiers ou sites web
        externes qui ne sont pas possédés ou contrôlés par ONII. En accédant à des sites webs
        externes ou en utilisant des services tiers, vous acceptez les risques associés, et vous
        reconnaissez que ONII n’est en aucun cas responsable des risques associés. ONII n’a aucun
        contrôle sur, et n’assume aucune responsabilité pour, le contenu, la véracité, la politique
        de confidentialité, les pratiques ou les opinions exprimées dans un site web externe ou un
        service tiers avec lequel vous interagissez à travers le site web. En utilisant le site web,
        vous nous libérez et nous protégez de toute responsabilité liée à votre utilisation de sites
        web ou services tiers.</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
        >Litiges</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >Si un litige émerge entre des utilisateurs du site web, ou entre un utilisateur et une
        tierce partie. vous acceptez que ONII n’a aucune obligation d’être impliqué dans le litige.
        En cas de litige avec un ou plusieurs autres utilisateurs, vous libérez ONII et ses
        créateurs de toute réclamation, demande ou dommage de toute nature, connu ou inconnu, prévu
        ou imprévu, révélé ou non révélé, émanant de ou en rapport avec le dit litige et notre site
        web. </span
      ><br /><span class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >L’éditeur peut mentionner qu’en cas de litige, les parties tenteront de régler le conflit à
        l’amiable. À défaut de règlement amiable, l’éditeur doit respecter les règles d’attribution
        de compétence. Par exemple : le consommateur doit avoir le choix entre le tribunal de son
        domicile ou le tribunal du lieu de la société éditrice du site. En revanche, si le site est
        à destination des professionnels, les CGU peuvent déterminer quel est le tribunal
        compétent.</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
        >4. Disponibilités et Paiements</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >Vous reconnaissez et acceptez que la disponibilité de notre site web est dépendante des
        magasins tiers depuis lesquels vous consulter le site web. Les Magasins ont leurs propres
        conditions d’utilisation que vous devez accepter avant de consulter des sites webs depuis
        ceux-ci. Vous acceptez de vous conformer, et votre droit d’utiliser le site web est
        conditionné sur votre conformité avec les conditions d’utilisation de ces Magasins. En cas
        de conflit entre les conditions d’utilisations de ces Magasins et ces Conditions
        d’Utilisation, les conditions les plus restrictives s’appliquent.</span
      ><br /><span class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >Vous pouvez souscrire à un Abonnement (Achats Intégrés) pour accéder à certains biens ou
        certaines fonctionnalités dans le site web. Lorsque vous effectuez un Achat Intégré, vous le
        faites à travers le Magasin depuis lequel vous avez consulté le site web, et vous acceptez
        les conditions d’utilisation applicables. </span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
        >Abonnements</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >Lorsque vous souscrivez à un Abonnement, vous serez facturé en avance sur une période
        récurrente et périodique (“Période de facturation”). Les Périodes de facturation sont fixées
        sur une base mensuelle.</span
      ><br /><span class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >À la fin de chaque Période de facturation, votre Abonnement sera automatiquement renouvelé
        sous les mêmes conditions, sauf si vous l’annulez ou si ONII l’annule. Vous pouvez annuler
        le renouvellement de votre Abonnement dans les paramètres de votre appareil, au plus tard 24
        heures avant la date de renouvellement. Passé ce délai, le montant de l’Abonnement est
        dû.</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
        >Paiement</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >Une méthode de paiement valide, incluant la carte de crédit, est nécessaire pour le
        paiement de votre Abonnement. Tous les Achats Intégrés, dont les Abonnements, sont effectués
        à travers le Magasin depuis lequel vous avez consulté le site web. Les informations de
        paiement sont gérées par ce Magasin et ne sont ni transmises à ni stockées par ONII.</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
        >Changement de prix</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >ONII peut, à sa discrétion et à tout moment, modifier les prix des Abonnements proposés.
        Tout changement de prix d’Abonnement devient effectif à la fin de la Période de facturation
        en cours au moment du changement. ONII vous informera d’un tel changement suffisamment en
        avance. Si vous n’acceptez pas explicitement les nouveaux prix des Abonnements avant la date
        de renouvellement, votre Abonnement ne sera pas renouvelé et sera terminé.</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
        >Remboursement</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >Sauf si requis par la loi, les frais d’Abonnement payés ne sont pas remboursables.</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
        >5. Résiliation</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
        >Résiliation de l’utilisateur</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >Vous pouvez annuler un Abonnement à tout moment. L’annulation est effective à la fin de la
        Période de facturation en cours au moment de l’annulation. Vous pouvez annuler le
        renouvellement de votre Abonnement à travers la page de gestion du compte ou en nous
        contactant à contact@onii.fr.</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
        >Résiliation de ONII</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >Nous pouvons suspendre ou terminer votre utilisation du site web suite à une fraude ou une
        violation des obligations de ces Conditions d’Utilisation. Une telle annulation ou
        suspension peut prendre effet immédiatement et sans avis préalable.</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
        >6. Clauses contractuelles</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
        >Limite de responsabilité</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >En aucun cas ne peuvent être tenus responsables ONII, ses créateurs ou ses développeurs,
        pour tout dommage indirect, spécial, conséquent ou punitif, y compris mais sans limitation,
        la perte de profits, données, utilisation, bonne volonté ou autre perte intangible,
        résultant de :</span
      ><br /><span class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >votre accès à, ou utilisation de, ou incapacité à accéder ou utiliser le Service</span
      ><br /><span class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >tout comportement ou Contenu d’une tierce partie sur le Service</span
      ><br /><span class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >tout Contenu obtenu depuis le Service; et</span
      ><br /><span class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >l’accès, utilisation ou altération des transmissions ou du Contenu non autorisé(e), basé
        sur la garantie, le contrat, le tort (y compris la négligence) ou tout autre théorie légale,
        que nous ayons été informés de la possibilité d’un tel dommage ou non, et même si une
        solution apportée échoue dans sa fonction première.</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
        >Exonération</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >L’utilisation du site web est à votre propre risque. Le site web est proposé “TEL QUEL” et
        “TEL QUE DISPONIBLE”. Le site web est fourni sans aucune garantie, exprimée ou implicite, y
        compris mais sans limitation, des garanties implicites de valeur commerciale, la conformité
        à un besoin particulier, la non-infraction ou le cours d’exécution.</span
      ><br /><span class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >ONII et ses créateurs ne garantissent pas que a) le site web fonctionnera de manière
        continue, sécurisée ou disponible à un endroit ou à un moment particulier; b) les erreurs et
        problèmes techniques seront corrigés; c) le site web ne peut contenir de virus ou autre
        composants négatifs; ou d) le résultat de l’utilisation de le site web sera fidèle à vos
        attentes.</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
        >Modifications de ces Conditions d’utilisation</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >Nous améliorons continuellement nos services, donc nous pouvons mettre à jour ces
        Conditions d’Utilisation de temps en temps, mais nous vous alerterons de ces changements sur
        le site web de ONII, en vous envoyant un email, ou par un autre moyen. Veuillez noter que si
        vous avez désactivez les notifications légales de notre part, ou si vous nous avez pas
        communiqué d’adresse email, les nouvelles Conditions d’Utilisation réguleront quand même
        votre utilisation du site web, et vous êtes tout de même responsable de les lire et de les
        comprendre. Si vous utilisez le site web après les changements à ces Conditions
        d’Utilisation, cela veut dire que vous acceptez les changements concernés.</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
        >Loi applicable</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >Ces Conditions d’Utilisation sont gouvernées par, et doivent être interprétées en accord
        avec, la loi suisse, abstraction faite des clauses relatives aux conflits de lois.</span
      ><br /><span class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >L’incapacité d’appliquer un droit ou une disposition de ces Conditions d’Utilisation
        n’exonère pas du reste des dispositions. Si l’une des dispositions de ces Conditions
        d’Utilisation est déclarée invalide ou inexécutoire, l’invalidité ou l’inexécutabilité
        s’applique seulement à cette disposition ou condition. Ces Conditions d’Utilisation
        constituent l’entièreté de l’accord entre vous et ONII en rapport avec notre le site web, et
        supplantent et remplacent tout accord préalable entre les deux parties.</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-white font-Quicksand"
        >Contact</span
      ><br /><br /><span
        class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >Si vous avez des questions concernant ces Conditions d’Utilisation, n’hésitez-pas à nous
        contacter à contact@onii.fr.</span
      ><br /><span class="self-stretch flex-grow-0 flex-shrink-0 text-base text-left text-white"
        >ONII SAS est une entreprise incorporée Francaise dont l’adresse légale se situe à 4 Pl.
        Lucien Tharradin, 25200 Montbéliard.
      </span>
    </p>
  </section>
</template>
