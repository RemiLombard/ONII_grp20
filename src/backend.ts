/* eslint-disable no-useless-catch */
import PocketBase from 'pocketbase';
import { Collections, type TypedPocketBase } from './pocketbase-types.js';

export const pb = new PocketBase('http://127.0.0.1:8090/') as TypedPocketBase;

// Restaurer le token d'authentification à partir de localStorage
const authToken = localStorage.getItem('authToken');
if (authToken) {
    pb.authStore.save(authToken, pb.authStore.model);
}

// Créer utilisateur
export async function addUser(event: { email: string; password: string; passwordConfirm: string; username: string; firstName: string; name: string; avatar?: File }) {
    if (event.password !== event.passwordConfirm) {
        throw new Error('Les mots de passe ne correspondent pas.');
    }

    try {
        const formData = new FormData();
        formData.append('email', event.email);
        formData.append('username', event.username);
        formData.append('firstName', event.firstName);
        formData.append('name', event.name);
        formData.append('password', event.password);
        formData.append('passwordConfirm', event.passwordConfirm);

        if (event.avatar) {
            formData.append('avatar', event.avatar);
        }

        const record = await pb.collection('users').create(formData);

        return record;
    } catch (error) {
        throw error;
    }
}

// Connecter utilisateur
export async function logIn(email: string, password: string) {
    try {
        const authData = await pb.collection('users').authWithPassword(email, password);
        localStorage.setItem('authToken', authData.token); // Stocker le token
        localStorage.setItem('userId', authData.record.id); // Stocker l'ID utilisateur correctement
        return authData;
    } catch (error) {
        throw error;
    }
}

// Créer rêve
export async function createDream(dreamData: { title: string; fullText: string; date: string; recurrent: string; lucide: string; type: string; categorie: string; partage: boolean }) {
    try {
        if (!pb.authStore.isValid) {
            throw new Error('Utilisateur non connecté');
        }

        const userId = pb.authStore.model?.id;
        if (!userId) {
            throw new Error('ID utilisateur non disponible');
        }

        const excerpt = generateExcerpt(dreamData.fullText, 147);

        const newDream = await pb.collection('reve').create({
            ...dreamData,
            userId: userId,
            categorie: dreamData.categorie, // Assurez-vous que les catégories sont envoyées correctement
            excerpt: excerpt
        });

        return newDream;
    } catch (error) {
        throw error;
    }
}

// Générer extrait rêve
function generateExcerpt(text: string, charLimit: number): string {
    if (text.length <= charLimit) {
        return text;
    }
    return text.slice(0, charLimit) + '...';
}

// Suppression de rêve
export async function deleteDream(dreamId: string) {
    try {
        if (!pb.authStore.isValid) {
            throw new Error('Utilisateur non connecté');
        }

        await pb.collection('reve').delete(dreamId);
    } catch (error) {
        throw new Error('Erreur lors de la suppression du rêve: ' + error.message);
    }
}

// Déconnecter utilisateur
export function logOut() {
    pb.authStore.clear(); // Invalider la session côté PocketBase
    localStorage.removeItem('authToken'); // Effacer le token d'authentification
    localStorage.removeItem('userId'); // Effacer l'ID utilisateur
}

// Récupérer rêve de l'utilisateur connecté
export async function getUserDreams() {
    try {
        if (!pb.authStore.isValid) {
            throw new Error('Utilisateur non connecté');
        }

        const userId = pb.authStore.model?.id;
        if (!userId) {
            throw new Error('ID utilisateur non disponible');
        }

        const dreams = await pb.collection('reve').getFullList({
            filter: `userId = '${userId}'`,
            sort: '-created'
        });

        return dreams;
    } catch (error) {
        throw error;
    }
}

// Rechercher les rêves de l'utilisateur connecté
export async function searchUserDreams(query: string) {
    try {
        if (!pb.authStore.isValid) {
            throw new Error('Utilisateur non connecté');
        }

        const userId = pb.authStore.model?.id;
        if (!userId) {
            throw new Error('ID utilisateur non disponible');
        }

        const encodedQuery = encodeURIComponent(query);
        const filter = `userId = '${userId}' && (title ~ '${encodedQuery}' || fullText ~ '${encodedQuery}')`;

        const dreams = await pb.collection('reve').getFullList({
            filter: filter,
            sort: '-created'
        });

        console.log('searchUserDreams:', dreams); // Ajouter un log pour vérifier les résultats
        return dreams;
    } catch (error) {
        console.error('Erreur dans searchUserDreams:', error);
        throw error;
    }
}
