/**
 * Cart Model
 */

import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/db.js';

const Cart = sequelize.define(
  'Cart',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    session_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: 'carts',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Cart;
