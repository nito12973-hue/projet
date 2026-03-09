export const demoProducts = [
  {
    _id: 'p1',
    name: 'Aurora Headphones Pro',
    description: 'Casque premium avec réduction de bruit, autonomie 40h et finition aluminium.',
    price: 249,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    category: { name: 'Audio', slug: 'audio' },
    stock: 18,
    rating: 4.8,
    reviewsCount: 124,
    featured: true
  },
  {
    _id: 'p2',
    name: 'Nova Smart Watch',
    description: 'Montre connectée élégante avec suivi santé, GPS et notifications temps réel.',
    price: 189,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    category: { name: 'Wearables', slug: 'wearables' },
    stock: 25,
    rating: 4.6,
    reviewsCount: 87,
    featured: true
  },
  {
    _id: 'p3',
    name: 'Studio Lamp S1',
    description: 'Lampe design minimaliste avec intensité réglable et finition premium.',
    price: 129,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    category: { name: 'Maison', slug: 'maison' },
    stock: 11,
    rating: 4.7,
    reviewsCount: 49,
    featured: false
  },
  {
    _id: 'p4',
    name: 'Motion Backpack',
    description: 'Sac urbain résistant, compartiment ordinateur et charge USB intégrée.',
    price: 99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    category: { name: 'Lifestyle', slug: 'lifestyle' },
    stock: 32,
    rating: 4.5,
    reviewsCount: 63,
    featured: false
  }
];

export const demoStats = {
  totalSales: 12450,
  totalUsers: 312,
  totalProducts: 48,
  totalOrders: 196,
  recentOrders: [
    { _id: 'o1', customer: 'Aïcha Diallo', totalPrice: 329, status: 'paid', createdAt: '2026-03-08' },
    { _id: 'o2', customer: 'Jean Martin', totalPrice: 189, status: 'processing', createdAt: '2026-03-08' },
    { _id: 'o3', customer: 'Mariam Koné', totalPrice: 549, status: 'shipped', createdAt: '2026-03-07' }
  ]
};

export const demoCategories = ['Audio', 'Wearables', 'Maison', 'Lifestyle'];

export const demoUsers = [
  { _id: 'u1', name: 'Aïcha Diallo', email: 'aicha@example.com', verified: true, approvalStatus: 'approved', role: 'user' },
  { _id: 'u2', name: 'Moussa Traoré', email: 'moussa@example.com', verified: true, approvalStatus: 'pending', role: 'user' },
  { _id: 'u3', name: 'Admin Vente', email: 'admin@ventepro.com', verified: true, approvalStatus: 'approved', role: 'admin' }
];

export const demoOrders = [
  {
    _id: 'ord-001',
    customer: 'Aïcha Diallo',
    totalPrice: 329,
    status: 'paid',
    createdAt: '2026-03-08',
    items: ['Aurora Headphones Pro', 'Motion Backpack']
  },
  {
    _id: 'ord-002',
    customer: 'Jean Martin',
    totalPrice: 189,
    status: 'processing',
    createdAt: '2026-03-08',
    items: ['Nova Smart Watch']
  },
  {
    _id: 'ord-003',
    customer: 'Mariam Koné',
    totalPrice: 549,
    status: 'shipped',
    createdAt: '2026-03-07',
    items: ['Aurora Headphones Pro', 'Studio Lamp S1', 'Motion Backpack']
  }
];
