/**
 * API Routes — Wires REST endpoints to Controllers
 */

import { Router } from 'express';
import authController from '../app/controllers/AuthController.js';
import categoryController from '../app/controllers/CategoryController.js';
import productController from '../app/controllers/ProductController.js';
import cartController from '../app/controllers/CartController.js';
import wishlistController from '../app/controllers/WishlistController.js';
import orderController from '../app/controllers/OrderController.js';
import addressController from '../app/controllers/AddressController.js';
import userController from '../app/controllers/UserController.js';
import { authenticate } from '../app/middlewares/authMiddleware.js';
import { validateRequest } from '../app/middlewares/validateRequest.js';
import { userStoreRules, userUpdateRules } from '../app/http/requests/index.js';

const router = Router();

// ==========================================
// 1. AUTHENTICATION & PROFILE ROUTES
// ==========================================
router.post('/auth/register', authController.register.bind(authController));
router.post('/auth/login', authController.login.bind(authController));
router.get('/auth/me', authenticate, authController.me.bind(authController));
router.put('/auth/profile', authenticate, authController.updateProfile.bind(authController));

// ==========================================
// 2. CATEGORY ROUTES
// ==========================================
router.get('/categories', categoryController.index.bind(categoryController));
router.get('/categories/:id', categoryController.show.bind(categoryController));
router.get('/categories/:id/products', categoryController.getProducts.bind(categoryController));

// ==========================================
// 3. PRODUCT ROUTES
// ==========================================
router.get('/products', productController.index.bind(productController));
router.get('/products/:id', productController.show.bind(productController));
router.post('/products', productController.store.bind(productController));
router.put('/products/:id', productController.update.bind(productController));
router.delete('/products/:id', productController.destroy.bind(productController));

// ==========================================
// 4. CART ROUTES
// ==========================================
router.get('/cart', authenticate, cartController.index.bind(cartController));
router.post('/cart/items', authenticate, cartController.addItem.bind(cartController));
router.put('/cart/items/:id', authenticate, cartController.updateItem.bind(cartController));
router.delete('/cart/items/:id', authenticate, cartController.removeItem.bind(cartController));
router.delete('/cart', authenticate, cartController.clearCart.bind(cartController));

// ==========================================
// 5. WISHLIST ROUTES
// ==========================================
router.get('/wishlist', authenticate, wishlistController.index.bind(wishlistController));
router.post('/wishlist/items', authenticate, wishlistController.toggleItem.bind(wishlistController));
router.delete('/wishlist/items/:productId', authenticate, wishlistController.removeItem.bind(wishlistController));

// ==========================================
// 6. ORDER ROUTES
// ==========================================
router.get('/orders', authenticate, orderController.index.bind(orderController));
router.get('/orders/:id', authenticate, orderController.show.bind(orderController));
router.post('/orders', authenticate, orderController.store.bind(orderController));

// ==========================================
// 7. ADDRESS ROUTES
// ==========================================
router.get('/addresses', authenticate, addressController.index.bind(addressController));
router.post('/addresses', authenticate, addressController.store.bind(addressController));
router.put('/addresses/:id', authenticate, addressController.update.bind(addressController));
router.delete('/addresses/:id', authenticate, addressController.destroy.bind(addressController));

// ==========================================
// 8. USERS (Compatibility / Template Admin)
// ==========================================
router.get('/users', userController.index.bind(userController));
router.get('/users/:id', userController.show.bind(userController));
router.post('/users', validateRequest(userStoreRules), userController.store.bind(userController));
router.put('/users/:id', validateRequest(userUpdateRules), userController.update.bind(userController));
router.delete('/users/:id', userController.destroy.bind(userController));

export default router;
