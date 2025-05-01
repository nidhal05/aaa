import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDe5UivD7aimcAUsDE5Maxettl0oyA19yE",
  authDomain: "suivi-patient-354b1.firebaseapp.com",
  databaseURL: "https://suivi-patient-354b1-default-rtdb.firebaseio.com",
  projectId: "suivi-patient-354b1",
  storageBucket: "suivi-patient-354b1.firebasestorage.app",
  messagingSenderId: "928504139931",
  appId: "1:928504139931:web:9407823bde616dbbba763e",
  measurementId: "G-TGGLLYE79E"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
persistence: getReactNativePersistence(AsyncStorage),
});



// Configurer la persistance de l'authentification
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error('Erreur lors de la configuration de la persistance:', error);
  });

// Initialiser Realtime Database
const db = getDatabase(app);

export { auth, db };