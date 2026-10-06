/**
 * Product Controller
 */

import { Op } from 'sequelize';
import { BaseController } from './BaseController.js';
import { Product, ProductQuantityOption, Category } from '../models/index.js';

class ProductController extends BaseController {
  async index(req, res) {
    try {
      const {
        search,
        q,
        category,
        sub_category,
        organic,
        is_organic,
        popular,
        featured,
        sort,
        limit,
        page,
      } = req.query;

      const where = {};
      const querySearch = search || q;

      if (querySearch) {
        where[Op.or] = [
          { name: { [Op.like]: `%${querySearch}%` } },
          { variety: { [Op.like]: `%${querySearch}%` } },
          { category_name: { [Op.like]: `%${querySearch}%` } },
          { sub_category: { [Op.like]: `%${querySearch}%` } },
        ];
      }

      if (category && category !== 'All') {
        if (!isNaN(category)) {
          where.category_id = parseInt(category, 10);
        } else {
          where[Op.or] = [
            { category_name: { [Op.like]: `%${category}%` } },
            { sub_category: { [Op.like]: `%${category}%` } },
          ];
        }
      }

      if (sub_category && sub_category !== 'All') {
        where.sub_category = { [Op.like]: `%${sub_category}%` };
      }

      if (organic === 'true' || is_organic === 'true') {
        where.is_organic = true;
      }

      if (popular === 'true') {
        where.is_popular = true;
      }

      if (featured === 'true') {
        where.is_featured = true;
      }

      // Sorting
      let order = [['id', 'ASC']];
      if (sort === 'price_asc') {
        order = [['price', 'ASC']];
      } else if (sort === 'price_desc') {
        order = [['price', 'DESC']];
      } else if (sort === 'popular') {
        order = [['is_popular', 'DESC'], ['rating', 'DESC']];
      } else if (sort === 'name_asc') {
        order = [['name', 'ASC']];
      }

      const limitNum = limit ? parseInt(limit, 10) : 50;
      const pageNum = page ? parseInt(page, 10) : 1;
      const offset = (pageNum - 1) * limitNum;

      const { count, rows: products } = await Product.findAndCountAll({
        where,
        order,
        limit: limitNum,
        offset,
        include: [
          {
            model: ProductQuantityOption,
            as: 'quantity_options',
            required: false,
          },
        ],
      });

      return this.success(res, products, {
        total: count,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(count / limitNum),
      });
    } catch (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ success: false, message: 'Failed to fetch products', error: err.message });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      let product = null;

      if (!isNaN(id)) {
        product = await Product.findByPk(id, {
          include: [
            {
              model: ProductQuantityOption,
              as: 'quantity_options',
            },
            {
              model: Category,
              as: 'category',
            },
          ],
        });
      } else {
        product = await Product.findOne({
          where: { [Op.or]: [{ code: id }, { slug: id }] },
          include: [
            {
              model: ProductQuantityOption,
              as: 'quantity_options',
            },
            {
              model: Category,
              as: 'category',
            },
          ],
        });
      }

      if (!product) {
        return this.notFound(res, 'Product not found');
      }

      // Recommended products from same or related category
      const recommendedProducts = await Product.findAll({
        where: {
          id: { [Op.ne]: product.id },
          category_id: product.category_id,
        },
        limit: 4,
      });

      const responseData = {
        ...product.toJSON(),
        gallery_images: [
          'tomato_gallery_1.png',
          'tomato_gallery_2.png',
          'tomato_gallery_3.png',
          'tomato_gallery_4.png',
          'tomato_gallery_5.png',
        ],
        recommended_products: recommendedProducts,
      };

      return this.success(res, responseData);
    } catch (err) {
      console.error('Error fetching product:', err);
      return res.status(500).json({ success: false, message: 'Failed to fetch product details', error: err.message });
    }
  }

  async store(req, res) {
    try {
      const {
        name,
        variety,
        category_id,
        category_name,
        sub_category,
        unit,
        price,
        old_price,
        discount,
        is_organic,
        image_url,
        description,
      } = req.body;

      if (!name || !price) {
        return this.unprocessable(res, 'Product name and price are required');
      }

      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const product = await Product.create({
        name,
        variety: variety || '',
        slug,
        category_id: category_id || 1,
        category_name: category_name || 'Fresh Vegetables',
        sub_category: sub_category || 'Fresh Vegetables',
        unit: unit || '1 kg',
        price: parseFloat(price),
        old_price: old_price ? parseFloat(old_price) : null,
        discount: discount || null,
        is_organic: Boolean(is_organic),
        image_url: image_url || 'veg_tomato.png',
        description: description || '',
      });

      return this.created(res, product);
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Failed to create product', error: err.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) return this.notFound(res, 'Product not found');

      await product.update(req.body);
      return this.success(res, product);
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Failed to update product', error: err.message });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) return this.notFound(res, 'Product not found');

      await product.destroy();
      return this.message(res, 'Product deleted successfully');
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Failed to delete product', error: err.message });
    }
  }
}

export default new ProductController();
