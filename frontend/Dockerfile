# Utilise une image officielle Node.js
FROM node:18

# Dossier de travail
WORKDIR /app

# Ignore le cache npm s’il y a un changement dans les dépendances
COPY package*.json ./

# Installation des dépendances
RUN rm -rf node_modules && npm install

# Copie du reste du code
COPY . .

# Port exposé par Vite
EXPOSE 5173

# Lancement du serveur de dev
CMD ["npm", "run", "dev"]
