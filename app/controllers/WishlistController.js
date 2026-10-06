/**
 * Wishlist Controller
 */

import { BaseController } from './BaseController.js';
import { Wishlist, Product, User } from '../models/index.js';

class WishlistController extends BaseController {
  async index(req, res) {
    try {
      const user = req.user || (await User.findOne());
      const userId = user ? user.id : 1;

      const wishlistItems = await Wishlist.findAll({
        where: { user_id: userId },
        include: [
          {
            model: Product,
            as: 'product',
          },
        ],
        order: [['created_at', 'DESC']],
      });

      const products = wishlistItems.map((item) => item.product).filter(Boolean);
      const productIds = wishlistItems.map((item) => item.product_id);

      return this.success(res, {
        items: wishlistItems,
        products,
        productIds,
      });
    } catch (err) {
      console.error('Error fetching wishlist:', err);
      return res.status(500).json({ success: false, message: 'Failed to fetch wishlist', error: err.message });
    }
  }

  async toggleItem(req, res) {
    try {
      const user = req.user || (await User.findOne());
      const userId = user ? user.id : 1;
      const { product_id, product_code } = req.body;

      let productId = product_id;
      if (!productId && product_code) {
        const prod = await Product.findOne({ where: { code: product_code } });
        if (prod) productId = prod.id;
      }

      if (!productId) {
        return this.unprocessable(res, 'Product ID is required');
      }

      const existing = await Wishlist.findOne({
        where: { user_id: userId, product_id: productId },
      });

      let isWishlisted = false;
      if (existing) {
        await existing.destroy();
        isWishlisted = false;
      } else {
        await Wishlist.create({
          user_id: userId,
          product_id: productId,
        });
        isWishlisted = true;
      }

      return this.success(res, {
        productId,
        isWishlisted,
        message: isWishlisted ? 'Added to wishlist' : 'Removed from wishlist',
      });
    } catch (err) {
      console.error('Error toggling wishlist item:', err);
      return res.status(500).json({ success: false, message: 'Failed to update wishlist', error: err.message });
    }
  }

  async removeItem(req, res) {
    try {
      const user = req.user || (await User.findOne());
      const userId = user ? user.id : 1;
      const { productId } = req.params;

      await Wishlist.destroy({
        where: { user_id: userId, product_id: productId },
      });

      return this.message(res, 'Item removed from wishlist');
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Failed to remove from wishlist', error: err.message });
    }
  }
}

export default new WishlistController();
