# Atelier — Stock pièces

Application web de gestion du stock de pièces détachées de l'atelier.

- Liste des pièces : référence, désignation, appareil, quantité, seuil mini, emplacement, note
- Entrées / sorties de stock en un clic, avec historique des mouvements
- Indicateurs : références en rupture, sous le seuil mini
- Export CSV et import JSON (`{ "pieces": [...] }`)

Fichier unique : `index.html`. Les données sont stockées par Claude : la page doit être ouverte depuis Claude pour lire et modifier le stock.
