/**
 * Migration: Create all Freshora tables
 */

import { DataTypes } from 'sequelize';

export default {
  async up(queryInterface) {
    // 1. Users
    await queryInterface.createTable('users', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING(255), allowNull: false },
      email: { type: DataTypes.STRING(255), allowNull: true, unique: true },
      phone: { type: DataTypes.STRING(50), allowNull: true, unique: true },
      password: { type: DataTypes.STRING(255), allowNull: true },
      avatar: { type: DataTypes.STRING(255), allowNull: true },
      role: { type: DataTypes.STRING(50), defaultValue: 'customer' },
      is_gold_member: { type: DataTypes.BOOLEAN, defaultValue: true },
      wallet_balance: { type: DataTypes.DECIMAL(10, 2), defaultValue: 250.00 },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    });

    // 2. Categories
    await queryInterface.createTable('categories', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING(255), allowNull: false },
      slug: { type: DataTypes.STRING(255), allowNull: false, unique: true },
      item_count_text: { type: DataTypes.STRING(50), defaultValue: '100+ items' },
      description: { type: DataTypes.TEXT, allowNull: true },
      bg_color: { type: DataTypes.STRING(50), defaultValue: '#EDF7ED' },
      border_color: { type: DataTypes.STRING(50), defaultValue: '#D6ECD7' },
      image_url: { type: DataTypes.STRING(255), allowNull: true },
      is_featured: { type: DataTypes.BOOLEAN, defaultValue: false },
      badge_text: { type: DataTypes.STRING(50), allowNull: true },
      display_order: { type: DataTypes.INTEGER, defaultValue: 0 },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    });

    // 3. Products
    await queryInterface.createTable('products', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      code: { type: DataTypes.STRING(50), allowNull: true, unique: true },
      name: { type: DataTypes.STRING(255), allowNull: false },
      variety: { type: DataTypes.STRING(100), allowNull: true },
      slug: { type: DataTypes.STRING(255), allowNull: false },
      category_id: { type: DataTypes.INTEGER, allowNull: true },
      category_name: { type: DataTypes.STRING(255), allowNull: false },
      sub_category: { type: DataTypes.STRING(255), allowNull: true },
      unit: { type: DataTypes.STRING(50), allowNull: false, defaultValue: '1 kg' },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      old_price: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
      discount: { type: DataTypes.STRING(50), allowNull: true },
      is_organic: { type: DataTypes.BOOLEAN, defaultValue: false },
      is_featured: { type: DataTypes.BOOLEAN, defaultValue: false },
      is_popular: { type: DataTypes.BOOLEAN, defaultValue: false },
      in_stock: { type: DataTypes.BOOLEAN, defaultValue: true },
      stock_quantity: { type: DataTypes.INTEGER, defaultValue: 100 },
      rating: { type: DataTypes.DECIMAL(3, 2), defaultValue: 4.8 },
      rating_count: { type: DataTypes.INTEGER, defaultValue: 120 },
      description: { type: DataTypes.TEXT, allowNull: true },
      image_url: { type: DataTypes.STRING(255), allowNull: true },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    });

    // 4. Product Quantity Options
    await queryInterface.createTable('product_quantity_options', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      product_id: { type: DataTypes.INTEGER, allowNull: false },
      weight_id: { type: DataTypes.STRING(50), allowNull: false },
      weight_label: { type: DataTypes.STRING(100), allowNull: false },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      old_price: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
      is_default: { type: DataTypes.BOOLEAN, defaultValue: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    });

    // 5. Addresses
    await queryInterface.createTable('addresses', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      title: { type: DataTypes.STRING(50), defaultValue: 'Home' },
      recipient_name: { type: DataTypes.STRING(255), allowNull: true },
      phone: { type: DataTypes.STRING(50), allowNull: true },
      address_line: { type: DataTypes.STRING(255), allowNull: false },
      sector: { type: DataTypes.STRING(100), allowNull: true },
      city: { type: DataTypes.STRING(100), defaultValue: 'Gurugram' },
      state: { type: DataTypes.STRING(100), defaultValue: 'Haryana' },
      pincode: { type: DataTypes.STRING(20), defaultValue: '122001' },
      is_default: { type: DataTypes.BOOLEAN, defaultValue: true },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    });

    // 6. Carts
    await queryInterface.createTable('carts', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: DataTypes.INTEGER, allowNull: true },
      session_id: { type: DataTypes.STRING(255), allowNull: true },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    });

    // 7. Cart Items
    await queryInterface.createTable('cart_items', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      cart_id: { type: DataTypes.INTEGER, allowNull: false },
      product_id: { type: DataTypes.INTEGER, allowNull: false },
      quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
      unit: { type: DataTypes.STRING(50), allowNull: true, defaultValue: '1 kg' },
      unit_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    });

    // 8. Wishlists
    await queryInterface.createTable('wishlists', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      product_id: { type: DataTypes.INTEGER, allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    });

    // 9. Orders
    await queryInterface.createTable('orders', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      order_number: { type: DataTypes.STRING(100), allowNull: false, unique: true },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      address_id: { type: DataTypes.INTEGER, allowNull: true },
      delivery_address: { type: DataTypes.TEXT, allowNull: true },
      delivery_option: { type: DataTypes.STRING(50), defaultValue: 'standard' },
      delivery_charge: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.00 },
      total_mrp: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.00 },
      total_discount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.00 },
      total_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      payment_method: { type: DataTypes.STRING(50), defaultValue: 'upi' },
      payment_status: { type: DataTypes.STRING(50), defaultValue: 'paid' },
      order_status: { type: DataTypes.STRING(50), defaultValue: 'Order Placed' },
      estimated_delivery: { type: DataTypes.STRING(100), defaultValue: 'Today by 5:00 PM' },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    });

    // 10. Order Items
    await queryInterface.createTable('order_items', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      order_id: { type: DataTypes.INTEGER, allowNull: false },
      product_id: { type: DataTypes.INTEGER, allowNull: true },
      product_name: { type: DataTypes.STRING(255), allowNull: false },
      unit: { type: DataTypes.STRING(50), allowNull: false, defaultValue: '1 kg' },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      old_price: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
      quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
      total_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      image_url: { type: DataTypes.STRING(255), allowNull: true },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('order_items');
    await queryInterface.dropTable('orders');
    await queryInterface.dropTable('wishlists');
    await queryInterface.dropTable('cart_items');
    await queryInterface.dropTable('carts');
    await queryInterface.dropTable('addresses');
    await queryInterface.dropTable('product_quantity_options');
    await queryInterface.dropTable('products');
    await queryInterface.dropTable('categories');
    await queryInterface.dropTable('users');
  },
};
