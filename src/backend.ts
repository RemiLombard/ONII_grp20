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

// Mettre à jour un rêve
export async function updateDream(dreamId: string, updatedData: { title: string; fullText: string; date: string; recurrent: string; lucide: string; type: string; categorie: string; partage: boolean }) {
    try {
        if (!pb.authStore.isValid) {
            throw new Error('Utilisateur non connecté');
        }

        const updatedDream = await pb.collection('reve').update(dreamId, updatedData);
        return updatedDream;
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

// Filtrer les rêves de l'utilisateur connecté
export async function filterUserDreams(filters: Record<string, string>) {
    try {
      if (!pb.authStore.isValid) {
        throw new Error('Utilisateur non connecté');
      }
  
      const userId = pb.authStore.model?.id;
      if (!userId) {
        throw new Error('ID utilisateur non disponible');
      }
  
      let filterString = `userId = '${userId}'`;
      
      if (filters.category) {
        filterString += ` && categorie = '${filters.category}'`;
      }
      if (filters.type) {
        filterString += ` && type = '${filters.type}'`;
      }
      if (filters.recurrent) {
        filterString += ` && recurrent = '${filters.recurrent}'`;
      }
      if (filters.lucide) {
        filterString += ` && lucide = '${filters.lucide}'`;
      }
      
      const sortOption = filters.sortOption === 'Date (ancien)' ? 'created' : '-created';
  
      const dreams = await pb.collection('reve').getFullList({
        filter: filterString,
        sort: sortOption,
      });
  
      return dreams;
    } catch (error) {
      throw error;
    }
  }

// Récupération données rêves pour stats
export async function getUserDreamStatistics() {
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
            sort: 'created',
        });

        if (dreams.length === 0) {
            return {
                totalDreams: 0,
                averageDaysBetweenDreams: 0,
                nightmarePercentage: 0,
                recurrentPercentage: 0,
                lucidPercentage: 0,
                mostFrequentCategory: 'N/A',
            };
        }

        const totalDreams = dreams.length;
        const dates = dreams.map(dream => new Date(dream.date).getTime());
        const totalDays = (Math.max(...dates) - Math.min(...dates)) / (1000 * 60 * 60 * 24);
        const averageDaysBetweenDreams = totalDays / (totalDreams - 1);

        const nightmarePercentage = (dreams.filter(dream => dream.type === 'Cauchemar').length / totalDreams) * 100;
        const recurrentPercentage = (dreams.filter(dream => dream.recurrent === 'Oui').length / totalDreams) * 100;
        const lucidPercentage = (dreams.filter(dream => dream.lucide === 'Oui').length / totalDreams) * 100;

        const categoryCounts = dreams.reduce((acc, dream) => {
            acc[dream.categorie] = (acc[dream.categorie] || 0) + 1;
            return acc;
        }, {});

        const mostFrequentCategory = Object.keys(categoryCounts).reduce((a, b) => categoryCounts[a] > categoryCounts[b] ? a : b);

        return {
            totalDreams,
            averageDaysBetweenDreams,
            nightmarePercentage,
            recurrentPercentage,
            lucidPercentage,
            mostFrequentCategory,
        };
    } catch (error) {
        throw error;
    }
}


// Récupérer les rêves partagés par tous les utilisateurs
export async function fetchSharedDreams() {
    try {
        const dreams = await pb.collection('reve').getFullList({
            filter: 'partage = true',
            expand: 'userId'
        });

        const dreamsWithUserDetails = dreams.map(dream => {
            const user = dream.expand?.userId || { username: 'Utilisateur inconnu', avatar: null };
            return {
                ...dream,
                user: user
            };
        });

        return dreamsWithUserDetails;
    } catch (error) {
        console.error('Error fetching shared dreams:', error.message);
        throw new Error('Unable to fetch shared dreams at this time.');
    }
}

// Récupérer les rêves partagés par les abonnements de l'utilisateur
export async function getSubscriptionDreams() {
    try {
        if (!pb.authStore.isValid) {
            throw new Error('Utilisateur non connecté');
        }

        const userId = pb.authStore.model?.id;
        if (!userId) {
            throw new Error('ID utilisateur non disponible');
        }

        const follows = await pb.collection(Collections.Follows).getFullList({
            filter: `followerId = '${userId}'`,
        });

        const followingIds = follows.map(follow => follow.followingId);

        if (followingIds.length === 0) {
            return [];
        }

        const filterString = `userId IN (${followingIds.map(id => `'${id}'`).join(', ')}) && partage = true`;

        const dreams = await pb.collection(Collections.Reve).getFullList({
            filter: filterString,
            expand: 'userId',  // Assurez-vous d'inclure les détails de l'utilisateur
            sort: '-created'
        });

        return dreams;
    } catch (error) {
        throw new Error('Erreur lors de la récupération des rêves des abonnements: ' + error.message);
    }
}

