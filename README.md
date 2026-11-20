# Atelier — Stock pièces

Application web de gestion du stock de pièces détachées de l'atelier.

- **Tableau de bord** : indicateurs (rupture, sous le seuil mini, mouvements sur 7 jours), liste « À commander » avec quantité suggérée, derniers mouvements
- **Pièces** : tableau complet (référence, désignation, machine, emplacement, quantité, seuil mini, état), filtres et entrées / sorties en un clic
- **Machines** : les pièces regroupées par machine, en cartes avec jauge quantité / seuil
- **Comptoir** : écran mobile pour saisir une sortie ou une entrée en quelques gestes (ouvert par défaut sur téléphone)
- **Historique** des mouvements
- Export CSV et import JSON (`{ "pieces": [...] }`)

La page est hébergée par GitHub Pages ; les données sont stockées dans Firebase (Firestore), avec connexion par e-mail et mot de passe.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | L'application |
| `firebase-store.js` | Connexion et accès à la base Firebase |
| `config.js` | Configuration de votre projet Firebase (à remplir) |
| `firestore.rules` | Règles de sécurité à coller dans la console Firebase |

## Mise en route (une seule fois)

### 1. Créer le projet Firebase
1. Aller sur https://console.firebase.google.com et cliquer sur **Créer un projet** (nom au choix, Google Analytics inutile).
2. Dans le projet, cliquer sur l'icône **Web `</>`** pour ajouter une application web, lui donner un nom, puis copier le bloc `firebaseConfig` affiché.
3. Coller ces valeurs dans `config.js` à la place des `A_REMPLIR`.

### 2. Activer la connexion
1. Menu **Authentication** › **Commencer** › onglet **Mode de connexion** › activer **Adresse e-mail/Mot de passe**.
2. Onglet **Utilisateurs** › **Ajouter un utilisateur** : votre e-mail et un mot de passe (une ligne par personne de l'atelier).
3. Onglet **Paramètres** › **Domaines autorisés** › **Ajouter un domaine** : `chief49.github.io`.

### 3. Créer la base de données
1. Menu **Firestore Database** › **Créer une base de données** › emplacement `eur3 (europe-west)` › **mode production**.
2. Onglet **Règles** : coller le contenu de `firestore.rules`, remplacer `votre.email@exemple.fr` par les e-mails autorisés, puis **Publier**.

### 4. Mettre la page en ligne
1. Sur GitHub : **Settings** › **Pages** › Source **Deploy from a branch** › branche `main`, dossier `/ (root)` › **Save**.
2. Après une minute, l'appli est disponible sur https://chief49.github.io/gestion-stock/

### 5. Importer le stock
Se connecter, puis cliquer sur **Importer un fichier JSON** en bas de la page. Seule la liste `pieces` du fichier est importée.

L'offre gratuite de Firebase (Spark) suffit largement pour un atelier.
