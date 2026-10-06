/**
 * Product Quantity Option Model
 */

import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/db.js';

const ProductQuantityOption = sequelize.define(
  'ProductQuantityOption',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    weight_label: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    old_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    is_default: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: 'product_quantity_options',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default ProductQuantityOption;
