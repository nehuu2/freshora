/**
 * Seeder: Freshora complete product & category seed
 */

import { seedDatabase } from '../seedFreshora.js';

export default {
  async up(queryInterface, Sequelize) {
    await seedDatabase();
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('order_items', null, {});
    await queryInterface.bulkDelete('orders', null, {});
    await queryInterface.bulkDelete('wishlists', null, {});
    await queryInterface.bulkDelete('cart_items', null, {});
    await queryInterface.bulkDelete('carts', null, {});
    await queryInterface.bulkDelete('addresses', null, {});
    await queryInterface.bulkDelete('product_quantity_options', null, {});
    await queryInterface.bulkDelete('products', null, {});
    await queryInterface.bulkDelete('categories', null, {});
    await queryInterface.bulkDelete('users', null, {});
  },
};
