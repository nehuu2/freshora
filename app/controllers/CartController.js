/**
 * Cart Controller
 */

import { BaseController } from './BaseController.js';
import { Cart, CartItem, Product, User } from '../models/index.js';

class CartController extends BaseController {
  async getOrCreateCart(userId) {
    let cart = await Cart.findOne({ where: { user_id: userId } });
    if (!cart) {
      cart = await Cart.create({ user_id: userId });
    }
    return cart;
  }

  async index(req, res) {
    try {
      const user = req.user || (await User.findOne());
      const cart = await this.getOrCreateCart(user ? user.id : 1);

      const items = await CartItem.findAll({
        where: { cart_id: cart.id },
        include: [
          {
            model: Product,
            as: 'product',
          },
        ],
        order: [['id', 'ASC']],
      });

      const formattedItems = items.map((item) => {
        const prod = item.product || {};
        return {
          id: item.id,
          cart_item_id: item.id,
          product_id: item.product_id,
          code: prod.code,
          name: prod.name || 'Product',
          variety: prod.variety || '',
          unit: item.unit || prod.unit || '1 kg',
          price: parseFloat(item.unit_price || prod.price || 0),
          oldPrice: prod.old_price ? parseFloat(prod.old_price) : null,
          discount: prod.discount || null,
          quantity: item.quantity,
          image: prod.image_url || 'veg_tomato.png',
          total_price: parseFloat(item.unit_price || prod.price || 0) * item.quantity,
        };
      });

      const totalItemCount = formattedItems.reduce((sum, it) => sum + it.quantity, 0);
      const totalAmount = formattedItems.reduce((sum, it) => sum + it.price * it.quantity, 0);
      const totalMrp = formattedItems.reduce((sum, it) => {
        const mrp = it.oldPrice || it.price;
        return sum + mrp * it.quantity;
      }, 0);
      const totalDiscount = Math.max(0, totalMrp - totalAmount);
      const freeDeliveryThreshold = 199;
      const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - totalAmount);
      const progressPercent = Math.min(100, Math.round((totalAmount / freeDeliveryThreshold) * 100));
      const deliveryCharge = totalAmount >= freeDeliveryThreshold || totalAmount === 0 ? 0 : 40;

      // Cross-sell products
      const crossSellProducts = [
        { id: 'cross_milk', name: 'Milk', unit: '1 L', price: 60, oldPrice: 65, image: 'cross_milk.png' },
        { id: 'cross_bread', name: 'Bread', unit: '400 g', price: 40, oldPrice: 45, image: 'cross_bread.png' },
        { id: 'cross_eggs', name: 'Eggs', unit: '12 pcs', price: 72, oldPrice: 80, image: 'cross_eggs.png' },
        { id: 'cross_oil', name: 'Cooking Oil', unit: '1 L', price: 150, oldPrice: 165, image: 'cross_oil.png' },
      ];

      return this.success(res, {
        items: formattedItems,
        totalItemCount,
        totalAmount,
        totalMrp,
        totalDiscount,
        deliveryCharge,
        freeDeliveryThreshold,
        remainingForFreeDelivery,
        progressPercent,
        crossSellProducts,
      });
    } catch (err) {
      console.error('Error fetching cart:', err);
      return res.status(500).json({ success: false, message: 'Failed to fetch cart', error: err.message });
    }
  }

  async addItem(req, res) {
    try {
      const user = req.user || (await User.findOne());
      const cart = await this.getOrCreateCart(user ? user.id : 1);
      const { product_id, product_code, quantity = 1, unit, price } = req.body;

      let product = null;
      if (product_id) {
        product = await Product.findByPk(product_id);
      } else if (product_code) {
        product = await Product.findOne({ where: { code: product_code } });
      }

      if (!product && !product_id) {
        return this.unprocessable(res, 'Valid product is required');
      }

      const prodId = product ? product.id : product_id;
      const itemUnit = unit || (product ? product.unit : '1 kg');
      const itemPrice = price ? parseFloat(price) : (product ? parseFloat(product.price) : 0);

      // Check if item already in cart
      let cartItem = await CartItem.findOne({
        where: { cart_id: cart.id, product_id: prodId, unit: itemUnit },
      });

      if (cartItem) {
        cartItem.quantity += parseInt(quantity, 10);
        await cartItem.save();
      } else {
        cartItem = await CartItem.create({
          cart_id: cart.id,
          product_id: prodId,
          quantity: parseInt(quantity, 10),
          unit: itemUnit,
          unit_price: itemPrice,
        });
      }

      return this.index(req, res);
    } catch (err) {
      console.error('Error adding to cart:', err);
      return res.status(500).json({ success: false, message: 'Failed to add item to cart', error: err.message });
    }
  }

  async updateItem(req, res) {
    try {
      const { id } = req.params;
      const { quantity, unit } = req.body;

      const cartItem = await CartItem.findByPk(id);
      if (!cartItem) {
        return this.notFound(res, 'Cart item not found');
      }

      const qty = parseInt(quantity, 10);
      if (qty <= 0) {
        await cartItem.destroy();
      } else {
        cartItem.quantity = qty;
        if (unit) cartItem.unit = unit;
        await cartItem.save();
      }

      return this.index(req, res);
    } catch (err) {
      console.error('Error updating cart item:', err);
      return res.status(500).json({ success: false, message: 'Failed to update cart item', error: err.message });
    }
  }

  async removeItem(req, res) {
    try {
      const { id } = req.params;
      const cartItem = await CartItem.findByPk(id);
      if (cartItem) {
        await cartItem.destroy();
      }
      return this.index(req, res);
    } catch (err) {
      console.error('Error removing cart item:', err);
      return res.status(500).json({ success: false, message: 'Failed to remove cart item', error: err.message });
    }
  }

  async clearCart(req, res) {
    try {
      const user = req.user || (await User.findOne());
      const cart = await this.getOrCreateCart(user ? user.id : 1);

      await CartItem.destroy({ where: { cart_id: cart.id } });
      return this.index(req, res);
    } catch (err) {
      console.error('Error clearing cart:', err);
      return res.status(500).json({ success: false, message: 'Failed to clear cart', error: err.message });
    }
  }
}

export default new CartController();
