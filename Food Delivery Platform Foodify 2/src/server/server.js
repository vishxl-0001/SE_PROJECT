const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'foodify',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
pool.getConnection()
  .then(connection => {
    console.log('✅ MySQL database connected successfully');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Error connecting to MySQL:', err);
  });

// ==================== AUTH ROUTES ====================

// User Registration
app.post('/api/auth/user/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = `user_${Date.now()}`;

    await pool.query(
      'INSERT INTO users (id, name, email, password, phone) VALUES (?, ?, ?, ?, ?)',
      [userId, name, email, hashedPassword, phone]
    );

    res.json({ success: true, userId, userType: 'user' });
  } catch (error) {
    console.error('User registration error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// User Login
app.post('/api/auth/user/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    if (users.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const user = users[0];
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    res.json({ success: true, userId: user.id, userType: 'user' });
  } catch (error) {
    console.error('User login error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Restaurant Registration
app.post('/api/auth/restaurant/register', async (req, res) => {
  try {
    const { restaurantName, ownerName, email, password, phone, address, cuisine, fssaiNumber } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const restaurantId = `restaurant_${Date.now()}`;

    await pool.query(
      `INSERT INTO restaurants (id, name, owner_name, email, password, phone, address, cuisine, fssai_number, latitude, longitude) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 28.6139, 77.2090)`,
      [restaurantId, restaurantName, ownerName, email, hashedPassword, phone, address, JSON.stringify(cuisine.split(',')), fssaiNumber]
    );

    res.json({ success: true, userId: restaurantId, userType: 'restaurant' });
  } catch (error) {
    console.error('Restaurant registration error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Restaurant Login
app.post('/api/auth/restaurant/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [restaurants] = await pool.query('SELECT * FROM restaurants WHERE email = ?', [email]);

    if (restaurants.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const restaurant = restaurants[0];
    const isValid = await bcrypt.compare(password, restaurant.password);

    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    res.json({ success: true, userId: restaurant.id, userType: 'restaurant' });
  } catch (error) {
    console.error('Restaurant login error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Partner Registration
app.post('/api/auth/partner/register', async (req, res) => {
  try {
    const { name, email, password, phone, vehicleType, vehicleNumber, licenseNumber } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const partnerId = `partner_${Date.now()}`;

    await pool.query(
      `INSERT INTO delivery_partners (id, name, email, password, phone, vehicle_type, vehicle_number, license_number, latitude, longitude) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 28.6139, 77.2090)`,
      [partnerId, name, email, hashedPassword, phone, vehicleType, vehicleNumber || 'N/A', licenseNumber]
    );

    res.json({ success: true, userId: partnerId, userType: 'partner' });
  } catch (error) {
    console.error('Partner registration error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Partner Login
app.post('/api/auth/partner/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [partners] = await pool.query('SELECT * FROM delivery_partners WHERE email = ?', [email]);

    if (partners.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const partner = partners[0];
    const isValid = await bcrypt.compare(password, partner.password);

    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    res.json({ success: true, userId: partner.id, userType: 'partner' });
  } catch (error) {
    console.error('Partner login error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==================== RESTAURANT ROUTES ====================

// Get all restaurants
app.get('/api/restaurants', async (req, res) => {
  try {
    const [restaurants] = await pool.query(`
      SELECT id, name, image_url as image, cuisine, rating, delivery_time as deliveryTime, 
             price_range as priceRange, address, latitude as lat, longitude as lng, is_veg as isVeg
      FROM restaurants 
      WHERE is_active = TRUE
    `);

    const restaurantsWithMenu = await Promise.all(restaurants.map(async (restaurant) => {
      const [menuItems] = await pool.query(
        'SELECT id, name, price, description, is_veg as isVeg, category, image_url as image FROM menu_items WHERE restaurant_id = ? AND is_available = TRUE',
        [restaurant.id]
      );
      
      return {
        ...restaurant,
        cuisine: JSON.parse(restaurant.cuisine),
        location: { lat: restaurant.lat, lng: restaurant.lng },
        menu: menuItems
      };
    }));

    res.json(restaurantsWithMenu);
  } catch (error) {
    console.error('Get restaurants error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get restaurant by ID
app.get('/api/restaurants/:id', async (req, res) => {
  try {
    const [restaurants] = await pool.query(`
      SELECT id, name, image_url as image, cuisine, rating, delivery_time as deliveryTime, 
             price_range as priceRange, address, latitude as lat, longitude as lng, is_veg as isVeg
      FROM restaurants 
      WHERE id = ? AND is_active = TRUE
    `, [req.params.id]);

    if (restaurants.length === 0) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }

    const restaurant = restaurants[0];
    const [menuItems] = await pool.query(
      'SELECT id, name, price, description, is_veg as isVeg, category, image_url as image FROM menu_items WHERE restaurant_id = ? AND is_available = TRUE',
      [restaurant.id]
    );

    res.json({
      ...restaurant,
      cuisine: JSON.parse(restaurant.cuisine),
      location: { lat: restaurant.lat, lng: restaurant.lng },
      menu: menuItems
    });
  } catch (error) {
    console.error('Get restaurant error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==================== DELIVERY PARTNER ROUTES ====================

// Get all delivery partners
app.get('/api/partners', async (req, res) => {
  try {
    const [partners] = await pool.query(`
      SELECT id, name, phone, vehicle_type as vehicleType, vehicle_number as vehicleNumber, 
             photo_url as photo, latitude as lat, longitude as lng, is_available as isAvailable, 
             rating, deliveries_completed as deliveriesCompleted
      FROM delivery_partners
    `);

    const partnersWithLocation = partners.map(partner => ({
      ...partner,
      location: { lat: partner.lat, lng: partner.lng }
    }));

    res.json(partnersWithLocation);
  } catch (error) {
    console.error('Get partners error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==================== ORDER ROUTES ====================

// Create order
app.post('/api/orders', async (req, res) => {
  try {
    const { id, items, total, deliveryFee, address, paymentMethod, restaurantId, customerLocation, restaurantLocation, customerName, customerPhone } = req.body;

    const subtotal = total - deliveryFee;

    await pool.query(
      `INSERT INTO orders (id, restaurant_id, delivery_address, customer_name, customer_phone, customer_latitude, customer_longitude, 
       restaurant_latitude, restaurant_longitude, subtotal, delivery_fee, total, payment_method, order_status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [id, restaurantId, address, customerName, customerPhone, customerLocation?.lat, customerLocation?.lng, 
       restaurantLocation?.lat, restaurantLocation?.lng, subtotal, deliveryFee, total, paymentMethod]
    );

    // Insert order items
    for (const item of items) {
      await pool.query(
        'INSERT INTO order_items (order_id, menu_item_id, name, price, quantity, is_veg) VALUES (?, ?, ?, ?, ?, ?)',
        [id, item.id, item.name, item.price, item.quantity, item.isVeg]
      );
    }

    res.json({ success: true, orderId: id });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all orders
app.get('/api/orders', async (req, res) => {
  try {
    const [orders] = await pool.query(`
      SELECT o.*, 
             r.name as restaurant_name,
             r.latitude as restaurant_lat, 
             r.longitude as restaurant_lng
      FROM orders o
      LEFT JOIN restaurants r ON o.restaurant_id = r.id
      ORDER BY o.created_at DESC
    `);

    const ordersWithItems = await Promise.all(orders.map(async (order) => {
      const [items] = await pool.query(
        'SELECT menu_item_id as id, name, price, quantity, is_veg as isVeg FROM order_items WHERE order_id = ?',
        [order.id]
      );

      return {
        id: order.id,
        items: items.map(item => ({
          ...item,
          restaurant: order.restaurant_name
        })),
        total: parseFloat(order.total),
        deliveryFee: parseFloat(order.delivery_fee),
        address: order.delivery_address,
        paymentMethod: order.payment_method,
        status: order.order_status,
        restaurantId: order.restaurant_id,
        partnerId: order.partner_id,
        customerLocation: order.customer_latitude ? { lat: parseFloat(order.customer_latitude), lng: parseFloat(order.customer_longitude) } : null,
        restaurantLocation: order.restaurant_lat ? { lat: parseFloat(order.restaurant_lat), lng: parseFloat(order.restaurant_lng) } : null
      };
    }));

    res.json(ordersWithItems);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update order
app.patch('/api/orders/:id', async (req, res) => {
  try {
    const { status, partnerId } = req.body;
    const updates = [];
    const values = [];

    if (status) {
      updates.push('order_status = ?');
      values.push(status);
    }
    if (partnerId !== undefined) {
      updates.push('partner_id = ?');
      values.push(partnerId);
    }

    values.push(req.params.id);

    await pool.query(
      `UPDATE orders SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
