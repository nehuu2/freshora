/**
 * Address Controller
 */

import { BaseController } from './BaseController.js';
import { Address, User } from '../models/index.js';

class AddressController extends BaseController {
  async index(req, res) {
    try {
      const user = req.user || (await User.findOne());
      const userId = user ? user.id : 1;

      const addresses = await Address.findAll({
        where: { user_id: userId },
        order: [['is_default', 'DESC'], ['id', 'ASC']],
      });

      return this.success(res, addresses);
    } catch (err) {
      console.error('Error fetching addresses:', err);
      return res.status(500).json({ success: false, message: 'Failed to fetch addresses', error: err.message });
    }
  }

  async store(req, res) {
    try {
      const user = req.user || (await User.findOne());
      const userId = user ? user.id : 1;

      const {
        title = 'Home',
        recipient_name,
        phone,
        address_line,
        sector,
        city = 'Gurugram',
        state = 'Haryana',
        pincode = '122001',
        is_default = false,
      } = req.body;

      if (!address_line) {
        return this.unprocessable(res, 'Address line is required');
      }

      if (is_default) {
        await Address.update({ is_default: false }, { where: { user_id: userId } });
      }

      const address = await Address.create({
        user_id: userId,
        title,
        recipient_name: recipient_name || (user ? user.name : 'Aryan Mangla'),
        phone: phone || (user ? user.phone : '+91 98765 43210'),
        address_line,
        sector: sector || 'Sector 67',
        city,
        state,
        pincode,
        is_default: Boolean(is_default),
      });

      return this.created(res, address);
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Failed to create address', error: err.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const user = req.user || (await User.findOne());
      const userId = user ? user.id : 1;

      const address = await Address.findOne({
        where: { id, user_id: userId },
      });

      if (!address) {
        return this.notFound(res, 'Address not found');
      }

      if (req.body.is_default) {
        await Address.update({ is_default: false }, { where: { user_id: userId } });
      }

      await address.update(req.body);
      return this.success(res, address);
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Failed to update address', error: err.message });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const user = req.user || (await User.findOne());
      const userId = user ? user.id : 1;

      const address = await Address.findOne({
        where: { id, user_id: userId },
      });

      if (!address) {
        return this.notFound(res, 'Address not found');
      }

      await address.destroy();
      return this.message(res, 'Address deleted successfully');
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Failed to delete address', error: err.message });
    }
  }
}

export default new AddressController();
