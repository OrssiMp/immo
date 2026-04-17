## Technologies utilisées

### Frontend

- HTML5 sémantique
- TailwindCSS pour le style
- JavaScript ES6+ avec modules
- SweetAlert2 pour les notifications
- Bootstrap Icons pour les icônes

### Backend

- Node.js avec serveur HTTP natif
- Gestion des fichiers statiques

### Fonctionnalités techniques

- Design responsive (mobile-first)
- Animations CSS fluides
- Validation de formulaire en temps réel
- Navigation fluide avec ancrages
- Barre de navigation fixe avec effet blur

## Structure du projet

```
immo/
|-- src/
|   |-- assets/
|   |   |-- images/
|   |-- scripts/ dans le dossier  future
|   |   |-- FileManager.js
|   |   |-- helpers.js
|   |   |-- contactdata.js
|   |-- style/
|   |   |-- output.css
|   |   |-- animations.css  # contient toutes les animations
|   |   |-- components.css  # contient tous les composants réutilisables
|-- index.html          # Page principale
|-- main.js             # Logique JavaScript principale
|-- server.js           # Serveur Node.js/ en développement

```

## Installation et démarrage

### Prérequis

- Node.js (version 14 ou supérieure)
- npm (gestionnaire de paquets)

### Installation

1. Clonez le repository :

```bash
git clone [repository-url]
cd immo
```

2. Démarrez le live serveur

## Architecture des dossiers ignorés

### .dev/

**Rôle :** Environnement de développement et expérimentation  
**Contenu :** Fonctionnalités en cours de développement et de test  
**Utilité :**

- Prototypage de nouvelles fonctionnalités
- Tests unitaires et intégration
- Code en phase d'évaluation et de jugement
- Scripts temporaires pour le débogage
- Fonctionnalités non prêtes pour la production

### future/

**Rôle :** Scripts et composants planifiés pour les prochaines versions  
**Contenu :** Fonctionnalités validées mais en attente d'intégration  
**Utilité :**

- Scripts prêts mais nécessitant des conditions préalables
- Composants en attente de validation finale
- Fonctionnalités dépendantes d'autres développements
- Code optimisé en attente de déploiement
- Nouvelles architectures et patterns

### database/

**Rôle :** Gestion des données et persistence  
**Contenu :** Fichiers de configuration de base de données  
**Utilité :**

- Schémas de données
- Configurations de connexion
- Scripts de migration
- Données de test et développement
- Sauvegardes et exports

### .env

**Rôle :** Variables d'environnement et configuration sensible  
**Contenu :** Clés API, URLs de services, configurations locales  
**Utilité :**

- Protection des données sensibles
- Configuration spécifique à l'environnement
- Variables de déploiement
- Clés d'API externes

### old/

**Rôle :** Archives et versions précédentes  
**Contenu :** Anciens fichiers et versions dépréciées  
**Utilité :**

- Référence pour les rollbacks
- Historique du développement
- Code de comparaison
- Sauvegarde avant refactoring

### .DS_Store

**Rôle :** Fichiers système macOS (automatique)  
**Contenu :** Métadonnées du Finder macOS  
**Utilité :** Aucune - ignoré automatiquement

## Situation de dedéveloppement

Immocool est en cours de développement certains fonctionnalités sont encore en cas d'étude et passe une sous une analyse afin d'en tirer meilleur partie , d'où la préscence d'un dossier .dev ignorer pour qui contient les fonctionnalités qui sont en développement et en jugement et un dossier future qui contient les futures scripts à intégrer après que certaines conditions soient remplies
