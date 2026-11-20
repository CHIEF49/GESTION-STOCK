// Configuration Firebase de l'atelier (console Firebase › Paramètres du projet › Vos applications).
// Ces valeurs ne sont pas secrètes : l'accès au stock est protégé par la connexion
// et par les règles de sécurité (fichier firestore.rules).
export const firebaseConfig = {
  apiKey: "AIzaSyCc9w9W8zTISRMRa9SMCP7JRs1ZwaNCFn4",
  authDomain: "atelier-fabien---stock.firebaseapp.com",
  projectId: "atelier-fabien---stock",
  storageBucket: "atelier-fabien---stock.firebasestorage.app",
  messagingSenderId: "406145797514",
  appId: "1:406145797514:web:48c2a2f81bdf7bc7d0cc73"
};

// Compte partagé utilisé par la connexion « code de l'atelier ».
// Le code saisi dans l'appli est le mot de passe de ce compte (6 caractères minimum).
// Ce compte se crée dans Firebase › Authentication › Utilisateurs ; l'adresse n'a pas besoin d'exister.
export const codeAccount = "atelier@atelier-stock.app";
