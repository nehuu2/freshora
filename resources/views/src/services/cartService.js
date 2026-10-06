/**
 * Cart & Wishlist Service
 */

import api from './ApiService';

export const cartService = {
  async getCart() {
    try {
      const res = await api.get('/cart');
      return res.data?.data || null;
    } catch (err) {
      console.warn('cartService.getCart failed:', err.message);
      return null;
    }
  },

  async addToCart(item) {
    try {
      const res = await api.post('/cart/items', item);
      return res.data?.data || null;
    } catch (err) {
      console.warn('cartService.addToCart failed:', err.message);
      return null;
    }
  },

  async updateQuantity(cartItemId, quantity, unit) {
    try {
      const res = await api.put(`/cart/items/${cartItemId}`, { quantity, unit });
      return res.data?.data || null;
    } catch (err) {
      console.warn('cartService.updateQuantity failed:', err.message);
      return null;
    }
  },

  async removeFromCart(cartItemId) {
    try {
      const res = await api.delete(`/cart/items/${cartItemId}`);
      return res.data?.data || null;
    } catch (err) {
      console.warn('cartService.removeFromCart failed:', err.message);
      return null;
    }
  },

  async clearCart() {
    try {
      const res = await api.delete('/cart');
      return res.data?.data || null;
    } catch (err) {
      console.warn('cartService.clearCart failed:', err.message);
      return null;
    }
  },

  // Wishlist methods
  async getWishlist() {
    try {
      const res = await api.get('/wishlist');
      return res.data?.data || null;
    } catch (err) {
      console.warn('cartService.getWishlist failed:', err.message);
      return null;
    }
  },

  async toggleWishlist(product) {
    try {
      const payload = typeof product === 'object'
        ? { product_id: product.id, product_code: product.code }
        : { product_code: product };
      const res = await api.post('/wishlist/items', payload);
      return res.data?.data || null;
    } catch (err) {
      console.warn('cartService.toggleWishlist failed:', err.message);
      return null;
    }
  },
};

export default cartService;
