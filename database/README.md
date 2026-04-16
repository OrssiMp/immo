# Database Folder

Ce dossier contient les fichiers de données JSON pour l'application ImmoCool.

## Fichiers

- `contacts.json` : Base de données locale des contacts du formulaire
- Les fichiers individuels de contacts sont téléchargés automatiquement dans le dossier "Téléchargements" de l'utilisateur

## Structure des données

### Contact
```json
{
  "id": 1234567890,
  "timestamp": "2026-04-16T01:05:00.000Z",
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Sujet du message",
  "message": "Contenu du message"
}
```

## Gestion

Les données sont gérées par le module `src/scripts/contactdata.js` qui utilise :
- localStorage pour la persistance des données
- Téléchargement automatique des fichiers JSON pour chaque contact
- Fonctionnalités d'import/export

## Sauvegarde

- Les données sont sauvegardées automatiquement dans localStorage
- Chaque contact génère un fichier JSON téléchargé localement
- Possibilité d'exporter tous les contacts en un seul fichier
