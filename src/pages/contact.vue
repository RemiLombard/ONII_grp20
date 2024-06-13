<script setup lang="ts">
import { ref } from 'vue'
import ButtonUser from '@/components/ButtonUser.vue';

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  message: ''
})

function submitForm() {
  console.log('Formulaire soumis avec les données :', form.value)
  alert('Message soumis avec succès')
  // Réinitialiser le formulaire
  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  }
}
import IconBack from '@/components/icons/IconBack.vue';
import router from '@/router';

const goBack = () => {
  router.go(-1)
}
</script>

<template>
  
  <div class="max-w-md mx-auto text-white rounded-lg">
    <section class="flex justify-between items-center flex-grow">
    <IconBack class="text-white" @click="goBack" />
    <h1 class="text-white">Nous contacter</h1>
  </section>
    <p class="mb-8">
      Votre avis compte ! Nous sommes là pour répondre à toutes vos questions et écouter vos suggestions. N'hésitez pas à nous contacter.
    </p>
    <form @submit.prevent="submitForm">
      <div class="mb-5">
        <label for="firstName" class="block mb-1 font-Quicksand font-bold text-lg">Prénom</label>
        <input type="text" v-model="form.firstName" id="firstName" placeholder="votre prénom" class="w-full p-2 rounded bg-nightblue text-white" required />
      </div>
      <div class="mb-5">
        <label for="lastName" class="block mb-1 font-Quicksand font-bold text-lg">Nom</label>
        <input type="text" v-model="form.lastName" id="lastName" placeholder="votre nom" class="w-full p-2 rounded bg-nightblue text-white" required />
      </div>
      <div class="mb-5">
        <label for="email" class="block mb-1 font-Quicksand font-bold text-lg">Adresse mail</label>
        <input type="email" v-model="form.email" id="email" placeholder="votre adresse mail" class="w-full p-2 rounded bg-nightblue text-white" required />
      </div>
      <div class="mb-5">
        <label for="message" class="block mb-1 font-Quicksand font-bold text-lg">Message</label>
        <textarea v-model="form.message" id="message" placeholder="votre message" class="w-full p-2 rounded bg-nightblue text-white h-32" required></textarea>
      </div>
      <div class="flex flex-col items-center justify-center gap-5">
        <ButtonUser
          variant="default"
          text="Envoyer"
          size="medium"
          type="submit"
        />
      </div>
    </form>
  </div>
</template>



