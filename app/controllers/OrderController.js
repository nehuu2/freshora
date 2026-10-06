/**
 * Order Controller
 */

import { BaseController } from './BaseController.js';
import { Order, OrderItem, Cart, CartItem, Product, User, Address } from '../models/index.js';

class OrderController extends BaseController {
  async index(req, res) {
    try {
      const user = req.user || (await User.findOne());
      const userId = user ? user.id : 1;

      const orders = await Order.findAll({
        where: { user_id: userId },
        include: [
          {
            model: OrderItem,
            as: 'items',
          },
        ],
        order: [['created_at', 'DESC']],
      });

      return this.success(res, orders);
    } catch (err) {
      console.error('Error fetching orders:', err);
      return res.status(500).json({ success: false, message: 'Failed to fetch orders', error: err.message });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      let order = null;

      if (!isNaN(id)) {
        order = await Order.findByPk(id, {
          include: [{ model: OrderItem, as: 'items' }],
        });
      } else {
        order = await Order.findOne({
          where: { order_number: id },
          include: [{ model: OrderItem, as: 'items' }],
        });
      }

      if (!order) {
        return this.notFound(res, 'Order not found');
      }

      const milestones = [
        {
          title: 'Order Placed',
          time: '09:41 AM',
          sub: '09:41 AM',
          desc: `Your order #${order.order_number} has been confirmed by the store.`,
          completed: true,
        },
        {
          title: 'Preparing',
          time: '10:00 AM (Est.)',
          sub: 'We are getting your items ready',
          desc: 'Fresh farm items are being handpicked and packed with quality check.',
          completed: order.order_status !== 'Order Placed',
        },
        {
          title: 'Out for Delivery',
          time: '04:30 PM (Est.)',
          sub: 'On the way to your location',
          desc: 'Our delivery partner will be on the way with your grocery bag.',
          completed: order.order_status === 'Out for Delivery' || order.order_status === 'Delivered',
        },
        {
          title: 'Delivered',
          time: '05:00 - 08:00 PM',
          sub: 'Enjoy your fresh groceries',
          desc: `Order delivered to your doorstep at ${order.delivery_address || 'Sector 67, Gurugram'}.`,
          completed: order.order_status === 'Delivered',
        },
      ];

      return this.success(res, {
        order,
        milestones,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Failed to fetch order details', error: err.message });
    }
  }

  async store(req, res) {
    try {
      const user = req.user || (await User.findOne());
      const userId = user ? user.id : 1;

      const {
        delivery_option = 'standard',
        payment_method = 'upi',
        delivery_address,
        address_id,
        items: payloadItems,
      } = req.body;

      let orderItemsToCreate = [];
      let totalAmount = 0;
      let totalMrp = 0;
      let totalDiscount = 0;

      if (payloadItems && Array.isArray(payloadItems) && payloadItems.length > 0) {
        orderItemsToCreate = payloadItems.map((item) => {
          const price = parseFloat(item.price || 0);
          const oldPrice = item.oldPrice ? parseFloat(item.oldPrice) : null;
          const qty = item.quantity || 1;
          const itemTotal = price * qty;
          totalAmount += itemTotal;
          totalMrp += (oldPrice || price) * qty;

          return {
            product_id: item.product_id || null,
            product_name: item.name || 'Product',
            unit: item.unit || '1 kg',
            price,
            old_price: oldPrice,
            quantity: qty,
            total_price: itemTotal,
            image_url: item.image || 'veg_tomato.png',
          };
        });
      } else {
        // Read from cart
        const cart = await Cart.findOne({
          where: { user_id: userId },
          include: [{ model: CartItem, as: 'items', include: [{ model: Product, as: 'product' }] }],
        });

        if (!cart || !cart.items || cart.items.length === 0) {
          return this.unprocessable(res, 'Cart is empty. Please add items before placing order.');
        }

        orderItemsToCreate = cart.items.map((ci) => {
          const prod = ci.product || {};
          const price = parseFloat(ci.unit_price || prod.price || 0);
          const oldPrice = prod.old_price ? parseFloat(prod.old_price) : null;
          const qty = ci.quantity;
          const itemTotal = price * qty;
          totalAmount += itemTotal;
          totalMrp += (oldPrice || price) * qty;

          return {
            product_id: ci.product_id,
            product_name: prod.name || 'Product',
            unit: ci.unit || prod.unit || '1 kg',
            price,
            old_price: oldPrice,
            quantity: qty,
            total_price: itemTotal,
            image_url: prod.image_url || 'veg_tomato.png',
          };
        });
      }

      totalDiscount = Math.max(0, totalMrp - totalAmount);
      const deliveryCharge = delivery_option === 'express' ? 40.00 : (totalAmount >= 199 ? 0.00 : 0.00);
      const finalAmount = totalAmount + deliveryCharge;

      const randomSuffix = Math.floor(100000 + Math.random() * 900000);
      const orderNumber = `ORD${randomSuffix}`;

      // Address resolution
      let finalAddressText = delivery_address;
      if (!finalAddressText) {
        const addr = address_id
          ? await Address.findByPk(address_id)
          : await Address.findOne({ where: { user_id: userId, is_default: true } });
        finalAddressText = addr ? `${addr.sector}, ${addr.city} ${addr.pincode}` : 'Sector 67, Gurugram 122001';
      }

      const order = await Order.create({
        order_number: orderNumber,
        user_id: userId,
        address_id: address_id || null,
        delivery_address: finalAddressText,
        delivery_option,
        delivery_charge: deliveryCharge,
        total_mrp: totalMrp,
        total_discount: totalDiscount,
        total_amount: finalAmount,
        payment_method,
        payment_status: 'paid',
        order_status: 'Order Placed',
        estimated_delivery: 'Today by 5:00 PM',
      });

      for (const item of orderItemsToCreate) {
        await OrderItem.create({
          order_id: order.id,
          ...item,
        });
      }

      // Clear cart
      const cart = await Cart.findOne({ where: { user_id: userId } });
      if (cart) {
        await CartItem.destroy({ where: { cart_id: cart.id } });
      }

      const createdOrderWithItems = await Order.findByPk(order.id, {
        include: [{ model: OrderItem, as: 'items' }],
      });

      return this.created(res, createdOrderWithItems);
    } catch (err) {
      console.error('Error placing order:', err);
      return res.status(500).json({ success: false, message: 'Failed to place order', error: err.message });
    }
  }
}

export default new OrderController();