// Fonction pour demander une réinitialisation de mot de passe
export async function requestPasswordReset(email: string) {
    try {
        await pb.collection('users').requestPasswordReset(email);
    } catch (error) {
        throw new Error('Erreur lors de la demande de réinitialisation de mot de passe: ' + error.message);
    }
}

// Rechercher les rêves partagés par tous les utilisateurs
export async function searchSharedDreams(query: string) {
    try {
        const filter = `(title ~ '${query}' || excerpt ~ '${query}') && partage = true`;
        const dreams = await pb.collection('reve').getFullList({
            filter: filter,
            expand: 'userId'
        });

        const dreamsWithUserDetails = dreams.map(dream => {
            const user = dream.expand?.userId || { username: 'Utilisateur inconnu', avatar: null };
            return {
                ...dream,
                user: user
            };
        });

        return dreamsWithUserDetails;
    } catch (error) {
        console.error('Error searching shared dreams:', error);
        throw error;
    }
}

// Filtrer les rêves partagés
export async function filterSharedDreams(filters: Record<string, string>) {
    try {
        let filterString = 'partage = true';
        
        if (filters.category) {
            filterString += ` && categorie = '${filters.category}'`;
        }
        if (filters.type) {
            filterString += ` && type = '${filters.type}'`;
        }
        if (filters.recurrent) {
            filterString += ` && recurrent = '${filters.recurrent}'`;
        }
        if (filters.lucide) {
            filterString += ` && lucide = '${filters.lucide}'`;
        }
        
        const sortOption = filters.sortOption === 'Date (ancien)' ? 'created' : '-created';
        
        const dreams = await pb.collection('reve').getFullList({
            filter: filterString,
            sort: sortOption,
            expand: 'userId',
        });

        const dreamsWithUserDetails = dreams.map(dream => {
            const user = dream.expand?.userId || { username: 'Utilisateur inconnu', avatar: null };
            return {
                ...dream,
                user: user
            };
        });

        return dreamsWithUserDetails;
    } catch (error) {
        console.error('Error filtering shared dreams:', error.message);
        throw new Error('Unable to filter shared dreams at this time.');
    }
}


// Fonction pour réinitialiser le mot de passe
export async function resetPassword(token: string, newPassword: string) {
    try {
        console.log('Resetting password with token:', token);
        await pb.collection('users').confirmPasswordReset(token, newPassword, newPassword);
        console.log('Password reset successful');
    } catch (error) {
        console.error('Error resetting password:', error.message);
        throw new Error('Error resetting password: ' + error.message);
    }
}

// Fonction pour ajouter un like
export async function addLike(dreamId: string) {
    try {
      const userId = pb.authStore.model?.id
      if (!userId) throw new Error('Utilisateur non connecté')
  
      const like = await pb.collection(Collections.Likes).create({
        dreamId,
        userId,
      })
  
      // Mise à jour du compteur de likes
      const dream = await pb.collection(Collections.Reve).getOne(dreamId)
      const newLikeCount = (dream.likes || 0) + 1
      await pb.collection(Collections.Reve).update(dreamId, { likes: newLikeCount })
  
      return like
    } catch (error) {
      console.error('Error in addLike:', error)
      throw error
    }
  }
  
  // Fonction pour supprimer un like
  export async function removeLike(dreamId: string) {
    try {
      const userId = pb.authStore.model?.id
      if (!userId) throw new Error('Utilisateur non connecté')
  
      const filter = `dreamId = '${dreamId}' && userId = '${userId}'`
      const like = await pb.collection(Collections.Likes).getFirstListItem(filter)
  
      if (like) {
        await pb.collection(Collections.Likes).delete(like.id)
  
        // Mise à jour du compteur de likes
        const dream = await pb.collection(Collections.Reve).getOne(dreamId)
        const newLikeCount = Math.max((dream.likes || 0) - 1, 0) // Ne pas descendre en dessous de 0
        await pb.collection(Collections.Reve).update(dreamId, { likes: newLikeCount })
      }
    } catch (error) {
      console.error('Error in removeLike:', error)
      throw error
    }
  }
  
