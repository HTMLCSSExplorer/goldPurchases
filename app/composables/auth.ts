import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

export const useAuth = () => {
  const { $auth } = useNuxtApp();
  const { initFireStoreDoc } = useFirestore();

  const getCurrentUser = async () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        $auth,
        (user) => {
          unsubscribe();
          resolve(user);
        },
        (error) => {
          unsubscribe();
          reject(error);
        }
      );
    });
  };

  const signInWithGoogle = async () => {
    try {
      const response = await signInWithPopup($auth, new GoogleAuthProvider());
      const user = response.user;

      await initFireStoreDoc(user.uid, user.email, user.displayName);

      return user;
    } catch (error) {
      console.log('❌ Error signing in with Google: ', error.message);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut($auth);
    } catch (error) {
      console.log('❌ Error signing in with Google: ', error.message);
    }
  };

  return { getCurrentUser, signInWithGoogle , signOutUser};
};
