from pathlib import Path

root = Path(__file__).resolve().parent
path = root / 'frontend/lib/messages.js'
text = path.read_text()

old_fr = "    navbar: { products: 'Produits', categories: 'Catégories', favorites: 'Favoris', admin: 'Admin', settings: 'Réglages', logout: 'Déconnexion', login: 'Connexion', register: 'Inscription', profile: 'Profil' },"
new_fr = "    navbar: { home: 'Accueil', products: 'Produits', categories: 'Catégories', promotions: 'Promotions', favorites: 'Favoris', account: 'Mon compte', orders: 'Mes commandes', admin: 'Admin', settings: 'Réglages', logout: 'Déconnexion', login: 'Connexion', register: 'Inscription', profile: 'Profil', menu: 'Menu principal' },"

old_en = "    navbar: { products: 'Products', categories: 'Categories', favorites: 'Favorites', admin: 'Admin', settings: 'Settings', logout: 'Sign out', login: 'Login', register: 'Register', profile: 'Profile' },"
new_en = "    navbar: { home: 'Home', products: 'Products', categories: 'Categories', promotions: 'Promotions', favorites: 'Favorites', account: 'My account', orders: 'My orders', admin: 'Admin', settings: 'Settings', logout: 'Sign out', login: 'Login', register: 'Register', profile: 'Profile', menu: 'Main menu' },"

if old_fr not in text or old_en not in text:
    raise SystemExit('navbar block not found')

text = text.replace(old_fr, new_fr, 1)
text = text.replace(old_en, new_en, 1)
path.write_text(text)
