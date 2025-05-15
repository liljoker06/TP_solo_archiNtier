# Reservation App – TP Architecture logicielle & clusters SGBD

## ✨ Description du projet

Cette application permet la réservation de places pour des événements (concerts, conférences, expositions) dans un domaine fonctionnel simple mais avec une contrainte métier forte : la gestion en temps réel du taux de remplissage des événements. Le backend est développé en Node.js avec Express, et le frontend en React (Vite.js). La base de données MariaDB est configurée en cluster Galera pour assurer la haute disponibilité et la résilience des données.

---

## 📌 Contexte et exigences du TP

* Créer une application de réservation de places pour des événements ou domaine équivalent.
* Intégrer une contrainte métier rendant le projet intéressant d’un point de vue architectural (ex : mise à jour temps-réel du taux de remplissage).
* Mettre en cluster MariaDB (Galera) pour la haute disponibilité.
* Aucune architecture imposée, il faut justifier son choix.

---

## 🧠 Objectifs pédagogiques

| Thème                | Ce que l’on attend                                                                 |
| -------------------- | ---------------------------------------------------------------------------------- |
| Choix d’architecture | Définir et argumenter la solution (diagrammes, compromis, limites)                 |
| KISS                 | Contrôler la complexité (code clair, cyclomatic complexity raisonnable)            |
| DDD                  | Définir bounded-contexts, agrégats, événements de domaine, vocabulaire ubiquitaire |
| TDD                  | Pratiquer tests d’acceptation, unitaires, contrats si pertinent                    |
| SOLID                | Montrer la concrétisation dans au moins un volet du projet                         |
| Clusters DB          | Mettre en place cluster MariaDB (Galera), valider la haute dispo (tests failover)  |

---

## 🛡️ Architecture choisie

Nous avons choisi d'utiliser **exclusivement la Clean Architecture** pour structurer l'ensemble du backend. Ce choix permet une organisation claire, une forte testabilité, ainsi qu'une facilité de maintenance et d'évolution.

### 🔧 Principes appliqués

* **KISS** : chaque module reste simple et orienté vers une unique responsabilité.
* **DDD** : les entités et cas d'usage sont regroupés par contexte métier.
* **SOLID** : architecture modulaire avec découplage fort entre les couches.
* **TDD** : les tests sont écrits dès la définition des comportements attendus.

### 📚 Organisation Clean Architecture

* **Domain** : entités métier pures, sans dépendances techniques.
* **Application** : cas d'usage métier (ex : créer une réservation, vérifier disponibilité).
* **Infrastructure** : interactions techniques (base de données, JWT, etc.).
* **Interface / Controllers** : API HTTP (Express) et validation des entrées.

Cette architecture favorise une haute cohésion interne et une faible couplage entre modules. Elle est idéale pour un projet évolutif avec des contraintes de résilience, comme l'utilisation d'un cluster MariaDB Galera.

---

## 📁 Structure du projet

Voici l'organisation des fichiers côté frontend et backend :

```
TP_SOLO_ARCHINTIER/
├── backend/
│   ├── logs/
│   ├── node_modules/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── sql/
│   │   ├── utils/
│   │   └── main.js
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   ├── package.json
│   └── package-lock.json
```

---

## 🖼️ Diagrammes d'architecture et de séquence

### 📌 Diagramme d'architecture

![Diagramme Architecture](./images/diagrame_sequence.png)

### 🔄 Diagramme de séquence (réservation)

![Diagramme Séquence](./images/schema.png)

---

## 🚀 Lancement de l'application

1. **Cloner le dépôt** :

```bash
git clone <url_du_repo>
cd TP_SOLO_ARCHINTIER
```

2. **Configurer les fichiers `.env`** :

   * Créez un fichier `.env` dans `backend/` et `frontend/` avec les variables nécessaires (ports, URL API, secrets JWT, etc.)

3. **Installer les dépendances** :

```bash
cd backend
npm install
cd ../frontend
npm install
```

4. **Démarrer le backend** :

```bash
cd backend
npm run dev
```

5. **Démarrer le frontend** :

```bash
cd frontend
npm run dev
```

6. **Accéder à l'application** :

* Frontend : [http://localhost:5173](http://localhost:5173)
* Backend : [http://localhost:3000](http://localhost:3000)

---

## 📸 Aperçu de l'application

Voici un cas d'utilisation présenté sous forme de mini tutoriel illustré avec des captures d'écran pour guider l'utilisateur dans le parcours classique de l'application.

1. **Connexion à l'application**

   * L'utilisateur accède à la page de connexion.
   * Il entre simplement son nom d'utilisateur pour se connecter (pas de mot de passe).
   * ![Connexion](./images/screen_connexion.png)

2. **Interface utilisateur (user)**

   * Une fois connecté, l'utilisateur voit la liste des événements disponibles avec les places restantes.
   * Il peut cliquer sur "Réserver" pour participer à un événement.
   * ![Interface Utilisateur](./images/screen_user_home.png)

3. **Réservation d’un événement**

   * Après avoir cliqué sur un événement, l’utilisateur accède à la fiche détaillée de l’événement.
   * Il peut y confirmer sa réservation (si des places sont encore disponibles).
   * ![Réservation](./images/screen_event_detail.png)

4. **Interface administrateur (admin)**

   * Un administrateur accède à une interface différente après connexion.
   * Il peut créer de nouveaux événements et voir le taux de remplissage.
   * ![Interface Admin](./images/screen_admin_dashboard.png)

5. **Liste des réservations (admin)**

   * L'administrateur peut également voir toutes les réservations effectuées sur un événement spécifique.
   * ![Liste Réservations](./images/screen_admin_reservations.png)

---

## 📌 Auteur

Réalisé par **LILJOKER06** – TP "Architecture logicielle & clusters SGBD" – 2024–2025
