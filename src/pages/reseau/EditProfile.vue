<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { pb } from '@/backend';
import ButtonUser from '@/components/ButtonUser.vue';
import IconBack from '@/components/icons/IconBack.vue';
import { useRouter } from 'vue-router';
import { userAvatar } from '@/state';  // Importer l'état global

const router = useRouter();
const username = ref('');
const avatar = ref<File | null>(null);
const avatarPreview = ref<string | null>(null); // Ajouter une variable pour l'aperçu de l'avatar
const errorMessage = ref('');

const fetchUserProfile = async () => {
  try {
    const userId = pb.authStore.model?.id;
    if (!userId) throw new Error('User not logged in');
    const user = await pb.collection('users').getOne(userId);
    username.value = user.username;
    // Charger l'avatar existant
    avatarPreview.value = user.avatar ? `http://127.0.0.1:8090/api/files/users/${userId}/${user.avatar}` : null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    errorMessage.value = 'Erreur lors de la récupération du profil utilisateur';
  }
}

const updateProfile = async () => {
  try {
    const userId = pb.authStore.model?.id;
    if (!userId) throw new Error('User not logged in');

    const formData = new FormData();
    formData.append('username', username.value);
    if (avatar.value) {
      formData.append('avatar', avatar.value);
    }

    await pb.collection('users').update(userId, formData);
    userAvatar.value = avatarPreview.value;  // Mettre à jour l'état global
    router.push('/profil'); // Rediriger vers la page ProfilUser après la mise à jour
  } catch (error) {
    console.error('Error updating profile:', error);
    errorMessage.value = 'Erreur lors de la mise à jour du profil';
  }
}

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    avatar.value = target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      avatarPreview.value = e.target?.result as string;
    }
    reader.readAsDataURL(avatar.value);
  }
}

onMounted(() => {
  fetchUserProfile();
});

const goBack = () => {
  router.back();
}
</script>

<template>
  <form @submit.prevent="updateProfile" class="mt-24">
    <section
      class="fixed top-[86px] left-0 right-0 bg-slate-950 flex justify-between items-center p-5 z-10"
    >
      <IconBack class="text-white" @click="goBack" />
      <ButtonUser
        variant="default"
        text="Enregistrer"
        size="medium"
        type="submit"
      />
    </section>
    <div class="">
      <div>
        <label class="block text-gray-400 mb-2">Nom d'utilisateur</label>
        <input
          type="text"
          v-model="username"
          class="w-full p-3 bg-nightblue rounded text-white focus:outline-none focus:ring-1 focus:ring-yellow-200"
        />
      </div>
      <div>
        <label class="block text-gray-400 mb-2">Avatar</label>
        <input
          type="file"
          @change="onFileChange"
          class="w-full p-3 bg-nightblue rounded text-white focus:outline-none focus:ring-1 focus:ring-yellow-200"
        />
        <div v-if="avatarPreview" class="mt-4 text-center">
          <img
            :src="avatarPreview"
            alt="Avatar Preview"
            class="w-24 h-24 object-cover rounded-full mx-auto"
          />
        </div>
      </div>
      <div v-if="errorMessage" class="text-red-400 text-center">
        {{ errorMessage }}
      </div>
    </div>
  </form>
</template>
