# Architecture du Projet - CRM Immobilier

## Vue d'ensemble

Ce projet utilise une architecture modulaire en JavaScript vanilla, organisant le code en modules séparés pour faciliter la maintenance et l'évolutivité.

## Structure des Fichiers

### HTML (`index.html`)
- Point d'entrée unique de l'application
- Contient uniquement la structure HTML
- Référence les fichiers CSS et JavaScript externes

### CSS (`css/style.css`)
- Styles personnalisés et animations
- Règles CSS spécifiques (non couvertes par Tailwind)
- Styles pour les composants réutilisables (toast, scrollbar, file upload)

### JavaScript

#### Utilitaires (`js/utils.js`)
- **Utils** : Fonctions utilitaires (sélection d'éléments, formatage de dates, génération d'ID)
- **Storage** : Abstraction du LocalStorage avec préfixe `crm_`
- **revenueChart** : Variable globale pour le graphique Chart.js

#### Modules (`js/modules/`)

**auth.js** - Authentification
- Gestion de la connexion/déconnexion
- Protection des routes
- Affichage conditionnel de l'interface

**app.js** - Contrôleur Principal
- Initialisation de l'application
- Navigation entre les sections
- Coordination des modules

**client.js** - Gestion des Clients
- CRUD complet (Create, Read, Update, Delete)
- Formulaire modal pour création/édition
- Rendu de la liste des clients

**bien.js** - Gestion des Biens Immobiliers
- CRUD avec upload d'images
- Affichage en grille de cartes
- Conversion d'images en base64

**agent.js** - Gestion des Agents
- CRUD pour les agents immobiliers
- Affichage en cartes

**contrat.js** - Gestion des Contrats
- CRUD pour les contrats
- Tableau de données
- Calcul des revenus totaux

**rdv.js** - Gestion des Rendez-vous
- CRUD pour les rendez-vous
- Affichage en timeline

**analytics.js** - Statistiques et Graphiques
- Mise à jour des compteurs KPI
- Initialisation du graphique Chart.js
- Calculs de statistiques globales

#### Initialisation (`js/main.js`)
- Point d'entrée JavaScript
- Écoute de l'événement DOMContentLoaded
- Démarrage du module d'authentification

## Flux d'Exécution

1. **Chargement de la page** → `index.html`
2. **Chargement des ressources** → CSS, JavaScript (dans l'ordre)
3. **Initialisation** → `main.js` écoute `DOMContentLoaded`
4. **Authentification** → `auth.js` vérifie la session
5. **Application** → Si authentifié, `app.js` initialise tous les modules
6. **Modules** → Chaque module charge ses données depuis LocalStorage

## Principes de Design

### Modularité
- Chaque module est indépendant et encapsule sa propre logique
- Communication entre modules via des variables globales (à améliorer avec un système d'événements)

### Séparation des Préoccupations
- **HTML** : Structure
- **CSS** : Présentation
- **JavaScript** : Comportement et logique métier

### Stockage des Données
- Utilisation de LocalStorage pour la persistance
- Préfixe `crm_` pour éviter les conflits
- Données formatées en JSON

## Points d'Amélioration Future

1. **Système d'événements** : Implémenter un EventBus pour la communication entre modules
2. **Gestion d'état** : Centraliser la gestion d'état de l'application
3. **Validation** : Ajouter une couche de validation des données
4. **API Backend** : Remplacer LocalStorage par des appels API
5. **Tests** : Ajouter des tests unitaires pour chaque module
6. **Build System** : Ajouter un système de build (Webpack, Vite) pour la production

## Dépendances

### CDN Externes
- Tailwind CSS : Framework CSS utilitaire
- Chart.js : Bibliothèque de graphiques
- Font Awesome : Icônes

### Aucune dépendance npm
Le projet est entièrement autonome et ne nécessite pas d'installation de packages.

