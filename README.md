# Nom du Projet (ex: MyManager - Gestion Hospitalière)

<!-- Mettez un court slogan ou une description en une phrase ici -->
> Application Backoffice de gestion réalisée dans le cadre du module Dévelopement web.

## 🔗 Liens Importants

<!-- REMPLACEZ LES LIENS CI-DESSOUS -->
- **APPLICATION DÉPLOYÉE (Live Demo) :** [CLIQUEZ ICI POUR VOIR LE SITE](https://)
- **Repository GitHub :** [Lien vers ce repo](https://)

---

## 👥 Membres de l'Équipe

**Nom du Groupe :** [G5]

| Prénom & Nom | Rôle / Tâches principales | Lien Github |
|--------------|---------------------------|-------------|
| charafeddine el qaraouy   | (ex: Dashboard, ChartJS)  | [@pseudo](https://github.com/pseudo) |
| elmoistafa errachidi   | (ex: CRUD Utilisateurs)   | [@pseudo](https://github.com/pseudo) |
| houssame wahid  | (ex: CSS, Responsive)     | [@pseudo](https://github.com/pseudo) |

---

## 📝 Thème Choisi
<!-- Indiquez le thème choisi parmi la liste ou votre sujet personnalisé -->
*   **Thème :** (ex: Gestion de Bibliothèque / Gestion Immobilière / Custom...)
*   **Description :** Une brève explication du but de l'application.

---

## ✅ État d'Avancement (Checklist)
<!-- Cochez les cases [x] pour les fonctionnalités terminées. Laissez [ ] pour ce qui n'est pas fait. -->

### Fonctionnalités Principales
- [ ] **CRUD 1 :** [Nom Entité, ex: Utilisateurs] (Create, Read, Update, Delete)
- [ ] **CRUD 2 :** [Nom Entité]
- [ ] **CRUD 3 :** [Nom Entité]
- [ ] **CRUD 4 :** [Nom Entité]
- [ ] **CRUD 5 :** [Nom Entité]
- [ ] **Recherche & Filtres** dans les tableaux
- [ ] **Pagination**

### Dashboard & Data
- [ ] **KPIs :** Cartes avec chiffres clés (Total utilisateurs, revenus, etc.)
- [ ] **Chart 1 :** [Type, ex: Pie Chart]
- [ ] **Chart 2 :** [Type, ex: Bar Chart]
- [ ] **Chart 3 :** [Type]
- [ ] **Chart 4 :** [Type]
- [ ] **Chart 5 :** [Type]

### Technique & Bonus
- [ ] **Export :** (PDF ou CSV)
- [ ] **Architecture :** Code organisé sans Framework (Vanilla JS)
- [ ] **Design :** Interface Responsive (Mobile/Tablette)

---

## 🛠 Stack Technique

*   **HTML5 / CSS3** (Framework CSS utilisé : Tailwind CSS)
*   **JavaScript (ES6+)** (Vanilla JS obligatoire)
*   **Bibliothèques JS utilisées :** Chart.js, Font Awesome, Tailwind CSS (CDN)

### APIs Utilisées
*   Source des données : LocalStorage (données stockées localement dans le navigateur)

## 📁 Architecture du Projet

Le projet est organisé selon une architecture modulaire claire :

```
agence_immobili-re/
├── index.html          # Point d'entrée principal (structure HTML)
├── css/
│   └── style.css       # Styles personnalisés et animations
├── js/
│   ├── utils.js        # Utilitaires et gestion du stockage (LocalStorage)
│   ├── main.js         # Script d'initialisation principal
│   └── modules/
│       ├── auth.js     # Module d'authentification
│       ├── app.js      # Contrôleur principal de l'application
│       ├── client.js   # Module CRUD pour les clients
│       ├── bien.js     # Module CRUD pour les biens immobiliers
│       ├── agent.js    # Module CRUD pour les agents
│       ├── contrat.js  # Module CRUD pour les contrats
│       ├── rdv.js      # Module CRUD pour les rendez-vous
│       └── analytics.js # Module de statistiques et graphiques
└── assets/             # Ressources statiques (images, etc.)
```

### Structure des Modules

- **utils.js** : Fonctions utilitaires partagées (génération d'ID, formatage, notifications toast)
- **Storage** : Gestion centralisée du LocalStorage
- **modules/auth.js** : Authentification et gestion de session
- **modules/app.js** : Navigation entre les sections et initialisation globale
- **modules/[entity].js** : Chaque module gère son propre CRUD et son rendu

---

## ⚙️ Installation Locale

Pour lancer le projet localement :

1.  Cloner le repo :
    ```bash
    git clone https://github.com/votre-user/votre-repo.git
    ```
2.  Ouvrir le dossier :
    ```bash
    cd votre-dossier
    ```
3.  Lancer l'application :
    *   Ouvrez simplement `index.html` dans votre navigateur.
    *   OU utilisez Live Server (VS Code Extension).

---

## 📸 Captures d'écran (Optionnel)
<!-- Vous pouvez ajouter ici 1 ou 2 screenshots de votre interface -->
