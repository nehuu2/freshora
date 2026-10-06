/**
 * Address Model
 */

import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/db.js';

const Address = sequelize.define(
  'Address',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(50),
      defaultValue: 'Home',
    },
    recipient_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    address_line: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    sector: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(100),
      defaultValue: 'Gurugram',
    },
    state: {
      type: DataTypes.STRING(100),
      defaultValue: 'Haryana',
    },
    pincode: {
      type: DataTypes.STRING(20),
      defaultValue: '122001',
    },
    is_default: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: 'addresses',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Address;
