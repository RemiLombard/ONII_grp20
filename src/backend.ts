/* eslint-disable no-useless-catch */
import PocketBase from 'pocketbase';
import { Collections, type TypedPocketBase } from './pocketbase-types.js';

export const pb = new PocketBase('http://127.0.0.1:8090') as TypedPocketBase;

export { Collections };

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

        if (!dreamId) {
            throw new Error('ID de rêve manquant');
        }

        const dream = await pb.collection(Collections.Reve).getOne(dreamId);
        const commentCount = dream.comments || 0;

        // Suppression des commentaires associés
        const comments = await pb.collection(Collections.Comments).getFullList({
            filter: `dreamId = '${dreamId}'`,
        });
        for (const comment of comments) {
            await pb.collection(Collections.Comments).delete(comment.id);
        }

        // Suppression du rêve
        await pb.collection(Collections.Reve).delete(dreamId);

        // Mise à jour du compteur de commentaires de l'utilisateur
        const userId = dream.userId;
        const user = await pb.collection(Collections.Users).getOne(userId);
        const newCommentCount = Math.max((user.comments || 0) - commentCount, 0);
        await pb.collection(Collections.Users).update(userId, { comments: newCommentCount });

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

        // Construire une chaîne de filtre pour les IDs suivis
        const filterString = followingIds.map(id => `userId = '${id}'`).join(' || ') + ' && partage = true';

        const dreams = await pb.collection(Collections.Reve).getFullList({
            filter: filterString,
            expand: 'userId',
            sort: '-created'
        });

        return dreams.map(dream => {
            const user = dream.expand?.userId || { username: 'Utilisateur inconnu', avatar: null };
            return { ...dream, user };
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des rêves des abonnements:', error.message);
        throw new Error('Unable to fetch subscription dreams at this time.');
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
        const userId = pb.authStore.model?.id;
        if (!userId) throw new Error('Utilisateur non connecté');

        const like = await pb.collection(Collections.Likes).create({
            dreamId,
            userId,
        });

        // Mise à jour du compteur de likes
        const dream = await pb.collection(Collections.Reve).getOne(dreamId);
        const newLikeCount = (dream.likes || 0) + 1;
        await pb.collection(Collections.Reve).update(dreamId, { likes: newLikeCount });

        return like;
    } catch (error) {
        console.error('Error in addLike:', error);
        throw error;
    }
}

// Fonction pour supprimer un like
export async function removeLike(dreamId: string) {
    try {
        const userId = pb.authStore.model?.id;
        if (!userId) throw new Error('Utilisateur non connecté');

        const filter = `dreamId = '${dreamId}' && userId = '${userId}'`;
        const like = await pb.collection(Collections.Likes).getFirstListItem(filter);

        if (like) {
            await pb.collection(Collections.Likes).delete(like.id);

            // Mise à jour du compteur de likes
            const dream = await pb.collection(Collections.Reve).getOne(dreamId);
            const newLikeCount = Math.max((dream.likes || 0) - 1, 0); // Ne pas descendre en dessous de 0
            await pb.collection(Collections.Reve).update(dreamId, { likes: newLikeCount });
        }
    } catch (error) {
        console.error('Error in removeLike:', error);
        throw error;
    }
}

// Fonction pour ajouter un commentaire
export async function addComment(dreamId: string, content: string) {
    try {
        const userId = pb.authStore.model?.id;
        if (!userId) throw new Error('Utilisateur non connecté');

        // Créer le commentaire
        const comment = await pb.collection(Collections.Comments).create({
            dreamId,
            userId,
            content,
        });

        // Mettre à jour le compteur de commentaires du rêve
        const dream = await pb.collection(Collections.Reve).getOne(dreamId);
        const newCommentCount = (dream.comments || 0) + 1;
        await pb.collection(Collections.Reve).update(dreamId, { comments: newCommentCount });

        // Mettre à jour le compteur de commentaires de l'utilisateur
        const user = await pb.collection(Collections.Users).getOne(userId);
        const newUserCommentCount = (user.comments || 0) + 1;
        await pb.collection(Collections.Users).update(userId, { comments: newUserCommentCount });

        // Récupérer le commentaire avec les détails de l'utilisateur
        const expandedComment = await pb.collection(Collections.Comments).getOne(comment.id, {
            expand: 'userId'
        });

        return { comment: expandedComment, newCommentCount };
    } catch (error) {
        console.error('Error in addComment:', error);
        throw error;
    }
}

