/**
 * Authentication Middleware
 * Validates JWT token or falls back to default demo user for frictionless frontend experience.
 */

import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    let token = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    if (token) {
      try {
        const secret = process.env.JWT_SECRET || 'freshora_jwt_secret_key_2026_secure_token_123';
        const decoded = jwt.verify(token, secret);
        const user = await User.findByPk(decoded.id);
        if (user) {
          req.user = user;
          return next();
        }
      } catch (err) {
        // Token invalid or expired, continue to fallback or reject
      }
    }

    // Default to first user (e.g. Aryan Mangla) so frontend can use cart/orders immediately without breaking
    const defaultUser = await User.findOne();
    if (defaultUser) {
      req.user = defaultUser;
      return next();
    }

    return res.status(401).json({
      success: false,
      message: 'Authentication required',
    });
  } catch (error) {
    next(error);
  }
};

export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Authorization token required',
    });
  }

  const token = authHeader.split(' ')[1];
  try {
    const secret = process.env.JWT_SECRET || 'freshora_jwt_secret_key_2026_secure_token_123';
    const decoded = jwt.verify(token, secret);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};
