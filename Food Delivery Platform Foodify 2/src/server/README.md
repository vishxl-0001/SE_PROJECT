# Foodify Backend Server

This is the backend server for the Foodify food delivery application using Express.js and MySQL.

## Setup Instructions

### 1. Install MySQL

Make sure MySQL is installed on your system:
- **Windows**: Download from https://dev.mysql.com/downloads/installer/
- **Mac**: `brew install mysql`
- **Linux**: `sudo apt-get install mysql-server`

### 2. Create Database

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE foodify;

# Exit MySQL
exit;
```

### 3. Run Schema and Seed Files

```bash
# Create tables
mysql -u root -p foodify < schema.sql

# Insert sample data
mysql -u root -p foodify < seed.sql
```

### 4. Configure Environment Variables

```bash
# Copy the example env file
cp .env.example .env

# Edit .env file with your MySQL credentials
```

### 5. Install Dependencies

```bash
npm install
```

### 6. Start the Server

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3001`

## API Endpoints

### Authentication
- `POST /api/auth/user/register` - Register new user
- `POST /api/auth/user/login` - User login
- `POST /api/auth/restaurant/register` - Register new restaurant
- `POST /api/auth/restaurant/login` - Restaurant login
- `POST /api/auth/partner/register` - Register new delivery partner
- `POST /api/auth/partner/login` - Partner login

### Restaurants
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/:id` - Get restaurant by ID

### Delivery Partners
- `GET /api/partners` - Get all delivery partners

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders
- `PATCH /api/orders/:id` - Update order status

## Database Schema

The database consists of the following tables:
- `users` - Customer accounts
- `restaurants` - Restaurant accounts and details
- `menu_items` - Menu items for each restaurant
- `delivery_partners` - Delivery partner accounts
- `orders` - Order information
- `order_items` - Items in each order

## Notes

- Passwords are hashed using bcrypt
- The seed data includes 6 Delhi-based restaurants with full menus
- 6 delivery partners with vehicle details are pre-loaded
- All coordinates are for actual Delhi locations
