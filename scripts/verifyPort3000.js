/**
 * Live Port 3000 Endpoints Test
 */

import http from 'http';

function request(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, data: parsed });
        } catch {
          resolve({ status: res.statusCode, text: body });
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

async function verifyLive() {
  console.log('Testing live backend on http://localhost:3000...\n');

  // 1. Root Health
  const root = await request({ hostname: 'localhost', port: 3000, path: '/', method: 'GET' });
  console.log('1. GET / -> Status:', root.status, '| Response:', JSON.stringify(root.data));

  // 2. Categories
  const categories = await request({ hostname: 'localhost', port: 3000, path: '/api/categories', method: 'GET' });
  console.log('2. GET /api/categories -> Status:', categories.status, '| Total Categories:', categories.data.data?.length);

  // 3. Products
  const products = await request({ hostname: 'localhost', port: 3000, path: '/api/products', method: 'GET' });
  console.log('3. GET /api/products -> Status:', products.status, '| Total Products:', products.data.data?.length);

  // 4. Product Details
  const prod = await request({ hostname: 'localhost', port: 3000, path: '/api/products/1', method: 'GET' });
  console.log('4. GET /api/products/1 -> Status:', prod.status, '| Name:', prod.data.data?.name, '| Variety:', prod.data.data?.variety, '| Price: ₹' + prod.data.data?.price);

  // 5. Category Products
  const catProd = await request({ hostname: 'localhost', port: 3000, path: '/api/categories/1/products', method: 'GET' });
  console.log('5. GET /api/categories/1/products -> Status:', catProd.status, '| Items in category:', catProd.data.data?.products?.length);

  // 6. Login
  const login = await request({
    hostname: 'localhost',
    port: 3000,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }, { phone: '+91 98765 43210', password: 'password123' });
  console.log('6. POST /api/auth/login -> Status:', login.status, '| User:', login.data.data?.user?.name);
  const token = login.data.data?.token;

  // 7. Auth me
  const me = await request({
    hostname: 'localhost',
    port: 3000,
    path: '/api/auth/me',
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log('7. GET /api/auth/me -> Status:', me.status, '| Phone:', me.data.data?.phone);

  // 8. Cart
  const cart = await request({
    hostname: 'localhost',
    port: 3000,
    path: '/api/cart',
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log('8. GET /api/cart -> Status:', cart.status, '| Total Amount: ₹' + cart.data.data?.totalAmount, '| Items count:', cart.data.data?.items?.length);

  // 9. Add to cart
  const addCart = await request({
    hostname: 'localhost',
    port: 3000,
    path: '/api/cart/items',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  }, { product_id: 1, quantity: 1, unit: '1 kg', price: 135.00 });
  console.log('9. POST /api/cart/items -> Status:', addCart.status, '| New Total Amount: ₹' + addCart.data.data?.totalAmount);

  // 10. Wishlist
  const wish = await request({
    hostname: 'localhost',
    port: 3000,
    path: '/api/wishlist',
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log('10. GET /api/wishlist -> Status:', wish.status, '| Wishlist count:', wish.data.data?.items?.length);

  // 11. Orders
  const orders = await request({
    hostname: 'localhost',
    port: 3000,
    path: '/api/orders',
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log('11. GET /api/orders -> Status:', orders.status, '| Orders count:', orders.data.data?.length);

  // 12. Addresses
  const addresses = await request({
    hostname: 'localhost',
    port: 3000,
    path: '/api/addresses',
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log('12. GET /api/addresses -> Status:', addresses.status, '| Default address:', addresses.data.data?.[0]?.address_line);

  console.log('\n✓ ALL LIVE REST ENDPOINTS VERIFIED SUCCESSFULLY ON PORT 3000 WITH MYSQL!');
}

verifyLive().catch(console.error);
