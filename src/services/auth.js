import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from './firestore';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error(getFriendlyError(error.code));
    }
  };

  const register = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Mettre à jour le profil de l'utilisateur avec displayName
      await updateProfile(userCredential.user, { displayName });
    } catch (error) {
      throw new Error(getFriendlyError(error.code));
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error("Une erreur s'est produite lors de la déconnexion");
    }
  };

  // Fonction pour traduire les codes d'erreur Firebase en messages conviviaux
  const getFriendlyError = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'Adresse email invalide';
      case 'auth/user-disabled':
        return 'Ce compte a été désactivé';
      case 'auth/user-not-found':
        return 'Aucun compte trouvé avec cette adresse email';
      case 'auth/wrong-password':
        return 'Mot de passe incorrect';
      case 'auth/email-already-in-use':
        return 'Cette adresse email est déjà utilisée';
      case 'auth/weak-password':
        return 'Le mot de passe doit contenir au moins 6 caractères';
      case 'auth/operation-not-allowed':
        return 'Cette opération n\'est pas autorisée';
      case 'auth/network-request-failed':
        return 'Erreur de réseau. Veuillez vérifier votre connexion internet';
      default:
        return 'Une erreur s\'est produite. Veuillez réessayer';
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}