# OmniVox - Assistant Vocal Intelligent
OmniVox est un assistant vocal intelligent et multifonctionnel conçu pour interagir avec les utilisateurs via des commandes vocales. Il permet d'exécuter des tâches variées telles que la recherche de météo, la lecture de musique, l'envoi d'e-mails, et bien plus encore.

## Fonctionnalités
Reconnaissance et Synthèse Vocale : Utilisation de la Web Speech API pour comprendre et répondre aux commandes vocales.

### Intégration d'API Tiers :

Météo : Récupération des données météorologiques via OpenWeatherMap.

Musique : Recherche et lecture de musique via Spotify ou YouTube.

E-mails : Envoi d'e-mails via SendGrid ou Nodemailer.

Interface Utilisateur Moderne : Interface intuitive et réactive développée avec Vue.js.

Feedback Utilisateur : Boutons de satisfaction (Like/Dislike) pour recueillir les retours des utilisateurs.

Base de Données : Stockage des commandes vocales, des réponses, et des feedbacks dans une base de données (MySQL, PostgreSQL, ou SQLite).

### Technologies Utilisées
Frontend : Vue.js, Web Speech API

Backend : Node.js, Express.js

Base de Données : MySQL/PostgreSQL (avec Sequelize) ou MongoDB (avec Mongoose)

API Tiers : OpenWeatherMap, Spotify, SendGrid

Outils de Développement : Git, GitHub, Trello/Jira

Tests : Jest, Mocha

Déploiement : Vercel, Heroku, GitHub Actions

## Installation
Prérequis
Node.js (version 16 ou supérieure)

npm ou yarn

Un compte OpenWeatherMap, Spotify, et SendGrid (pour les API tiers)

Une base de données MySQL/PostgreSQL ou MongoDB

### Étapes
1. Cloner le dépôt :

```bash
git clone https://github.com/Lunasphys/OmniVox.git
cd omnivox
```

2. Installer les dépendances :

```bash
npm install
```
3. Configurer les variables d'environnement :
Créez un fichier .env à la racine du projet et ajoutez les variables suivantes :

```env
PORT=3000
DB_HOST=votre-hôte
DB_USER=votre-utilisateur
DB_PASSWORD=votre-mot-de-passe
DB_NAME=omnivox
OPENWEATHERMAP_API_KEY=votre-clé-api
SPOTIFY_CLIENT_ID=votre-client-id
SPOTIFY_CLIENT_SECRET=votre-client-secret
SENDGRID_API_KEY=votre-clé-api
```

4. Démarrer le serveur :

```bash
npm run dev
```

5. Accéder à l'application :
Ouvrez votre navigateur et accédez à http://localhost:5173.

## Utilisation
1. Démarrer l'écoute :

- Cliquez sur le bouton "Start Listening" pour activer la reconnaissance vocale.

- Parlez clairement pour que l'assistant puisse comprendre votre commande.

2. Exemples de commandes :

- "What's the weather in <em>city</em>?"

- "Search <em>song/artist</em> on Spotify."

- "Search <em>video/topic</em> on YouTube."

- "Send email to <em>recipient</em> with subject <em>subject</em> saying <em>message</em>."

### Feedback :

Après chaque réponse, utilisez les boutons "Like" (👍) ou "Dislike" (👎) pour donner votre avis.

Structure du Projet
```bash
OmniVox/
├── .bolt/
├── .idea/
├── .vscode/
├── backend/                      
│   ├── src/          
│   │   ├── controllers/         # Contrôleurs pour les routes
│   │   ├── model/              # Modèles de données pour la base de données
│   │   ├── routes/                 # Définition des routes
│   │   ├── services          # Services pour les API tiers 
│   │   ├── .env               # Variables d'environnement
│   │   ├── package.json       # Fichier de configuration npm
│   │   ├── package-lock.json   # Verrouillage des dépendances
│   │   ├── server.js       # Point d'entrée du serveur
│   │   ├── tsconfig.json  # Configuration TypeScript
│   │   ├── tsconfig.node.json   # Configuration TypeScript pour Node.js
│   │   ├── vite.config.ts        # Configuration Vite
│   └── └── vite-env.d.ts         # Types pour les variables d'environnement
├── frontend/
│   ├── src/      
│   │   ├── assets/               # Images, icônes, etc.
│   │   ├── components/             # Composants réutilisables
│   │   ├── composables/                 # Composables Vue 3
│   │   ├── handlers/                # Gestionnaires pour les événements
│   │   ├── utils/                # Fonctions utilitaires
│   │   ├── App.vue           # Composant racine
│   │   ├── main.ts         # Point d'entrée de l'application
│   │   └── styles.css       # Feuille de style globale
│   ├── index.html              # Fichier HTML principal
│   ├── package.json          # Fichier de configuration npm
│   ├── package-lock.json # Verrouillage des dépendances
│   ├── tsconfig.app.json  # Configuration TypeScript pour l'application
│   ├── vite.config.ts      # Configuration Vite
├── public/               
├── .gitignore                    # Fichiers ignorés par Git
├── package.json         # Fichier de configuration npm
├── package-lock.json     # Verrouillage des dépendances
└── README.md              # Documentation du projet
```

### Auteurs
JEHAM Laurie

MARTHELY Davy

### Liens associés
Trello : https://trello.com/b/Jguwmn69/hackhaton-2025

GitLab : https://gitlab.com/assistant-vocal1/charts/app-chart


### Remerciements
OpenWeatherMap pour l'API météo.

Spotify pour l'API musique.

SendGrid pour l'envoi d'e-mails.

Vue.js et Node.js pour leur écosystème incroyable.