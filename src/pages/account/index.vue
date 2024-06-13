<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { logOut, pb, deleteAccount } from '@/backend'
import { useRouter } from 'vue-router'
import IconBack from '@/components/icons/IconBack.vue'
import IconDisconnect from '@/components/icons/IconDisconnect.vue'
import IconBin from '@/components/icons/IconBin.vue'
import IconModif from '@/components/icons/IconModif.vue'
import IconArobase from '@/components/icons/IconArobase.vue'
import IconNewsletter from '@/components/icons/IconNewsletter.vue'
import IconModiname from '@/components/icons/IconModifname.vue'
import IconLock from '@/components/icons/IconLock.vue'
import EditModal from '@/components/EditModal.vue'
import WarningModal from '@/components/WarningModal.vue'
import LogOutWarning from '@/components/LogOutWarning.vue'

const router = useRouter()
const user = ref({
  username: '',
  firstName: '',
  name: '',
  email: ''
})
const fieldToEdit = ref('')
const showModal = ref(false)
const showWarningModal = ref(false)
const showLogOutWarning = ref(false) // Nouveau état pour le modal de déconnexion
const fieldLabel = ref('')
const fieldValue = ref('')
const loading = ref(false)
const errorMessage = ref('')

const fetchUserDetails = async () => {
  try {
    const userId = pb.authStore.model.id
    const response = await pb.collection('users').getOne(userId)
    user.value = response
  } catch (error) {
    errorMessage.value =
      "Erreur lors de la récupération des détails de l'utilisateur : " + error.message
  }
}

const updateUserDetails = async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    const userId = pb.authStore.model.id
    await pb.collection('users').update(userId, user.value)
    loading.value = false
  } catch (error) {
    errorMessage.value =
      "Erreur lors de la mise à jour des détails de l'utilisateur : " + error.message
    loading.value = false
  }
}

const handleLogOut = () => {
  showLogOutWarning.value = true // Afficher le modal de déconnexion
}

const handleConfirmLogOut = () => {
  logOut()
  router.push('/') // Rediriger l'utilisateur vers la page de connexion
}

const handleDeleteAccount = async () => {
  try {
    await deleteAccount();
    router.push('/'); // Rediriger l'utilisateur vers la page de connexion
  } catch (error) {
    errorMessage.value = "Erreur lors de la suppression du compte : " + error.message;
  }
}

const openModal = (field) => {
  fieldToEdit.value = field
  fieldLabel.value = getFieldLabel(field)
  fieldValue.value = user.value[field]
  showModal.value = true
}

const getFieldLabel = (field) => {
  switch (field) {
    case 'username':
      return "Nom d'utilisateur"
    case 'firstName':
      return 'Prénom'
    case 'name':
      return 'Nom'
    case 'email':
      return 'Email'
    default:
      return ''
  }
}

const saveField = (value) => {
  user.value[fieldToEdit.value] = value
  updateUserDetails()
}

onMounted(() => {
  fetchUserDetails()
})

const goBack = () => {
  router.go(-1)
}

const openWarningModal = () => {
  showWarningModal.value = true
}
</script>

<template>
  <section class="flex justify-between items-center flex-grow">
    <IconBack class="text-white" @click="goBack" />
    <h1 class="text-white">Votre compte</h1>
  </section>
  <div class="bg-violet-950 rounded-[15px] py-3 px-2.5">
    <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>
    <div class="">
      <div class="flex justify-between pb-3.5 border-b border-gray-400">
        <div class="flex gap-2">
          <IconArobase class="text-white" />
          <p class="text-left text-lg font-Quicksand font-bold text-white">{{ user.username }}</p>
        </div>
        <IconModif class="" @click="openModal('username')" />
      </div>

      <div class="flex justify-between py-3.5 border-b border-gray-400">
        <div class="flex gap-2">
          <IconModiname class="text-white" />
          <p class="text-left text-lg font-Quicksand font-bold text-white">{{ user.firstName }}</p>
        </div>
        <IconModif class="" @click="openModal('firstName')" />
      </div>

      <div class="flex justify-between py-3.5 border-b border-gray-400">
        <div class="flex gap-2">
          <IconModiname class="text-white" />
          <p class="text-left text-lg font-Quicksand font-bold text-white">{{ user.name }}</p>
        </div>
        <IconModif class="" @click="openModal('name')" />
      </div>

      <div class="flex justify-between py-3.5 border-b border-gray-400">
        <div class="flex gap-2">
          <IconNewsletter class="text-white" />
          <p class="text-left text-lg font-Quicksand font-bold text-white">{{ user.email }}</p>
        </div>
        <IconModif class="" @click="openModal('email')" />
      </div>
      <button
        class="bg-fuchsia-700 text-white rounded p-3 w-full flex items-center justify-center gap-2 mt-3.5"
        @click="() => router.push('/account/change-password')"
      >
        <IconLock class="inline items-center" />
        <p class="text-left text-lg font-Quicksand font-bold text-white">
          Changer votre mot de passe
        </p>
      </button>
    </div>
  </div>

  <div class="bg-violet-950 rounded-[15px] py-3 px-2.5 mt-8">
    <div class="flex justify-between pb-3.5 border-b border-gray-400">
      <div @click="handleLogOut" class="flex gap-2">
        <IconDisconnect />
        <p class="text-left text-lg font-Quicksand font-bold text-red-400">Se déconnecter</p>
      </div>
    </div>

    <div class="flex justify-between pt-3.5">
      <div class="flex gap-2" @click="openWarningModal">
        <IconBin />
        <p class="text-left text-lg font-Quicksand font-bold text-red-400">Supprimer le compte</p>
      </div>
    </div>
  </div>
  <EditModal
    :show="showModal"
    :fieldLabel="fieldLabel"
    :fieldValue="fieldValue"
    @update:show="showModal = $event"
    @save="saveField"
  />
  <WarningModal
    v-if="showWarningModal"
    @confirm="handleDeleteAccount"
    @cancel="showWarningModal = false"
  />
  <LogOutWarning
    v-if="showLogOutWarning"
    @confirm="handleConfirmLogOut"
    @cancel="showLogOutWarning = false"
  />
</template>
