<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import IconLogo from './icons/IconLogo.vue';
import NavBar from './NavBar.vue';
import IconTiktok from './icons/IconTiktok.vue';
import IconInsta from './icons/IconInsta.vue';
import IconFacebook from './icons/IconFacebook.vue';
import IconPastille from './icons/IconPastille.vue';
import IconGroupuser from './icons/IconGroupuser.vue';
import IconTo from './icons/IconTo.vue';
import IconAccountSmall from './icons/IconAccountSmall.vue';
import IconNewsletter from './icons/IconNewsletter.vue';
import IconAbout from './icons/IconAbout.vue';
import IconContact from './icons/IconContact.vue';
import NewsletterToggleButton from './NewsletterToggleButton.vue'; // Importer le composant bouton de newsletter
import { pb } from '@/backend';
import defaultAvatar from '/default-avatar.png';
import { userAvatar } from '@/state';  // Importer l'état global

const activeMenu = ref(false);
const route = useRoute();

const fetchUserAvatar = () => {
  const user = pb.authStore.model;
  if (user && user.avatar) {
    userAvatar.value = `https://onii.remilombard.fr/api/files/${user.collectionId}/${user.id}/${user.avatar}`;
  }
};

const closeMenu = () => {
  activeMenu.value = false;
};

onMounted(() => {
  fetchUserAvatar();
});
</script>

<template>
  <header class="sticky top-0 z-50 w-full bg-slate-950">
    <div class="flex flex-col border-b border-white border-opacity-50">
      <div class="flex justify-between items-center relative p-5">
        <div class="">
          <RouterLink to="/profil">
            <img :src="userAvatar" alt="User Avatar" class="w-9 h-9 rounded-full" />
          </RouterLink>
        </div>
        <div class="flex items-center space-x-4">
          <RouterLink to="/journal" @click="closeMenu">
            <IconLogo />
          </RouterLink>
        </div>
        <div class="">
          <button
            class="relative z-10 flex h-[18px] w-9 px-1 flex-col justify-between *:block *:ease *:h-[2px] *:w-full *:transform *:rounded-full *:bg-white *:transition *:duration-300"
            @click="activeMenu = !activeMenu"
          >
            <span :class="{ 'translate-y-[8px] rotate-45': activeMenu }"></span>
            <span :class="{ '-translate-y-[8px] -rotate-45': activeMenu }"></span>
          </button>
          <nav
            class="invisible opacity-0 px-5 justify-between pt-10 pb-5 flex mt-[86px] flex-col fixed z-10 inset-0 bg-slate-950 border-t border-white border-opacity-50"
            :class="{ '!visible !opacity-100': activeMenu, hidden: !activeMenu }"
            v-scroll-lock="activeMenu"
          >
            <section class="flex flex-col items-center justify-center gap-8">
              <div class="">
                <IconPastille />
              </div>
              <div class="w-full">
                <div class="bg-violet-950 rounded-[15px] p-2.5 w-full">
                  <RouterLink
                    to="/profil"
                    class="flex justify-start items-center box-content self-stretch flex-grow-0 flex-shrink-0 h-6 relative gap-2 border-b border-white border-opacity-50 pb-3.5"
                    @click="closeMenu"
                  >
                    <IconGroupuser />
                    <p class="flex-grow w-64 font-bold text-left text-white">Profil public</p>
                    <IconTo />
                  </RouterLink>

                  <RouterLink
                    to="/account"
                    class="flex justify-start items-center box-content self-stretch flex-grow-0 flex-shrink-0 h-6 relative gap-2 border-b border-white border-opacity-50 py-3.5"
                    @click="closeMenu"
                  >
                    <IconAccountSmall />
                    <p class="flex-grow w-64 font-bold text-left text-white">Votre compte</p>
                    <IconTo />
                  </RouterLink>
                  <div
                    class="flex justify-start items-center box-content self-stretch flex-grow-0 flex-shrink-0 h-6 relative gap-2 pt-3.5"
                  >
                    <IconNewsletter />
                    <p class="flex-grow w-64 font-bold text-left text-white">
                      S'abonner à la Newsletter
                    </p>
                    <NewsletterToggleButton class="absolute" />
                  </div>
                </div>
                <div class="bg-violet-950 rounded-[15px] p-2.5 mt-8">
                  <RouterLink
                    to="/about"
                    class="flex justify-start items-center box-content self-stretch flex-grow-0 flex-shrink-0 h-6 relative gap-2 border-b border-white border-opacity-50 pb-3.5"
                    @click="closeMenu"
                  >
                    <IconAbout />
                    <p class="flex-grow w-64 font-bold text-left text-white">À propos</p>
                    <IconTo />
                  </RouterLink>
                  <RouterLink
                    to="/contact"
                    class="flex justify-start items-center box-content self-stretch flex-grow-0 flex-shrink-0 h-6 relative gap-2 pt-3.5"
                    @click="closeMenu"
                  >
                    <IconContact />
                    <p class="flex-grow w-64 font-bold text-left text-white">Nous contacter</p>
                    <IconTo />
                  </RouterLink>
                </div>
              </div>
            </section>
            <ul class="flex items-center justify-center gap-5 px-4">
              <li>
                <a href="/"> <IconInsta /> </a>
              </li>
              <li>
                <a href="/"> <IconTiktok /> </a>
              </li>
              <li>
                <a href="/"> <IconFacebook /> </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <NavBar
        v-if="['/journal', '/reseau', '/journal/stats', '/reseau/test'].includes(route.path)"
      />
    </div>
  </header>
</template>
