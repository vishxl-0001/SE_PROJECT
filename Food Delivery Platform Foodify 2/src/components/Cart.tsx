import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../App';
import { Button } from './ui/button';

interface CartProps {
  cartItems: CartItemType[];
  updateCartItem: (id: string, quantity: number) => void;
}

export default function Cart({ cartItems, updateCartItem }: CartProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = cartItems.length > 0 ? 40 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <h1 className="text-gray-900">Cart</h1>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link to="/">
              <Button className="bg-orange-500 hover:bg-orange-600">
                Browse Restaurants
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="bg-white rounded-lg shadow-sm mb-4">
              {cartItems.map(item => (
                <div key={item.id} className="border-b last:border-b-0 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {item.isVeg ? (
                          <div className="w-5 h-5 border-2 border-green-600 flex items-center justify-center">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          </div>
                        ) : (
                          <div className="w-5 h-5 border-2 border-red-600 flex items-center justify-center">
                            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                          </div>
                        )}
                        <h3 className="text-gray-900">{item.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600">{item.restaurant}</p>
                      <p className="text-gray-900 mt-1">₹{item.price}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 border rounded">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateCartItem(item.id, item.quantity - 1)}
                          className="h-8 w-8 p-0"
                        >
                          {item.quantity === 1 ? (
                            <Trash2 className="w-4 h-4 text-red-500" />
                          ) : (
                            <Minus className="w-4 h-4" />
                          )}
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateCartItem(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <span className="w-20 text-right">₹{item.price * item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bill Details */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h3 className="text-gray-900 mb-3">Bill Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="text-gray-900">₹{deliveryFee}</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">₹{total}</span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <Link to="/checkout">
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                Proceed to Checkout
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
