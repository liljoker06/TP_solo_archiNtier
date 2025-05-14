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
* Découpé en modules : `Event`, `Reservation`, `User`, etc.
* Déploiement via **Docker Compose** (frontend, backend, cluster DB)

## 🌐 Technologies

* **Frontend** : Vite.js + React
* **Backend** : Node.js (Express ou Clean Arch modulaire)
* **BDD** : MariaDB Galera Cluster (3 nœuds)
* **Conteneurisation** : Docker & Docker Compose
* (Optionnel) **CI/CD** : GitHub Actions ou scripts Bash

## 📁 Structure du projet

```
reservation-app/
├── backend/
│   ├── src/
│   │   ├── domain/
│   │   ├── use_cases/
│   │   ├── infrastructure/
│   │   ├── interfaces/
│   │   └── config/
│   └── main.js
├── frontend/
│   ├── src/
│   └── vite.config.js
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

* Réservation de places avec vérification transactionnelle
* Taux de remplissage mis à jour en temps réel
* Tarification dynamique possible (module futur)
* Tolérance aux pannes : cluster Galera avec test de bascule

## 🧪 Tests

* Tests unitaires sur les couches `domain` et `use_cases`
* Tests d’intégration backend
* Test du failover MariaDB (via `docker stop` sur un nœud)

## 📚 ADRs et documentation

* Tous les choix d’architecture sont documentés dans `/backend/docs/adr`
* Diaporama de présentation prévu pour la démo finale

## 🧰 DevOps – Bonus

* Possibilité d’ajouter un script CI/CD (GitHub Actions, Bash)
* Suivi des logs avec `pino` ou `winston`
* Monitoring Docker ou Prometheus (facultatif mais valorisable)

---

Réalisé par : [**LILJOKER06**](https://github.com/liljoker06)
TP "Architecture logicielle & clusters SGBD" – **Projet DevOps**
Année 2024-2025
