/**
 * Order Service
 */

import api from './ApiService';

export const orderService = {
  async placeOrder(orderData) {
    try {
      const res = await api.post('/orders', orderData);
      return res.data?.data || null;
    } catch (err) {
      console.warn('orderService.placeOrder failed:', err.message);
      return null;
    }
  },

  async getOrders() {
    try {
      const res = await api.get('/orders');
      return res.data?.data || [];
    } catch (err) {
      console.warn('orderService.getOrders failed:', err.message);
      return [];
    }
  },

  async getOrderById(orderId) {
    try {
      const res = await api.get(`/orders/${orderId}`);
      return res.data?.data || null;
    } catch (err) {
      console.warn('orderService.getOrderById failed:', err.message);
      return null;
    }
  },
};

export default orderService;