// Fonction pour supprimer un commentaire
export async function deleteComment(commentId: string) {
    try {
        const comment = await pb.collection(Collections.Comments).getOne(commentId);
        const userId = comment.userId;
        await pb.collection(Collections.Comments).delete(commentId);

        // Mettre à jour le compteur de commentaires du rêve
        const dream = await pb.collection(Collections.Reve).getOne(comment.dreamId);
        const newCommentCount = Math.max((dream.comments || 0) - 1, 0); // Ne pas descendre en dessous de 0
        await pb.collection(Collections.Reve).update(comment.dreamId, { comments: newCommentCount });

        // Mettre à jour le compteur de commentaires de l'utilisateur
        const user = await pb.collection(Collections.Users).getOne(userId);
        const newUserCommentCount = Math.max((user.comments || 0) - 1, 0);
        await pb.collection(Collections.Users).update(userId, { comments: newUserCommentCount });
    } catch (error) {
        console.error('Error in deleteComment:', error);
        throw error;
    }
}

// Fonction pour signaler un post
export async function reportPost(dreamId: string, reason: string) {
    try {
        const userId = pb.authStore.model?.id;
        if (!userId) throw new Error('Utilisateur non connecté');

        await pb.collection(Collections.Reports).create({
            reportedDreamId: dreamId,
            reporterId: userId,
            reason
        });
    } catch (error) {
        console.error('Error in reportPost:', error);
        throw error;
    }
}

// Fonction pour bloquer un utilisateur
export async function blockUser(blockedUserId: string) {
    try {
        const userId = pb.authStore.model?.id;
        if (!userId) throw new Error('Utilisateur non connecté');

        const block = await pb.collection(Collections.Blocks).create({
            blockedUserId: blockedUserId,
            blockerId: userId
        });

        return block;
    } catch (error) {
        console.error('Error blocking user:', error);
        throw error;
    }
}

// Changer mot de passe
export async function changePassword(currentEmail: string, currentPassword: string, newPassword: string) {
    try {
        // Authentifier l'utilisateur avec le mot de passe actuel
        const authData = await pb.collection('users').authWithPassword(currentEmail, currentPassword);
        console.log('Authentification réussie avec le mot de passe actuel');

        const userId = authData.record.id;

        // Mettre à jour le mot de passe
        await pb.collection('users').update(userId, {
            password: newPassword,
            passwordConfirm: newPassword // Assurez-vous de fournir le champ passwordConfirm si nécessaire
        });
        console.log('Mot de passe mis à jour avec succès');
    } catch (error) {
        console.error('Erreur lors du changement de mot de passe:', error);
        throw new Error('Erreur lors du changement de mot de passe: ' + (error as Error).message);
    }
}

// Fonction pour signaler un commentaire
export async function reportComment(commentId: string, reason: string) {
    try {
        const userId = pb.authStore.model?.id;
        if (!userId) throw new Error('Utilisateur non connecté');

        await pb.collection(Collections.Reports).create({
            reportedCommentId: commentId,
            reporterId: userId,
            reason
        });
    } catch (error) {
        console.error('Error in reportComment:', error);
        throw error;
    }
}

// Fonction pour mettre à jour le compteur de commentaires de l'utilisateur
export async function updateUserCommentCount(userId: string) {
    try {
        const commentsCount = await pb.collection(Collections.Comments).getFullList({
            filter: `userId = '${userId}'`,
            fields: 'id'
        }).then(comments => comments.length);

        await pb.collection(Collections.Users).update(userId, { comments: commentsCount });
    } catch (error) {
        console.error('Error in updateUserCommentCount:', error);
        throw error;
    }
}

