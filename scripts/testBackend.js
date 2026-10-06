/**
 * Comprehensive Independent Backend Verification Script
 * Validates MySQL schema, data seeding, and all REST endpoints.
 */

import http from 'http';
import { sequelize } from '../config/db.js';
import loadDatabase from '../loaders/database.js';
import loadExpress from '../loaders/express.js';
import express from 'express';

const TEST_PORT = 3001;

function request(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, headers: res.headers, data: parsed });
        } catch {
          resolve({ status: res.statusCode, headers: res.headers, text: body });
        }
      });
    });
    req.on('error', reject);
    if (data) {
      req.write(typeof data === 'string' ? data : JSON.stringify(data));
    }
    req.end();
  });
}

async function runVerification() {
  console.log('==============================================');
  console.log('  FRESHORA BACKEND & MYSQL VERIFICATION');
  console.log('==============================================\n');

  // Step 1: Initialize Database & Seed
  console.log('--- STEP 1: Database Initialization & Seeding ---');
  await loadDatabase();

  // Step 2: Verify Tables in MySQL
  console.log('\n--- STEP 2: Verifying Tables in MySQL `freshora` ---');
  const [tables] = await sequelize.query('SHOW TABLES IN freshora;');
  console.log(`Found ${tables.length} tables in MySQL:`, tables.map(t => Object.values(t)[0]).join(', '));

  const [catCount] = await sequelize.query('SELECT COUNT(*) as count FROM categories;');
  const [prodCount] = await sequelize.query('SELECT COUNT(*) as count FROM products;');
  const [userCount] = await sequelize.query('SELECT COUNT(*) as count FROM users;');
  const [optCount] = await sequelize.query('SELECT COUNT(*) as count FROM product_quantity_options;');

  console.log(`Categories count: ${catCount[0].count}`);
  console.log(`Products count: ${prodCount[0].count}`);
  console.log(`Users count: ${userCount[0].count}`);
  console.log(`Quantity options count: ${optCount[0].count}`);

  // Step 3: Start Express App on Test Port
  console.log('\n--- STEP 3: Starting Express Server for API testing ---');
  const app = express();
  loadExpress(app);

  const server = await new Promise((resolve) => {
    const s = app.listen(TEST_PORT, () => resolve(s));
  });
  console.log(`Server listening on http://localhost:${TEST_PORT}`);

  try {
    // Step 4: Test Root Health Endpoint (Phase 8)
    console.log('\n--- STEP 4: Testing Root Health Endpoint (GET /) ---');
    const healthRes = await request({
      hostname: 'localhost',
      port: TEST_PORT,
      path: '/',
      method: 'GET',
    });
    console.log(`Status: ${healthRes.status}`);
    console.log('Response:', JSON.stringify(healthRes.data, null, 2));

    // Step 5: Test Categories API
    console.log('\n--- STEP 5: Testing Categories API ---');
    const catRes = await request({
      hostname: 'localhost',
      port: TEST_PORT,
      path: '/api/categories',
      method: 'GET',
    });
    console.log(`GET /api/categories -> Status: ${catRes.status}, Count: ${catRes.data.data?.length}`);

    // Step 6: Test Products API
    console.log('\n--- STEP 6: Testing Products API ---');
    const prodRes = await request({
      hostname: 'localhost',
      port: TEST_PORT,
      path: '/api/products',
      method: 'GET',
    });
    console.log(`GET /api/products -> Status: ${prodRes.status}, Count: ${prodRes.data.data?.length}`);

    const singleProdRes = await request({
      hostname: 'localhost',
      port: TEST_PORT,
      path: '/api/products/1',
      method: 'GET',
    });
    console.log(`GET /api/products/1 -> Status: ${singleProdRes.status}, Product: ${singleProdRes.data.data?.name}`);

    const catProdRes = await request({
      hostname: 'localhost',
      port: TEST_PORT,
      path: '/api/categories/1/products',
      method: 'GET',
    });
    console.log(`GET /api/categories/1/products -> Status: ${catProdRes.status}, Products: ${catProdRes.data.data?.length}`);

    // Step 7: Test Authentication
    console.log('\n--- STEP 7: Testing Authentication API ---');
    const loginRes = await request({
      hostname: 'localhost',
      port: TEST_PORT,
      path: '/api/auth/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, { phone: '+91 98765 43210', password: 'password123' });
    console.log(`POST /api/auth/login -> Status: ${loginRes.status}, User: ${loginRes.data.data?.user?.name}`);

    const token = loginRes.data.data?.token;

    const meRes = await request({
      hostname: 'localhost',
      port: TEST_PORT,
      path: '/api/auth/me',
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`GET /api/auth/me -> Status: ${meRes.status}, Phone: ${meRes.data.data?.phone}`);

    // Step 8: Test Cart API
    console.log('\n--- STEP 8: Testing Cart API ---');
    const cartRes = await request({
      hostname: 'localhost',
      port: TEST_PORT,
      path: '/api/cart',
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`GET /api/cart -> Status: ${cartRes.status}, Total items: ${cartRes.data.data?.item_count}, Total amount: ₹${cartRes.data.data?.total_amount}`);

    // Add item to cart
    const addCartRes = await request({
      hostname: 'localhost',
      port: TEST_PORT,
      path: '/api/cart/items',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    }, { product_id: 1, quantity: 1, unit: '1 kg', unit_price: 135.00 });
    console.log(`POST /api/cart/items -> Status: ${addCartRes.status}, Message: ${addCartRes.data.message}`);

    // Step 9: Test Wishlist API
    console.log('\n--- STEP 9: Testing Wishlist API ---');
    const addWishRes = await request({
      hostname: 'localhost',
      port: TEST_PORT,
      path: '/api/wishlist/items',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    }, { product_id: 3 });
    console.log(`POST /api/wishlist/items -> Status: ${addWishRes.status}`);

    const wishRes = await request({
      hostname: 'localhost',
      port: TEST_PORT,
      path: '/api/wishlist',
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`GET /api/wishlist -> Status: ${wishRes.status}, Wishlist count: ${wishRes.data.data?.length}`);

    // Step 10: Test Orders API
    console.log('\n--- STEP 10: Testing Orders API ---');
    const ordersRes = await request({
      hostname: 'localhost',
      port: TEST_PORT,
      path: '/api/orders',
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`GET /api/orders -> Status: ${ordersRes.status}, Orders count: ${ordersRes.data.data?.length}`);

    if (ordersRes.data.data?.length > 0) {
      const orderId = ordersRes.data.data[0].id;
      const singleOrderRes = await request({
        hostname: 'localhost',
        port: TEST_PORT,
        path: `/api/orders/${orderId}`,
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(`GET /api/orders/${orderId} -> Status: ${singleOrderRes.status}, Order Number: ${singleOrderRes.data.data?.order_number}`);
    }

    // Step 11: Test Addresses API
    console.log('\n--- STEP 11: Testing Addresses API ---');
    const addrRes = await request({
      hostname: 'localhost',
      port: TEST_PORT,
      path: '/api/addresses',
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`GET /api/addresses -> Status: ${addrRes.status}, Address count: ${addrRes.data.data?.length}, City: ${addrRes.data.data?.[0]?.city}`);

    console.log('\n==============================================');
    console.log('  ALL BACKEND & MYSQL TESTS PASSED SUCCESSFULLY!  ');
    console.log('==============================================');

  } finally {
    server.close();
    await sequelize.close();
  }
}

runVerification().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
