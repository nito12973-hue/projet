export const demoProducts = [
  {
    _id: 'p1',
    name: 'Écouteurs Bluetooth Teranga',
    description: 'Écouteurs sans fil avec autonomie longue durée, appels nets et étui compact pour les trajets urbains.',
    price: 22000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    category: { name: 'Électronique', slug: 'electronique' },
    stock: 18,
    rating: 4.8,
    reviewsCount: 124,
    featured: true
  },
  {
    _id: 'p2',
    name: 'Sandales Dakar Confort',
    description: 'Sandales légères et résistantes, idéales pour la marche quotidienne avec finition soignée.',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    category: { name: 'Mode', slug: 'mode' },
    stock: 25,
    rating: 4.6,
    reviewsCount: 87,
    featured: true
  },
  {
    _id: 'p3',
    name: 'Lampe Solaire Sine',
    description: 'Lampe rechargeable pratique pour la maison, l’éclairage d’appoint et les coupures ponctuelles.',
    price: 14500,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    category: { name: 'Maison', slug: 'maison' },
    stock: 11,
    rating: 4.7,
    reviewsCount: 49,
    featured: false
  },
  {
    _id: 'p4',
    name: 'Sac de voyage Thiès Premium',
    description: 'Sac robuste pour déplacements, week-end et transport quotidien avec plusieurs compartiments.',
    price: 26500,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
    category: { name: 'Accessoires', slug: 'accessoires' },
    stock: 32,
    rating: 4.5,
    reviewsCount: 63,
    featured: false
  }
];

export const demoStats = {
  totalSales: 12450000,
  totalUsers: 312,
  totalProducts: 48,
  totalOrders: 196,
  recentOrders: [
    { _id: 'o1', customer: 'Aïcha Diallo', totalPrice: 43000, status: 'paid', createdAt: '2026-03-08' },
    { _id: 'o2', customer: 'Moussa Ndiaye', totalPrice: 22000, status: 'processing', createdAt: '2026-03-08' },
    { _id: 'o3', customer: 'Mariam Koné', totalPrice: 61000, status: 'shipped', createdAt: '2026-03-07' }
  ]
};

export const demoCategories = ['Mode', 'Électronique', 'Maison', 'Accessoires'];

export const demoUsers = [
  { _id: 'u1', name: 'Aïcha Diallo', email: 'aicha@example.com', verified: true, approvalStatus: 'approved', role: 'user' },
  { _id: 'u2', name: 'Moussa Traoré', email: 'moussa@example.com', verified: true, approvalStatus: 'pending', role: 'user' },
  { _id: 'u3', name: 'Admin SunuMarket', email: 'admin@sunumarket.sn', verified: true, approvalStatus: 'approved', role: 'admin' }
];

export const demoOrders = [
  {
    _id: 'ord-001',
    customer: 'Aïcha Diallo',
    totalPrice: 43000,
    status: 'paid',
    createdAt: '2026-03-08',
    paymentMethod: 'cash_on_delivery',
    deliveryCity: 'Dakar',
    deliveryAddress: 'Sacré-Cœur 3, près du rond-point',
    phone: '77 123 45 67',
    items: ['Écouteurs Bluetooth Teranga', 'Sac de voyage Thiès Premium']
  },
  {
    _id: 'ord-002',
    customer: 'Moussa Ndiaye',
    totalPrice: 22000,
    status: 'processing',
    createdAt: '2026-03-08',
    paymentMethod: 'wave',
    deliveryCity: 'Thiès',
    deliveryAddress: 'Grand Standing, en face du marché',
    phone: '76 555 11 22',
    items: ['Écouteurs Bluetooth Teranga']
  },
  {
    _id: 'ord-003',
    customer: 'Mariam Koné',
    totalPrice: 61000,
    status: 'shipped',
    createdAt: '2026-03-07',
    paymentMethod: 'orange_money',
    deliveryCity: 'Saint-Louis',
    deliveryAddress: 'Sor, près de la station',
    phone: '78 888 99 00',
    items: ['Sandales Dakar Confort', 'Lampe Solaire Sine', 'Sac de voyage Thiès Premium']
  }
];
