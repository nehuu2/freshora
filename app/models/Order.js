/**
 * Order Model
 */

import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/db.js';

const Order = sequelize.define(
  'Order',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_number: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    delivery_address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    delivery_option: {
      type: DataTypes.STRING(50),
      defaultValue: 'standard', // 'standard' or 'express'
    },
    delivery_charge: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00,
    },
    total_mrp: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00,
    },
    total_discount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00,
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING(50),
      defaultValue: 'upi', // 'upi', 'card', 'wallet', 'cod'
    },
    payment_status: {
      type: DataTypes.STRING(50),
      defaultValue: 'paid', // 'pending', 'paid', 'failed'
    },
    order_status: {
      type: DataTypes.STRING(50),
      defaultValue: 'Order Placed', // 'Order Placed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'
    },
    estimated_delivery: {
      type: DataTypes.STRING(100),
      defaultValue: 'Today by 5:00 PM',
    },
  },
  {
    tableName: 'orders',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Order;
