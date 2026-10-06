/**
 * REST API Test Suite for Freshora
 */

import express from 'express';
import loadDatabase from '../loaders/database.js';
import loadExpress from '../loaders/express.js';
import axios from 'axios';

const PORT = 3009;
const BASE_URL = `http://localhost:${PORT}/api`;

async function runTests() {
  console.log('🚀 Starting Freshora API Test Suite...');
  
  const app = express();
  await loadDatabase();
  loadExpress(app);
  
  const server = app.listen(PORT);
  console.log(`✓ Test server running on port ${PORT}`);

  try {
    // 1. Test Categories
    console.log('\n[1] Testing GET /api/categories...');
    const catRes = await axios.get(`${BASE_URL}/categories`);
    console.log(`✓ Status: ${catRes.status}, Categories count: ${catRes.data.data.length}`);
    if (catRes.data.data.length < 5) throw new Error('Categories count is too low');

    // 2. Test Category Products
    console.log('\n[2] Testing GET /api/categories/1/products...');
    const catProdRes = await axios.get(`${BASE_URL}/categories/1/products`);
    console.log(`✓ Status: ${catProdRes.status}, Category: ${catProdRes.data.data.category.name}, Products: ${catProdRes.data.data.products.length}`);

    // 3. Test Products list
    console.log('\n[3] Testing GET /api/products...');
    const prodRes = await axios.get(`${BASE_URL}/products`);
    console.log(`✓ Status: ${prodRes.status}, Total products: ${prodRes.data.meta.total}`);

    // 4. Test Search / Filter
    console.log('\n[4] Testing GET /api/products?search=tomato...');
    const searchRes = await axios.get(`${BASE_URL}/products?search=tomato`);
    console.log(`✓ Status: ${searchRes.status}, Found: ${searchRes.data.data.length} (${searchRes.data.data[0]?.name})`);

    // 5. Test Organic Filter & Sort
    console.log('\n[5] Testing GET /api/products?organic=true&sort=price_asc...');
    const filterRes = await axios.get(`${BASE_URL}/products?organic=true&sort=price_asc`);
    console.log(`✓ Status: ${filterRes.status}, Organic products: ${filterRes.data.data.length}`);

    // 6. Test Product Details
    console.log('\n[6] Testing GET /api/products/p3...');
    const detailRes = await axios.get(`${BASE_URL}/products/p3`);
    console.log(`✓ Status: ${detailRes.status}, Product: ${detailRes.data.data.name}, Qty Options: ${detailRes.data.data.quantity_options?.length}, Recommended: ${detailRes.data.data.recommended_products?.length}`);

    // 7. Test Auth - Login
    console.log('\n[7] Testing POST /api/auth/login...');
    const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
      mobileNumber: '+91 98765 43210',
      password: 'password123',
    });
    console.log(`✓ Status: ${loginRes.status}, User: ${loginRes.data.data.user.name}, Token received: ${Boolean(loginRes.data.data.token)}`);
    const token = loginRes.data.data.token;
    const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

    // 8. Test Auth - Me
    console.log('\n[8] Testing GET /api/auth/me...');
    const meRes = await axios.get(`${BASE_URL}/auth/me`, authHeaders);
    console.log(`✓ Status: ${meRes.status}, Logged in as: ${meRes.data.data.name}, Address: ${meRes.data.data.address}`);

    // 9. Test Cart - Get
    console.log('\n[9] Testing GET /api/cart...');
    const cartRes = await axios.get(`${BASE_URL}/cart`, authHeaders);
    console.log(`✓ Status: ${cartRes.status}, Cart items: ${cartRes.data.data.items.length}, Total: ₹${cartRes.data.data.totalAmount}`);

    // 10. Test Cart - Add Item
    console.log('\n[10] Testing POST /api/cart/items...');
    const addCartRes = await axios.post(`${BASE_URL}/cart/items`, {
      product_code: 'p1', // Apple
      quantity: 1,
      unit: '1 kg',
      price: 135,
    }, authHeaders);
    console.log(`✓ Status: ${addCartRes.status}, Items now: ${addCartRes.data.data.items.length}, Total: ₹${addCartRes.data.data.totalAmount}`);

    // 11. Test Wishlist - Toggle
    console.log('\n[11] Testing POST /api/wishlist/items...');
    const wishToggleRes = await axios.post(`${BASE_URL}/wishlist/items`, { product_code: 'p3' }, authHeaders);
    console.log(`✓ Status: ${wishToggleRes.status}, Wishlist state: ${wishToggleRes.data.data.isWishlisted}`);

    // 12. Test Wishlist - Get
    console.log('\n[12] Testing GET /api/wishlist...');
    const wishRes = await axios.get(`${BASE_URL}/wishlist`, authHeaders);
    console.log(`✓ Status: ${wishRes.status}, Wishlisted product IDs: ${wishRes.data.data.productIds}`);

    // 13. Test Addresses
    console.log('\n[13] Testing GET /api/addresses & POST /api/addresses...');
    const addAddressRes = await axios.post(`${BASE_URL}/addresses`, {
      title: 'Office',
      address_line: 'Tower 4, Cyber City',
      sector: 'Sector 24',
      city: 'Gurugram',
      pincode: '122002',
    }, authHeaders);
    console.log(`✓ Created address: ${addAddressRes.data.data.title} - ${addAddressRes.data.data.address_line}`);

    // 14. Test Orders - Create Order
    console.log('\n[14] Testing POST /api/orders (Place Order)...');
    const orderRes = await axios.post(`${BASE_URL}/orders`, {
      delivery_option: 'standard',
      payment_method: 'upi',
      delivery_address: 'Sector 67, Gurugram 122001',
    }, authHeaders);
    console.log(`✓ Order placed successfully! Order Number: #${orderRes.data.data.order_number}, Amount: ₹${orderRes.data.data.total_amount}`);

    // 15. Test Orders - Get History & Details
    console.log('\n[15] Testing GET /api/orders & GET /api/orders/:id...');
    const orderListRes = await axios.get(`${BASE_URL}/orders`, authHeaders);
    console.log(`✓ Total orders in history: ${orderListRes.data.data.length}`);

    const singleOrderRes = await axios.get(`${BASE_URL}/orders/${orderRes.data.data.order_number}`, authHeaders);
    console.log(`✓ Single order status: ${singleOrderRes.data.data.order.order_status}, Milestones: ${singleOrderRes.data.data.milestones.length}`);

    console.log('\n=============================================');
    console.log('🎉 ALL 15 REST API TESTS PASSED PERFECTLY! 🎉');
    console.log('=============================================\n');

  } catch (err) {
    console.error('✗ API Test failed:', err.response?.data || err.message);
    process.exit(1);
  } finally {
    server.close();
    process.exit(0);
  }
}

runTests();
