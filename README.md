# Agence Immobilière - Gestion d'Agence Immobilière

> Application Backoffice de gestion réalisée dans le cadre du module Développement web

## 🔗 Liens Importants

- **APPLICATION DÉPLOYÉE (Live Demo) :https://charafeddiine.github.io/agence_immobili-re/
- **Repository GitHub :** [Lien vers ce repo](https://github.com/charafeddiine/agence_immobili-re.git)

---

## 👥 Membres de l'Équipe

**Nom du Groupe :** G5

| Prénom & Nom | Rôle / Tâches principales | Lien Github |
|--------------|---------------------------|-------------|
| Charafeddine El Qaraouy | Dashboard, Analytics, Architecture | [@charafeddiine](https://github.com/charafeddiine) |
| Elmoistafa Errachidi | CRUD Biens, Contrats, Rendez-vous | [@pseudo](https://github.com/pseudo) |
| Houssame Wahid | CRUD Clients, Agents, CSS, Responsive | [@pseudo](https://github.com/pseudo) |

---

## 📝 Thème Choisi
*   **Thème :** Gestion Immobilière
*   **Description :** Application de gestion d'agence immobilière permettant de gérer les clients, biens immobiliers, agents, contrats et rendez-vous avec un dashboard analytique.

---

## ✅ État d'Avancement (Checklist)

### Fonctionnalités Principales
- [x] **CRUD 1 :** Clients (Create, Read, Update, Delete)
- [x] **CRUD 2 :** Biens Immobiliers
- [x] **CRUD 3 :** Agents
- [x] **CRUD 4 :** Contrats
- [x] **CRUD 5 :** Rendez-vous
- [x] **Recherche & Filtres** dans les tableaux
- [ ] **Pagination**

### Dashboard & Data
- [x] **KPIs :** Cartes avec chiffres clés (Total clients, biens, contrats, etc.)
- [x] **Chart 1 :** Bar Chart (Répartition des statuts clients)
- [x] **Chart 2 :** Pie Chart (Types de biens)
- [x] **Chart 3 :** Line Chart (Évolution des contrats)
- [x] **Chart 4 :** Doughnut Chart (Statuts des biens)
- [x] **Chart 5 :** Bar Chart (Rendez-vous par mois)

### Technique & Bonus
- [ ] **Export :** (PDF ou CSV)
- [x] **Architecture :** Code organisé sans Framework (Vanilla JS)
- [x] **Design :** Interface Responsive (Mobile/Tablette)

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
    git clone https://github.com/charafeddiine/agence_immobili-re.git
    ```
2.  Ouvrir le dossier :
    ```bash
    cd agence_immobili-re
    ```
3.  Lancer l'application :
    *   Ouvrez simplement `index.html` dans votre navigateur.
    *   OU utilisez Live Server (VS Code Extension).

---

## 📸 Captures d'écran (Optionnel)
<!-- Vous pouvez ajouter ici 1 ou 2 screenshots de votre interface -->
