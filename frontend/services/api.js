import { demoCategories, demoOrders, demoProducts, demoStats, demoUsers } from '@/services/demo-data';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
let csrfTokenCache = null;

async function ensureCsrfToken() {
  if (csrfTokenCache) return csrfTokenCache;
  const response = await fetch(`${API_URL}/security/csrf-token`, { credentials: 'include', cache: 'no-store' });
  if (!response.ok) throw new Error('Impossible de sécuriser la requête.');
  const data = await response.json();
  csrfTokenCache = data.csrfToken;
  return csrfTokenCache;
}

async function fetchJson(path, options = {}) {
  const method = options.method || 'GET';
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (!['GET', 'HEAD', 'OPTIONS'].includes(method)) {
    headers['x-csrf-token'] = await ensureCsrfToken();
  }

  const response = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    cache: 'no-store',
    headers,
    ...options
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Une erreur est survenue.' }));
    throw new Error(error.message || 'Une erreur est survenue.');
  }

  return response.json();
}

export async function getProducts() {
  try {
    const data = await fetchJson('/products');
    return data.products || [];
  } catch {
    return demoProducts;
  }
}

export async function getCurrentUser() {
  try {
    const data = await fetchJson('/auth/me');
    return data.user || null;
  } catch {
    return null;
  }
}

export async function getProductById(id) {
  const data = await getProductDetails(id);
  return data.product;
}

export async function getProductDetails(id) {
  try {
    const data = await fetchJson(`/products/${id}`);
    return { product: data.product, reviews: data.reviews || [] };
  } catch {
    return {
      product: demoProducts.find((product) => product._id === id) || demoProducts[0],
      reviews: []
    };
  }
}

export async function getCategories() {
  try {
    const data = await fetchJson('/categories');
    return data.categories || [];
  } catch {
    return demoCategories.map((name) => ({ name, slug: name.toLowerCase() }));
  }
}

export async function createCategory(payload) {
  return fetchJson('/categories', { method: 'POST', body: JSON.stringify(payload) });
}

export async function uploadProductImage(file) {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`${API_URL}/upload/image`, {
    method: 'POST',
    credentials: 'include',
    cache: 'no-store',
    headers: { 'x-csrf-token': await ensureCsrfToken() },
    body: formData
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Téléversement impossible.' }));
    throw new Error(error.message || 'Téléversement impossible.');
  }

  return response.json();
}

export async function createProduct(payload) {
  return fetchJson('/products', { method: 'POST', body: JSON.stringify(payload) });
}

export async function updateProduct(productId, payload) {
  return fetchJson(`/products/${productId}`, { method: 'PUT', body: JSON.stringify(payload) });
}

export async function deleteProduct(productId) {
  return fetchJson(`/products/${productId}`, { method: 'DELETE' });
}

export async function getDashboardStats() {
  try {
    return await fetchJson('/admin/dashboard');
  } catch {
    return demoStats;
  }
}

export async function getOrders() {
  try {
    const data = await fetchJson('/admin/orders');
    return data.orders || [];
  } catch {
    return demoOrders;
  }
}

export async function getUsers() {
  try {
    const data = await fetchJson('/admin/users');
    return data.users || [];
  } catch {
    return demoUsers;
  }
}

export async function reviewUser(userId, approvalStatus) {
  return fetchJson(`/admin/users/${userId}/review`, {
    method: 'PATCH',
    body: JSON.stringify({ approvalStatus })
  });
}

export async function registerUser(payload) {
  return fetchJson('/auth/register', { method: 'POST', body: JSON.stringify(payload) });
}

export async function loginUser(payload) {
  return fetchJson('/auth/login', { method: 'POST', body: JSON.stringify(payload) });
}

export async function logoutUser() {
  return fetchJson('/auth/logout', { method: 'POST' });
}

export async function updateProfile(payload) {
  return fetchJson('/users/profile', { method: 'PUT', body: JSON.stringify(payload) });
}

export async function verifyEmail(token) {
  return fetchJson(`/auth/verify-email/${token}`);
}

export async function requestPasswordReset(payload) {
  return fetchJson('/auth/forgot-password', { method: 'POST', body: JSON.stringify(payload) });
}

export async function resetPassword(token, payload) {
  return fetchJson(`/auth/reset-password/${token}`, { method: 'POST', body: JSON.stringify(payload) });
}

export async function getMyOrders() {
  try {
    const data = await fetchJson('/orders/mine');
    return data.orders || [];
  } catch {
    return demoOrders;
  }
}

export async function createOrder(payload) {
  return fetchJson('/orders', { method: 'POST', body: JSON.stringify(payload) });
}

export async function createProductReview(productId, payload) {
  return fetchJson(`/products/${productId}/reviews`, { method: 'POST', body: JSON.stringify(payload) });
}

export async function getFavorites() {
  try {
    const data = await fetchJson('/users/favorites');
    return data.favorites || [];
  } catch {
    return [];
  }
}

export async function toggleFavorite(productId) {
  return fetchJson(`/users/favorites/${productId}`, { method: 'POST' });
}

