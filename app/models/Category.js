/**
 * Category Model
 */

import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/db.js';

const Category = sequelize.define(
  'Category',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    item_count_text: {
      type: DataTypes.STRING(50),
      defaultValue: '100+ items',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    bg_color: {
      type: DataTypes.STRING(50),
      defaultValue: '#EDF7ED',
    },
    border_color: {
      type: DataTypes.STRING(50),
      defaultValue: '#D6ECD7',
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    is_featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    badge_text: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    display_order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: 'categories',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Category;
