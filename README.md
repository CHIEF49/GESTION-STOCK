# Atelier — Stock pièces

Application web de gestion du stock de pièces détachées de l'atelier.

- **Tableau de bord** : indicateurs (rupture, sous le seuil mini, mouvements sur 7 jours), liste « À commander » avec quantité suggérée, derniers mouvements
- **Pièces** : tableau complet (référence, désignation, machine, emplacement, quantité, seuil mini, état), filtres et entrées / sorties en un clic
- **Machines** : les pièces regroupées par machine, en cartes avec jauge quantité / seuil
- **Comptoir** : écran mobile pour saisir une sortie ou une entrée en quelques gestes (ouvert par défaut sur téléphone)
- **Historique** des mouvements
- Export CSV et import JSON (`{ "pieces": [...] }`)

Fichier unique : `index.html`. Les données sont stockées par Claude : la page doit être ouverte depuis Claude pour lire et modifier le stock.