// Récupérer les rêves partagés par l'utilisateur connecté
export async function fetchUserSharedDreams() {
    try {
        if (!pb.authStore.isValid) {
            throw new Error('Utilisateur non connecté');
        }

        const userId = pb.authStore.model?.id;
        if (!userId) {
            throw new Error('ID utilisateur non disponible');
        }

        const dreams = await pb.collection(Collections.Reve).getFullList({
            filter: `userId = '${userId}' && partage = true`,
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
        console.error('Error fetching shared dreams:', error);
        throw new Error('Unable to fetch shared dreams at this time.');
    }
}

// Récupérer les rêves likés par l'utilisateur connecté
export async function fetchLikedDreams() {
    try {
        if (!pb.authStore.isValid) {
            throw new Error('Utilisateur non connecté');
        }

        const userId = pb.authStore.model?.id;
        if (!userId) {
            throw new Error('ID utilisateur non disponible');
        }

        const likes = await pb.collection(Collections.Likes).getFullList({
            filter: `userId = '${userId}'`,
            expand: 'dreamId,dreamId.userId'
        });

        const likedDreams = likes.map(like => {
            const dream = like.expand?.dreamId;
            if (dream && dream.expand?.userId) {
                dream.user = dream.expand.userId;
            }
            return dream;
        }).filter(dream => dream !== undefined);

        return likedDreams;
    } catch (error) {
        console.error('Error fetching liked dreams:', error);
        throw new Error('Unable to fetch liked dreams at this time.');
    }
}

// Fonction pour suivre un utilisateur
export async function followUser(followingId: string) {
    try {
        const userId = pb.authStore.model?.id;
        if (!userId) throw new Error('Utilisateur non connecté');

        await pb.collection(Collections.Follows).create({
            followerId: userId,
            followingId: followingId
        });

        // Vérifier si les utilisateurs existent
        const follower = await pb.collection(Collections.Users).getOne(userId);
        const following = await pb.collection(Collections.Users).getOne(followingId);

        if (follower && following) {
            await pb.collection(Collections.Users).update(follower.id, {
                following: (follower.following || 0) + 1
            });
            
            await pb.collection(Collections.Users).update(following.id, {
                followers: (following.followers || 0) + 1
            });
        } else {
            throw new Error('Utilisateur non trouvé');
        }
    } catch (error) {
        console.error('Error following user:', error);
        throw error;
    }
}

// Fonction pour désabonner un utilisateur
export async function unfollowUser(followingId: string) {
    try {
        const userId = pb.authStore.model?.id;
        if (!userId) throw new Error('Utilisateur non connecté');

        const filter = `followerId = '${userId}' && followingId = '${followingId}'`;
        const followRecord = await pb.collection(Collections.Follows).getFirstListItem(filter);

        if (followRecord) {
            await pb.collection(Collections.Follows).delete(followRecord.id);

            // Vérifier si les utilisateurs existent
            const follower = await pb.collection(Collections.Users).getOne(userId);
            const following = await pb.collection(Collections.Users).getOne(followingId);

            if (follower && following) {
                await pb.collection(Collections.Users).update(follower.id, {
                    following: Math.max((follower.following || 0) - 1, 0)
                });
                
                await pb.collection(Collections.Users).update(following.id, {
                    followers: Math.max((following.followers || 0) - 1, 0)
                });
            } else {
                throw new Error('Utilisateur non trouvé');
            }
        }
    } catch (error) {
        console.error('Error unfollowing user:', error);
        throw error;
    }
}
  
  
// Fonction pour vérifier si l'utilisateur courant suit un autre utilisateur
export async function checkIfFollowing(followingId) {
    try {
      const userId = pb.authStore.model?.id;
      if (!userId) throw new Error('Utilisateur non connecté');
  
      const filter = `followerId = '${userId}' && followingId = '${followingId}'`;
      const follow = await pb.collection(Collections.Follows).getFirstListItem(filter);
  
      return !!follow;
    } catch (error) {
      if (error.status === 404) {
        return false; // Pas de résultat trouvé signifie que l'utilisateur ne suit pas
      }
      console.error('Error checking if following:', error);
      throw error;
    }
  }

  // Récupérer les rêves partagés par un autre utilisateur
export async function fetchOtherUserSharedDreams(userId) {
    try {
      const dreams = await pb.collection(Collections.Reve).getFullList({
        filter: `userId = '${userId}' && partage = true`,
        expand: 'userId'
      })
  
      return dreams.map(dream => {
        const user = dream.expand?.userId || { username: 'Utilisateur inconnu', avatar: null }
        return { ...dream, user }
      })
    } catch (error) {
      console.error('Error fetching shared dreams:', error)
      throw error
    }
  }
  
  // Récupérer les rêves likés par un autre utilisateur
  export async function fetchOtherUserLikedDreams(userId) {
    try {
      const likes = await pb.collection(Collections.Likes).getFullList({
        filter: `userId = '${userId}'`,
        expand: 'dreamId,dreamId.userId'
      })
  
      const likedDreams = likes.map(like => {
        const dream = like.expand?.dreamId
        if (dream && dream.expand?.userId) {
          dream.user = dream.expand.userId
        }
        return dream
      }).filter(dream => dream !== undefined)
  
      return likedDreams
    } catch (error) {
      console.error('Error fetching liked dreams:', error)
      throw error
    }
  }

  // Suppression de compte
export async function deleteAccount() {
    try {
        if (!pb.authStore.isValid) {
            throw new Error('Utilisateur non connecté');
        }

        const userId = pb.authStore.model?.id;
        if (!userId) {
            throw new Error('ID utilisateur non disponible');
        }

        // Supprimer tous les rêves de l'utilisateur
        const dreams = await pb.collection(Collections.Reve).getFullList({
            filter: `userId = '${userId}'`,
        });
        for (const dream of dreams) {
            await deleteDream(dream.id);
        }

        // Supprimer tous les commentaires de l'utilisateur
        const comments = await pb.collection(Collections.Comments).getFullList({
            filter: `userId = '${userId}'`,
        });
        for (const comment of comments) {
            await pb.collection(Collections.Comments).delete(comment.id);
        }

        // Supprimer l'utilisateur
        await pb.collection('users').delete(userId);

        // Déconnecter l'utilisateur et effacer les données locales
        logOut();
    } catch (error) {
        throw new Error('Erreur lors de la suppression du compte: ' + error.message);
    }
}