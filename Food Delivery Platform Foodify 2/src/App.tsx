import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner@2.0.3';
import HomePage from './components/HomePage';
import RestaurantDetail from './components/RestaurantDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderTracking from './components/OrderTracking';
import UserAuth from './components/UserAuth';
import RestaurantAuth from './components/RestaurantAuth';
import PartnerAuth from './components/PartnerAuth';
import RestaurantDashboard from './components/RestaurantDashboard';
import PartnerDashboard from './components/PartnerDashboard';
import UserDashboard from './components/UserDashboard';

export type UserType = 'user' | 'restaurant' | 'partner' | null;

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  restaurant: string;
  isVeg: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  deliveryFee: number;
  address: string;
  paymentMethod: 'cod' | 'razorpay';
  status: 'pending' | 'accepted' | 'preparing' | 'out_for_delivery' | 'delivered';
  restaurantId: string;
  partnerId?: string;
  customerLocation?: { lat: number; lng: number };
  restaurantLocation?: { lat: number; lng: number };
}

function App() {
  const [userType, setUserType] = useState<UserType>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Load from localStorage
    const savedUserType = localStorage.getItem('userType') as UserType;
    const savedUserId = localStorage.getItem('userId');
    const savedCart = localStorage.getItem('cart');
    const savedOrders = localStorage.getItem('orders');
    
    if (savedUserType) setUserType(savedUserType);
    if (savedUserId) setUserId(savedUserId);
    if (savedCart) setCartItems(JSON.parse(savedCart));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  const login = (type: UserType, id: string) => {
    setUserType(type);
    setUserId(id);
    localStorage.setItem('userType', type || '');
    localStorage.setItem('userId', id);
  };

  const logout = () => {
    setUserType(null);
    setUserId(null);
    setCartItems([]);
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    localStorage.removeItem('cart');
  };

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    const existingItem = cartItems.find(i => i.id === item.id);
    let newCart;
    
    if (existingItem) {
      newCart = cartItems.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      newCart = [...cartItems, { ...item, quantity: 1 }];
    }
    
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const updateCartItem = (id: string, quantity: number) => {
    const newCart = quantity === 0
      ? cartItems.filter(item => item.id !== id)
      : cartItems.map(item => item.id === id ? { ...item, quantity } : item);
    
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const createOrder = (order: Order) => {
    const newOrders = [...orders, order];
    setOrders(newOrders);
    localStorage.setItem('orders', JSON.stringify(newOrders));
    clearCart();
  };

  const updateOrder = (orderId: string, updates: Partial<Order>) => {
    const newOrders = orders.map(order =>
      order.id === orderId ? { ...order, ...updates } : order
    );
    setOrders(newOrders);
    localStorage.setItem('orders', JSON.stringify(newOrders));
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage userType={userType} logout={logout} />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail addToCart={addToCart} updateCartItem={updateCartItem} cartItems={cartItems} userType={userType} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} updateCartItem={updateCartItem} />} />
          <Route path="/checkout" element={<Checkout cartItems={cartItems} createOrder={createOrder} />} />
          <Route path="/order/:id" element={<OrderTracking orders={orders} updateOrder={updateOrder} userType={userType} />} />
          <Route path="/login" element={<UserAuth onLogin={login} />} />
          <Route path="/restaurant-login" element={<RestaurantAuth onLogin={login} />} />
          <Route path="/partner-login" element={<PartnerAuth onLogin={login} />} />
          <Route 
            path="/restaurant-dashboard" 
            element={userType === 'restaurant' ? <RestaurantDashboard userId={userId} orders={orders} updateOrder={updateOrder} logout={logout} /> : <Navigate to="/restaurant-login" />} 
          />
          <Route 
            path="/partner-dashboard" 
            element={userType === 'partner' ? <PartnerDashboard userId={userId} orders={orders} updateOrder={updateOrder} logout={logout} /> : <Navigate to="/partner-login" />} 
          />
          <Route 
            path="/user-dashboard" 
            element={userType === 'user' ? <UserDashboard userId={userId} orders={orders} logout={logout} /> : <Navigate to="/login" />} 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
