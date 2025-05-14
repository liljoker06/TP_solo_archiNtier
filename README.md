# Reservation App – TP Architecture Logicielle & Clusters SGBD

## ✨ Description

Cette application permet la réservation de places pour des événements (concerts, expositions, conférences) avec un backend Node.js et un frontend Vite.js (React). Elle intègre un cluster MariaDB (Galera) pour assurer la haute disponibilité des données. Ce projet est réalisé dans le cadre d’un **TP éducatif en DevOps**.

## 🧠 Objectifs pédagogiques couverts

* Appliquer les principes **KISS**, **DDD**, **SOLID**, **TDD**
* Mettre en œuvre un **cluster MariaDB Galera** avec bascule automatique
* Créer une architecture modulaire propre (Clean Architecture)
* Utiliser **Docker** et **Docker Compose** pour orchestrer les services
* Valoriser des pratiques DevOps : logs, monitoring, conteneurisation

## 🧱 Architecture choisie

* **Monolithe modulaire** avec **Clean Architecture**
* Backend décomposé en : `config`, `controllers`, `models`, `routes`, `services`, `utils`
* Frontend décomposé en : `components`, `pages`, `routes`, `layouts`
* Navbar adaptée dynamiquement selon le rôle (user / admin)
* Déploiement via **Docker Compose** (frontend, backend, cluster DB)

## 🌐 Technologies

* **Frontend** : Vite.js + React + Tailwind CSS v4
* **Backend** : Node.js (Express), architecture modulaire
* **BDD** : MariaDB Galera Cluster (3 nœuds)
* **Conteneurisation** : Docker & Docker Compose
* **Logs** : `winston` avec date + niveau + emoji
* **Token** : Authentification JWT (avec rôles `user` et `admin`)

## 📁 Structure du projet

```
reservation-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── main.js
│   ├── sql/schema.sql
│   ├── .env
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── layouts/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── Dockerfile
│   └── package.json
├── docker/
│   └── docker-compose.yml
└── README.md
```

## 🚀 Lancement de l'application

1. Cloner le dépôt :

```bash
git clone <repo_url>
cd reservation-app
```

2. Lancer les conteneurs :

```bash
docker-compose -f docker/docker-compose.yml up --build
```

3. Accéder à l'application :

* Frontend : `http://localhost:5173`
* Backend : `http://localhost:3000`

## ✅ Fonctionnalités clés

* Authentification simulée avec JWT (connexion sans mot de passe)
* Rôle `admin` (création événements) vs `user` (réservation)
* Réservation avec vérification du nombre de places restantes
* Accès à ses propres réservations pour l'utilisateur
* Vue globale des réservations d'un événement pour l'admin
* Suppression de réservations par l'admin
* Navbar dynamique selon rôle connecté

## 🧲 Tests

* Tests unitaires backend (models / controllers)
* Tests d'intégration (API Express)
* Test du failover Galera (`docker stop` d'un nœud MariaDB)

## 📙 ADRs et documentation

* Tous les choix d’architecture sont documentés dans `/backend/docs/adr`
* Diaporama de présentation prévu pour la démo finale

## 🛠️ DevOps – Bonus

* Possibilité d’ajouter CI/CD avec GitHub Actions
* Logger customisé (`utils/logger.js`)
* Monitoring Docker ou Prometheus (optionnel)

---

Réalisé par : [**LILJOKER06**](https://github.com/liljoker06)
TP "Architecture logicielle & clusters SGBD" – **Projet DevOps**
Année 2024-2025
