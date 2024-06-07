<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { addUser } from '@/backend'
import ButtonUser from '@/components/ButtonUser.vue'
import IconLogo from '@/components/icons/IconLogo.vue'

const router = useRouter()
const email = ref('')
const username = ref('')
const name = ref('')
const firstName = ref('')
const password = ref('')
const passwordConfirm = ref('')
const avatar = ref<File | null>(null)
const avatarPreview = ref<string | null>(null) // Ajouter une variable pour l'aperçu de l'avatar
const isLoading = ref(false)
const errorMessage = ref('')

const handleSignUp = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    await addUser({
      email: email.value,
      password: password.value,
      passwordConfirm: passwordConfirm.value,
      username: username.value,
      firstName: firstName.value,
      name: name.value,
      avatar: avatar.value as File
    })
    router.push('/')
  } catch (error) {
    errorMessage.value = "Erreur lors de l'inscription: " + (error as Error).message
  } finally {
    isLoading.value = false
  }
}

const handleAvatarChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    avatar.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      avatarPreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}
</script>

<template>
  <div class="flex items-center gap-3">
    <h1>Bienvenue sur</h1>
    <IconLogo class="" />
  </div>
  <div class="bg-nightblue py-10 px-5 mb-10 rounded-3xl">
    <h1 class="text-center mt-0 mb-10">Inscription</h1>
    <form @submit.prevent="handleSignUp">
      <div class="mb-5">
        <label for="email" class="text-lg font-bold font-Quicksand text-left text-white"
          >Email:</label
        >
        <input
          class="text-white border bg-violet-950 border-yellow-200 mt-1 rounded-lg w-full py-2.5 px-3"
          type="email"
          id="email"
          v-model="email"
          placeholder="Ex : damals@gmail.com"
          required
        />
      </div>
      <div class="mb-5">
        <label for="username" class="text-lg font-bold font-Quicksand text-left text-white"
          >Nom d'utilisateur:</label
        >
        <input
          class="text-white border bg-violet-950 border-yellow-200 mt-1 rounded-lg w-full py-2.5 px-3"
          type="text"
          id="username"
          v-model="username"
          placeholder="Ex : damals25"
          required
        />
      </div>
      <div class="mb-5">
        <label for="firstName" class="text-lg font-bold font-Quicksand text-left text-white"
          >Prénom:</label
        >
        <input
          class="text-white border bg-violet-950 border-yellow-200 mt-1 rounded-lg w-full py-2.5 px-3"
          type="text"
          id="firstName"
          v-model="firstName"
          placeholder="Ex : David"
          required
        />
      </div>
      <div class="mb-5">
        <label for="name" class="text-lg font-bold font-Quicksand text-left text-white">Nom:</label>
        <input
          class="text-white border bg-violet-950 border-yellow-200 mt-1 rounded-lg w-full py-2.5 px-3"
          type="text"
          id="name"
          v-model="name"
          placeholder="Ex : Malsot"
          required
        />
      </div>
      <div>
        <div class="mb-5">
          <label for="password" class="text-lg font-bold font-Quicksand text-left text-white"
            >Mot de passe:</label
          >
          <input
            class="text-white border bg-violet-950 border-yellow-200 mt-1 rounded-lg w-full py-2.5 px-3"
            type="password"
            id="password"
            v-model="password"
            placeholder="8 caractères minimum"
            required
          />
        </div>
        <div class="mb-5">
          <label for="passwordConfirm" class="text-lg font-bold font-Quicksand text-left text-white"
            >Confirmez le mot de passe:</label
          >
          <input
            class="text-white border bg-violet-950 border-yellow-200 mt-1 rounded-lg w-full py-2.5 px-3"
            type="password"
            id="passwordConfirm"
            v-model="passwordConfirm"
            placeholder="8 caractères minimum"
            required
          />
        </div>
        <div v-if="password !== passwordConfirm" class="mb-5 text-red-400">
          Les mots de passe ne correspondent pas
        </div>
      </div>

      <div class="mb-5">
        <label for="avatar" class="text-lg font-bold font-Quicksand text-left text-white"
          >Avatar:</label
        >
        <input
          class="text-white border bg-violet-950 border-yellow-200 mt-1 rounded-lg w-full py-2.5 px-3"
          type="file"
          id="avatar"
          @change="handleAvatarChange"
          accept="image/*"
        />
        <div v-if="avatarPreview" class="mt-4">
          <img
            :src="avatarPreview"
            alt="Avatar Preview"
            class="w-32 h-32 object-cover rounded-full mx-auto"
          />
        </div>
        <div v-if="errorMessage" class="mb-4 text-red-400">
          {{ errorMessage }}
        </div>
      </div>
      <div class="flex flex-col items-center justify-center gap-5">
        <ButtonUser
          variant="default"
          text="S'inscrire"
          size="medium"
          type="submit"
          :disabled="isLoading"
        />
        <p>
          Vous êtes déjà inscrit ?
          <RouterLink to="/" class="text-yellow-200 hover:underline"
            >Connectez-vous !</RouterLink
          >
        </p>
      </div>
    </form>
  </div>
</template>
