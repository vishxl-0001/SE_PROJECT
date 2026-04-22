# Foodify - Complete Setup Guide

This guide will help you connect your Foodify React application to a MySQL database.

## Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Step-by-Step Setup

### 1. Database Setup

#### Install MySQL
If you haven't installed MySQL yet:

**Windows:**
- Download MySQL Installer from https://dev.mysql.com/downloads/installer/
- Run the installer and follow the setup wizard
- Remember the root password you set

**Mac:**
```bash
brew install mysql
brew services start mysql
```

**Linux:**
```bash
sudo apt-get update
sudo apt-get install mysql-server
sudo systemctl start mysql
```

#### Create Database and Tables

1. Login to MySQL:
```bash
mysql -u root -p
```

2. Create the database:
```sql
CREATE DATABASE foodify;
exit;
```

3. Run the schema file to create tables:
```bash
cd server
mysql -u root -p foodify < schema.sql
```

4. Run the seed file to insert sample data:
```bash
mysql -u root -p foodify < seed.sql
```

### 2. Backend Server Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Edit `.env` file with your MySQL credentials:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=foodify
PORT=3001
```

5. Start the server:
```bash
# Development mode (auto-restart on changes)
npm run dev

# OR Production mode
npm start
```

The server should start on `http://localhost:3001`

### 3. Frontend Setup

1. Go back to the root directory:
```bash
cd ..
```

2. Create frontend environment file:
```bash
cp .env.example .env
```

3. Edit `.env` file:
```env
VITE_API_URL=http://localhost:3001/api
VITE_RAZORPAY_KEY=rzp_live_RZfRqaxQo1mJtf
```

4. Update your frontend to use the API (see next section)

### 4. Connect Frontend to Backend

To use the real database instead of localStorage, you need to update the App.tsx and components to use the API service.

The API service is already created in `/services/api.ts` with all the endpoints.

#### Key Changes Needed:

**In App.tsx:**
- Replace localStorage calls with API calls
- Use `restaurantAPI.getAll()` instead of `delhiRestaurants`
- Use `orderAPI.create()` and `orderAPI.getAll()` for orders
- Use `authAPI` for authentication

**In Auth Components:**
- Replace mock authentication with `authAPI.userLogin()`, `authAPI.restaurantLogin()`, etc.

**In HomePage:**
- Fetch restaurants from API: `restaurantAPI.getAll()`

**In OrderTracking:**
- Fetch partners from API: `partnerAPI.getAll()`
- Update orders via: `orderAPI.update()`

### 5. Testing the Setup

1. **Test Database Connection:**
```bash
cd server
mysql -u root -p foodify -e "SELECT COUNT(*) FROM restaurants;"
```
Should show: 6 restaurants

2. **Test Backend API:**
```bash
# In a new terminal
curl http://localhost:3001/api/restaurants
```
Should return JSON with restaurants

3. **Test Frontend:**
```bash
npm run dev
```
Visit `http://localhost:5173` and try:
- Viewing restaurants
- Logging in
- Creating orders

## API Endpoints Reference

### Authentication
```
POST /api/auth/user/register
POST /api/auth/user/login
POST /api/auth/restaurant/register
POST /api/auth/restaurant/login
POST /api/auth/partner/register
POST /api/auth/partner/login
```

### Restaurants
```
GET /api/restaurants
GET /api/restaurants/:id
```

### Delivery Partners
```
GET /api/partners
```

### Orders
```
POST /api/orders
GET /api/orders
PATCH /api/orders/:id
```

## Using the API Service

Example usage in your components:

```typescript
import api from '../services/api';

// In your component
const fetchRestaurants = async () => {
  try {
    const restaurants = await api.restaurants.getAll();
    setRestaurants(restaurants);
  } catch (error) {
    console.error('Failed to fetch restaurants:', error);
  }
};

// Login
const handleLogin = async (email, password) => {
  try {
    const result = await api.auth.userLogin({ email, password });
    // Handle successful login
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

## Troubleshooting

### MySQL Connection Issues
- Check if MySQL is running: `sudo systemctl status mysql` (Linux) or `brew services list` (Mac)
- Verify credentials in `.env` file
- Check MySQL port (default: 3306)

### Backend Server Issues
- Make sure port 3001 is not in use
- Check server logs for errors
- Verify MySQL connection in server console

### CORS Issues
- Backend already has CORS enabled for all origins
- If issues persist, check browser console

### API Not Found
- Make sure backend server is running on port 3001
- Verify `VITE_API_URL` in frontend `.env` file

## Production Deployment

For production:

1. **Database:**
   - Use a production MySQL server (AWS RDS, Google Cloud SQL, etc.)
   - Update connection credentials

2. **Backend:**
   - Deploy to a hosting service (Heroku, DigitalOcean, AWS, etc.)
   - Set environment variables on the hosting platform
   - Use `npm start` instead of `npm run dev`

3. **Frontend:**
   - Update `VITE_API_URL` to your production backend URL
   - Build: `npm run build`
   - Deploy the `dist` folder to Vercel, Netlify, etc.

## Next Steps

1. Replace localStorage with API calls throughout the app
2. Add proper error handling and loading states
3. Implement JWT tokens for authentication
4. Add image upload functionality for restaurants and partners
5. Implement real-time order tracking with WebSockets
6. Add payment webhook handling for Razorpay

## Support

For issues or questions:
- Check the server logs
- Verify database contains data: `mysql -u root -p foodify -e "SELECT * FROM restaurants;"`
- Make sure both frontend and backend are running
