import type { TypedPocketBase } from '@/pocketbase-types';
import PocketBase from 'pocketbase';
import { useRouter } from 'vue-router'
export const pb = new PocketBase('http://127.0.0.1:8090') as TypedPocketBase;

const router = useRouter

interface NewUser {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
    firstName: string;
    name: string; // Utiliser lastName au lieu de name
    avatar?: File;
  }
  
  export async function userSignup(newUser: NewUser) {
    try {
      // Vérification que les mots de passe correspondent
      if (newUser.password !== newUser.passwordConfirm) {
        throw new Error("Les mots de passe ne correspondent pas.");
      }
  
      // Création du formulaire de données pour inclure un fichier
      const formData = new FormData();
      formData.append('username', newUser.username);
      formData.append('email', newUser.email);
      formData.append('password', newUser.password);
      formData.append('passwordConfirm', newUser.passwordConfirm);
      formData.append('firstName', newUser.firstName);
      formData.append('name', newUser.name); // Utiliser lastName au lieu de name
      if (newUser.avatar) {
        formData.append('avatar', newUser.avatar);
      }
  
      // Envoi de la demande d'inscription à PocketBase
      const createdUser = await pb.collection('users').create(formData);
  
      return createdUser;
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      throw error;
    }
  }

  export async function logIn(event: { email: string; password: string }) {
    try {
      const record = await pb.collection('users').authWithPassword(
        event.email,
        event.password
      );
      return record;
    } catch (error) {
      throw new Error("L'email ou le mot de passe est incorrect.");
    }
  }