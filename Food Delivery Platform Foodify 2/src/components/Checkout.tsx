import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Banknote } from 'lucide-react';
import { CartItem, Order } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { toast } from 'sonner@2.0.3';

interface CheckoutProps {
  cartItems: CartItem[];
  createOrder: (order: Order) => void;
}

// Razorpay types
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Checkout({ cartItems, createOrder }: CheckoutProps) {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'razorpay'>('cod');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 40;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    if (!name || !address || !phone) {
      toast.error('Please fill all delivery details');
      return;
    }

    if (paymentMethod === 'razorpay') {
      loadRazorpay();
    } else {
      placeOrder();
    }
  };

  const loadRazorpay = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => initRazorpay();
    script.onerror = () => {
      toast.error('Failed to load Razorpay. Please try COD.');
    };
    document.body.appendChild(script);
  };

  const initRazorpay = () => {
    const options = {
      key: 'rzp_live_RZfRqaxQo1mJtf',
      amount: total * 100, // Amount in paise
      currency: 'INR',
      name: 'Foodify',
      description: 'Food Order Payment',
      handler: function (response: any) {
        toast.success('Payment successful!');
        placeOrder();
      },
      prefill: {
        name: name,
        contact: phone,
      },
      theme: {
        color: '#f97316',
      },
      modal: {
        ondismiss: function() {
          toast.error('Payment cancelled');
        }
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const placeOrder = () => {
    const restaurantId = cartItems[0]?.restaurant || '';
    
    const order: Order = {
      id: `ORD${Date.now()}`,
      items: cartItems,
      total: total,
      deliveryFee: deliveryFee,
      address: address,
      paymentMethod: paymentMethod,
      status: 'preparing',
      restaurantId: restaurantId,
      customerLocation: { lat: 28.6139, lng: 77.2090 }, // Default Delhi location
      restaurantLocation: { lat: 28.6431, lng: 77.1840 }
    };

    createOrder(order);
    toast.success('Order placed successfully!');
    navigate(`/order/${order.id}`);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link to="/">
            <Button className="bg-orange-500 hover:bg-orange-600">
              Browse Restaurants
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/cart">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <h1 className="text-gray-900">Checkout</h1>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Delivery Details */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h3 className="text-gray-900 mb-4">Delivery Details</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <Label htmlFor="address">Delivery Address</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter complete delivery address"
              />
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h3 className="text-gray-900 mb-4">Payment Method</h3>
          <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
            <div className="flex items-center space-x-2 p-3 border rounded-lg mb-2 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="cod" id="cod" />
              <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer flex-1">
                <Banknote className="w-5 h-5" />
                <div>
                  <p className="text-gray-900">Cash on Delivery</p>
                  <p className="text-sm text-gray-600">Pay when you receive</p>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="razorpay" id="razorpay" />
              <Label htmlFor="razorpay" className="flex items-center gap-2 cursor-pointer flex-1">
                <CreditCard className="w-5 h-5" />
                <div>
                  <p className="text-gray-900">Razorpay</p>
                  <p className="text-sm text-gray-600">Pay online via card, UPI, wallet</p>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h3 className="text-gray-900 mb-3">Order Summary</h3>
          <div className="space-y-2 mb-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {item.name} x {item.quantity}
                </span>
                <span className="text-gray-900">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2 border-t pt-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="text-gray-900">₹{deliveryFee}</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">₹{total}</span>
            </div>
          </div>
        </div>

        {/* Place Order Button */}
        <Button
          className="w-full bg-orange-500 hover:bg-orange-600"
          onClick={handlePlaceOrder}
        >
          {paymentMethod === 'razorpay' ? 'Pay ₹' + total : 'Place Order (COD)'}
        </Button>
      </div>
    </div>
  );
}
