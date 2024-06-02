/* eslint-disable no-useless-catch */
import PocketBase from 'pocketbase';

export const pb = new PocketBase('http://127.0.0.1:8090');

// Restaurer le token d'authentification à partir de localStorage
const authToken = localStorage.getItem('authToken');
if (authToken) {
    pb.authStore.save(authToken, pb.authStore.model);
}

// Créer utilisateur
export async function addUser(event: { email: string; password: string; passwordConfirm: string; username: string; firstName: string; name: string }) {
    if (event.password !== event.passwordConfirm) {
        throw new Error('Les mots de passe ne correspondent pas.');
    }

    try {
        const record = await pb.collection('users').create({
            email: event.email,
            username: event.username,
            firstName: event.firstName,
            name: event.name,
            password: event.password,
            passwordConfirm: event.passwordConfirm
        });
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
export async function createDream(dreamData: { title: string; fullText: string, date: string, recurent: boolean, lucide: boolean, type: string, categories: string[] }) {
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
            categories: dreamData.categories, // Assurez-vous que les catégories sont envoyées correctement
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

// Déconnecter utilisateur
export function logOut() {
    pb.authStore.clear(); // Invalider la session côté PocketBase
    localStorage.removeItem('authToken'); // Effacer le token d'authentification
    localStorage.removeItem('userId'); // Effacer l'ID utilisateur
}

// Rêve utilisateur connecté
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
