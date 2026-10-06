/**
 * Category Controller
 */

import { BaseController } from './BaseController.js';
import { Category, Product } from '../models/index.js';

class CategoryController extends BaseController {
  async index(req, res) {
    try {
      const { featured } = req.query;
      const where = {};
      if (featured === 'true') {
        where.is_featured = true;
      }

      const categories = await Category.findAll({
        where,
        order: [['display_order', 'ASC'], ['id', 'ASC']],
      });

      return this.success(res, categories);
    } catch (err) {
      console.error('Error fetching categories:', err);
      return res.status(500).json({ success: false, message: 'Failed to fetch categories', error: err.message });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const category = isNaN(id)
        ? await Category.findOne({ where: { slug: id } })
        : await Category.findByPk(id);

      if (!category) {
        return this.notFound(res, 'Category not found');
      }

      return this.success(res, category);
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Failed to fetch category', error: err.message });
    }
  }

  async getProducts(req, res) {
    try {
      const { id } = req.params;
      let category = null;

      if (!isNaN(id)) {
        category = await Category.findByPk(id);
      } else {
        category = await Category.findOne({
          where: { slug: id },
        });
      }

      const where = {};
      if (category) {
        where.category_id = category.id;
      } else {
        where.category_name = id;
      }

      const products = await Product.findAll({
        where,
        order: [['is_popular', 'DESC'], ['id', 'ASC']],
      });

      return this.success(res, {
        category: category || { name: id },
        products,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Failed to fetch category products', error: err.message });
    }
  }
}

export default new CategoryController();
