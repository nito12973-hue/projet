# VentePro - Plateforme E-commerce moderne

VentePro est une base professionnelle complète pour une application web e-commerce moderne avec :

- **Frontend**: Next.js + React + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Base de données**: MongoDB Atlas
- **Authentification**: JWT + cookies HTTP-only + bcrypt
- **Emails**: Nodemailer
- **Images**: Cloudinary
- **Sécurité**: Helmet, rate limiting, validation, CSRF, sanitization

---

## 1. Structure du projet

```text
/
├── frontend/
│   ├── app/              # App Router Next.js moderne
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── layouts/
│   ├── styles/
│   └── services/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   └── server.js
└── README.md
```

---

## 2. Fonctionnalités incluses

### Utilisateur
- création de compte
- confirmation email
- validation finale par admin
- connexion sécurisée
- profil utilisateur
- favoris
- panier
- historique commandes
- recherche produits
- filtres et pagination
- fiche produit
- récupération du mot de passe

### Administrateur
- dashboard moderne
- statistiques ventes
- commandes récentes
- gestion produits
- gestion utilisateurs
- validation/refus comptes
- gestion catégories
- gestion commandes
- gestion stock

### UX / UI
- dark mode / light mode
- responsive mobile / tablette / desktop
- skeleton loading
- cartes produits modernes
- navigation fluide
- interface premium

### Sécurité
- mots de passe hashés
- JWT
- cookies HTTP-only
- protections routes
- validation données
- Helmet
- rate limiting
- anti NoSQL injection
- HPP
- CSRF
- logs serveur

---

## 3. Installation locale

### Prérequis

- Node.js 18+
- npm 9+
- compte MongoDB Atlas
- compte Cloudinary
- SMTP (Gmail App Password ou autre)

### Étapes

1. Installer Node.js: https://nodejs.org/
2. Copier les fichiers d'environnement :
   - `backend/.env.example` -> `backend/.env`
   - `frontend/.env.example` -> `frontend/.env.local`
3. Installer les dépendances à la racine :

```bash
npm install
```

4. Lancer le frontend :

```bash
npm run dev:frontend
```

5. Lancer le backend dans un second terminal :

```bash
npm run dev:backend
```

6. Ouvrir :
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000/api/health`

---

## 4. Variables d'environnement

### Frontend

`frontend/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend

`backend/.env`

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=...
CLIENT_URL=http://localhost:3000
JWT_SECRET=...
JWT_EXPIRES_IN=7d
SMTP_HOST=...
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
EMAIL_FROM=VentePro <no-reply@ventepro.com>
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

---

## 5. Fonctionnement métier

### Inscription / validation
1. l'utilisateur crée son compte
2. le backend génère un `verificationToken`
3. un email de confirmation est envoyé
4. l'utilisateur clique sur le lien
5. le compte devient **verified**
6. l'admin approuve ou refuse le compte
7. si approuvé, l'utilisateur peut se connecter

### Connexion
- vérification email obligatoire
- validation admin obligatoire
- JWT généré et stocké dans cookie HTTP-only

### Commande
- le panier envoie une liste d'articles
- le backend vérifie le stock
- le stock diminue automatiquement
- la commande est enregistrée avec total et statut

### Avis
- un utilisateur connecté peut noter un produit
- la note moyenne du produit est recalculée

---

## 6. API principale

### Auth
- `POST /api/auth/register`
- `GET /api/auth/verify-email/:token`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password/:token`
- `GET /api/auth/me`

### Produits
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products` *(admin)*
- `PUT /api/products/:id` *(admin)*
- `DELETE /api/products/:id` *(admin)*

### Catégories
- `GET /api/categories`
- `POST /api/categories` *(admin)*
- `DELETE /api/categories/:id` *(admin)*

### Commandes
- `POST /api/orders`
- `GET /api/orders/mine`
- `GET /api/orders/:id`

### Utilisateur
- `GET /api/users/profile`
- `PUT /api/users/profile`
- `GET /api/users/favorites`
- `POST /api/users/favorites/:productId`

### Admin
- `GET /api/admin/dashboard`
- `GET /api/admin/users`
- `PATCH /api/admin/users/:id/review`
- `GET /api/admin/orders`

### Sécurité
- `GET /api/security/csrf-token`

---

## 7. Déploiement gratuit

## Frontend sur Vercel

1. Créer un compte sur https://vercel.com/
2. Importer le dépôt GitHub
3. Définir le **Root Directory** sur `frontend`
4. Ajouter la variable :
   - `NEXT_PUBLIC_API_URL=https://ton-backend.onrender.com/api`
5. Déployer
6. Vercel fournit un lien public, par exemple :
   - `https://ventepro.vercel.app`

## Backend sur Render

1. Créer un compte sur https://render.com/
2. Créer un **Web Service**
3. Connecter le dépôt GitHub
4. Définir le **Root Directory** sur `backend`
5. Build command :

```bash
npm install
```

6. Start command :

```bash
npm start
```

7. Ajouter les variables d’environnement du backend
8. Déployer
9. Render fournit une URL publique, par exemple :
   - `https://ventepro-api.onrender.com`

## MongoDB Atlas

1. Créer un cluster gratuit sur https://www.mongodb.com/atlas
2. Créer un utilisateur base de données
3. Autoriser les IP `0.0.0.0/0` pour les tests
4. Copier l’URI de connexion
5. La placer dans `MONGODB_URI`

## Cloudinary

1. Créer un compte gratuit sur https://cloudinary.com/
2. Récupérer :
   - cloud name
   - api key
   - api secret
3. Les placer dans les variables backend

---

## 8. Mise en production recommandée

- frontend sur **Vercel**
- backend sur **Render**
- DB sur **MongoDB Atlas**
- images sur **Cloudinary**

Cette combinaison permet d'obtenir un **lien public gratuit** sans serveur payant au départ.

---

## 9. Création du premier administrateur

Après inscription d'un premier utilisateur, tu peux le promouvoir admin directement dans MongoDB Atlas :

```js
role: "admin",
approvalStatus: "approved",
verified: true
```

Ensuite il pourra accéder au dashboard admin.

---

## 10. Commandes utiles

Depuis la racine :

```bash
npm run dev:frontend
npm run dev:backend
npm run build:frontend
npm run lint:frontend
```

---

## 11. Remarque importante

Dans cet environnement de travail, **Node.js n'était pas installé**, donc les dépendances n'ont pas pu être réellement téléchargées et les tests n'ont pas pu être exécutés ici.

Le code du projet, la structure, l'architecture et la documentation sont en place. Dès que Node.js est installé sur ta machine, tu pourras :

1. lancer `npm install`
2. démarrer le frontend et le backend
3. connecter MongoDB Atlas, Cloudinary et SMTP
4. déployer publiquement sur Vercel + Render
