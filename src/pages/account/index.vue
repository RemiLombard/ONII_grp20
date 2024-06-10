<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { logOut, pb } from '@/backend';
import { useRouter } from 'vue-router';
import IconBack from '@/components/icons/IconBack.vue';
import IconDisconnect from '@/components/icons/IconDisconnect.vue';
import IconBin from '@/components/icons/IconBin.vue';
import IconModif from '@/components/icons/IconModif.vue';
import IconArobase from '@/components/icons/IconArobase.vue';
import IconNewsletter from '@/components/icons/IconNewsletter.vue';
import IconModiname from '@/components/icons/IconModifname.vue';
import IconLock from '@/components/icons/IconLock.vue';
import EditModal from '@/components/EditModal.vue';

const router = useRouter();
const user = ref({
  username: '',
  firstName: '',
  name: '', // Changer ici pour correspondre à PocketBase
  email: ''
});
const fieldToEdit = ref('');
const showModal = ref(false);
const fieldLabel = ref('');
const fieldValue = ref('');
const loading = ref(false);
const errorMessage = ref('');

const fetchUserDetails = async () => {
  try {
    const userId = pb.authStore.model.id;
    const response = await pb.collection('users').getOne(userId);
    user.value = response;
  } catch (error) {
    errorMessage.value = 'Erreur lors de la récupération des détails de l\'utilisateur : ' + error.message;
  }
};

const updateUserDetails = async () => {
  loading.value = true;
  errorMessage.value = '';
  try {
    const userId = pb.authStore.model.id;
    await pb.collection('users').update(userId, user.value);
    loading.value = false;
    // Suppression de l'alerte de confirmation
  } catch (error) {
    errorMessage.value = 'Erreur lors de la mise à jour des détails de l\'utilisateur : ' + error.message;
    loading.value = false;
  }
};

const handleLogOut = () => {
  logOut();
  router.push('/'); // Rediriger l'utilisateur vers la page de connexion
};

const openModal = (field) => {
  fieldToEdit.value = field;
  fieldLabel.value = getFieldLabel(field);
  fieldValue.value = user.value[field];
  showModal.value = true;
};

const getFieldLabel = (field) => {
  switch (field) {
    case 'username': return "Nom d'utilisateur";
    case 'firstName': return 'Prénom';
    case 'name': return 'Nom'; // Changer ici pour correspondre à PocketBase
    case 'email': return 'Email';
    default: return '';
  }
};

const saveField = (value) => {
  user.value[fieldToEdit.value] = value;
  updateUserDetails();
};

onMounted(() => {
  fetchUserDetails();
});

const goBack = () => {
  router.go(-1);
}
</script>

<template>
  <section class="flex justify-between items-center flex-grow">
    <IconBack class="text-white" @click="goBack" />
    <h1 class="text-white">Votre compte</h1>
  </section>
  <div class="p-5">
    <div class="bg-violet-950 rounded-[15px] p-5">
      <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>
      <div class="space-y-4">
        <div class="flex items-center gap-2 rounded p-3 relative">
          <IconArobase class="text-white" />
          <p class="flex-1 text-white">{{ user.username }}</p>
          <IconModif class="text-white cursor-pointer absolute right-4" @click="openModal('username')" />
        </div>
        <div class="flex items-center gap-2 rounded p-3 relative">
          <IconModiname class="text-white" />
          <p class="flex-1 text-white">{{ user.firstName }}</p>
          <IconModif class="text-white cursor-pointer absolute right-4" @click="openModal('firstName')" />
        </div>
        <div class="flex items-center gap-2 rounded p-3 relative">
          <IconModiname class="text-white" />
          <p class="flex-1 text-white">{{ user.name }}</p> 
          <IconModif class="text-white cursor-pointer absolute right-4" @click="openModal('name')" />
        </div>
        <div class="flex items-center gap-2 rounded p-3 relative">
          <IconNewsletter class="text-white" />
          <p class="flex-1 text-white">{{ user.email }}</p>
          <IconModif class="text-white cursor-pointer absolute right-4" @click="openModal('email')" />
        </div>
        <button class="bg-fuchsia-700 text-white rounded p-3 w-full cursor-not-allowed">
          <IconLock class="inline mr-2" /> Changer votre mot de passe
        </button>
      </div>
    </div>
    <div class="bg-violet-950 rounded-[15px] p-5 mt-8">
      <div @click="handleLogOut" class="flex items-center gap-2 text-red-400 cursor-pointer mb-4">
        <IconDisconnect />
        <p class="flex-1 font-bold">Se déconnecter</p>
      </div>
      <div class="flex items-center gap-2 text-red-400 cursor-pointer">
        <IconBin />
        <p class="flex-1 font-bold">Supprimer le compte</p>
      </div>
    </div>
    <EditModal
      :show="showModal"
      :fieldLabel="fieldLabel"
      :fieldValue="fieldValue"
      @update:show="showModal = $event"
      @save="saveField"
    />
  </div>
</template>

<style scoped>
input:focus {
  outline: none;
}
</style>
