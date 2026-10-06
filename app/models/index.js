/**
 * Models Index
 * Registers all models and associations
 */

import User from './User.js';
import Category from './Category.js';
import Product from './Product.js';
import ProductQuantityOption from './ProductQuantityOption.js';
import Address from './Address.js';
import Cart from './Cart.js';
import CartItem from './CartItem.js';
import Wishlist from './Wishlist.js';
import Order from './Order.js';
import OrderItem from './OrderItem.js';

// Associations
Category.hasMany(Product, { foreignKey: 'category_id', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

Product.hasMany(ProductQuantityOption, { foreignKey: 'product_id', as: 'quantity_options' });
ProductQuantityOption.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

User.hasMany(Address, { foreignKey: 'user_id', as: 'addresses' });
Address.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasOne(Cart, { foreignKey: 'user_id', as: 'cart' });
Cart.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Cart.hasMany(CartItem, { foreignKey: 'cart_id', as: 'items' });
CartItem.belongsTo(Cart, { foreignKey: 'cart_id', as: 'cart' });
CartItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

User.hasMany(Wishlist, { foreignKey: 'user_id', as: 'wishlist' });
Wishlist.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Wishlist.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Order.belongsTo(Address, { foreignKey: 'address_id', as: 'address' });

Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

export {
  User,
  Category,
  Product,
  ProductQuantityOption,
  Address,
  Cart,
  CartItem,
  Wishlist,
  Order,
  OrderItem,
};
