/* eslint-disable no-useless-catch */
import PocketBase from 'pocketbase';

export const pb = new PocketBase('http://127.0.0.1:8090');

export async function addUser(event: { email: string; password: string; passwordConfirm: string }) {
    if (event.password !== event.passwordConfirm) {
        throw new Error('Les mots de passe ne correspondent pas.');
    }

    try {
        const record = await pb.collection('users').create({
            email: event.email,
            password: event.password,
            passwordConfirm: event.passwordConfirm
        });
        return record;
    } catch (error) {
        throw error;
    }
}

export async function logIn(email: string, password: string) {
    try {
        const authData = await pb.collection('users').authWithPassword(email, password);
        return authData;
    } catch (error) {
        throw error;
    }
}

export async function createDream(dreamData: { title: string; fullText: string }) {
    try {
        if (!pb.authStore.isValid) {
            throw new Error('Utilisateur non connecté');
        }

        const userId = pb.authStore.model?.id; // Utilisez l'ID de l'utilisateur connecté
        if (!userId) {
            throw new Error('ID utilisateur non disponible');
        }

        const newDream = await pb.collection('reve').create({
            ...dreamData,
            userId: userId // Assurez-vous que c'est bien l'ID utilisateur
        });
        return newDream;
    } catch (error) {
        throw error;
    }
}

export function logOut() {
  pb.authStore.clear(); // Invalider la session côté PocketBase
  localStorage.removeItem('authToken'); // Effacer le token d'authentification
  localStorage.removeItem('userId'); // Effacer l'ID utilisateur
}