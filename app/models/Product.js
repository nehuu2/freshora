/**
 * Product Model
 */

import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/db.js';

const Product = sequelize.define(
  'Product',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    variety: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    category_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    sub_category: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    unit: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: '1 kg',
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    old_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    discount: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    is_organic: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_popular: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    in_stock: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 100,
    },
    rating: {
      type: DataTypes.DECIMAL(3, 2),
      defaultValue: 4.8,
    },
    rating_count: {
      type: DataTypes.INTEGER,
      defaultValue: 120,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: 'products',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Product;
