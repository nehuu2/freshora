/**
 * Product & Category Service
 */

import api from './ApiService';

export const productService = {
  async getCategories(params = {}) {
    try {
      const res = await api.get('/categories', { params });
      return res.data?.data || [];
    } catch (err) {
      console.warn('productService.getCategories failed, using fallback:', err.message);
      return null;
    }
  },

  async getCategoryProducts(categoryIdOrSlug) {
    try {
      const res = await api.get(`/categories/${categoryIdOrSlug}/products`);
      return res.data?.data || null;
    } catch (err) {
      console.warn('productService.getCategoryProducts failed:', err.message);
      return null;
    }
  },

  async getProducts(params = {}) {
    try {
      const res = await api.get('/products', { params });
      return res.data?.data || [];
    } catch (err) {
      console.warn('productService.getProducts failed:', err.message);
      return null;
    }
  },

  async getProductById(id) {
    try {
      const res = await api.get(`/products/${id}`);
      return res.data?.data || null;
    } catch (err) {
      console.warn('productService.getProductById failed:', err.message);
      return null;
    }
  },
};

export default productService;
