/**
 * Auth & Address Service
 */

import api from './ApiService';

let authToken = null;

export const authService = {
  setToken(token) {
    authToken = token;
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  },

  getToken() {
    return authToken;
  },

  async register(data) {
    try {
      const res = await api.post('/auth/register', data);
      if (res.data?.data?.token) {
        this.setToken(res.data.data.token);
      }
      return res.data?.data || null;
    } catch (err) {
      console.warn('authService.register failed:', err.message);
      throw err;
    }
  },

  async login(credentials) {
    try {
      const res = await api.post('/auth/login', credentials);
      if (res.data?.data?.token) {
        this.setToken(res.data.data.token);
      }
      return res.data?.data || null;
    } catch (err) {
      console.warn('authService.login failed:', err.message);
      throw err;
    }
  },

  async getMe() {
    try {
      const res = await api.get('/auth/me');
      return res.data?.data || null;
    } catch (err) {
      console.warn('authService.getMe failed:', err.message);
      return null;
    }
  },

  async updateProfile(data) {
    try {
      const res = await api.put('/auth/profile', data);
      return res.data?.data || null;
    } catch (err) {
      console.warn('authService.updateProfile failed:', err.message);
      return null;
    }
  },

  async getAddresses() {
    try {
      const res = await api.get('/addresses');
      return res.data?.data || [];
    } catch (err) {
      console.warn('authService.getAddresses failed:', err.message);
      return [];
    }
  },

  async addAddress(data) {
    try {
      const res = await api.post('/addresses', data);
      return res.data?.data || null;
    } catch (err) {
      console.warn('authService.addAddress failed:', err.message);
      return null;
    }
  },
};

export default authService;
