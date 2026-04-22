import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Leaf, Plus, Minus, ShoppingCart } from 'lucide-react';
import { delhiRestaurants } from '../data/restaurants';
import { CartItem } from '../App';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import { UserType } from '../App';

interface RestaurantDetailProps {
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  updateCartItem: (id: string, quantity: number) => void;
  cartItems: CartItem[];
  userType: UserType;
}

export default function RestaurantDetail({ addToCart, updateCartItem, cartItems, userType }: RestaurantDetailProps) {
  const { id } = useParams<{ id: string }>();
  const restaurant = delhiRestaurants.find(r => r.id === id);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Restaurant not found</p>
      </div>
    );
  }

  const categories = ['All', ...Array.from(new Set(restaurant.menu.map(item => item.category)))];
  const filteredMenu = selectedCategory === 'All'
    ? restaurant.menu
    : restaurant.menu.filter(item => item.category === selectedCategory);

  const getItemQuantity = (itemId: string) => {
    const cartItem = cartItems.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAddToCart = (item: typeof restaurant.menu[0]) => {
    if (userType !== 'user') {
      toast.error('Please login as a user to add items to cart');
      return;
    }
    
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      restaurant: restaurant.name,
      isVeg: item.isVeg
    });
  };

  const handleIncrement = (item: typeof restaurant.menu[0]) => {
    if (userType !== 'user') {
      toast.error('Please login as a user to add items to cart');
      return;
    }
    
    const quantity = getItemQuantity(item.id);
    if (quantity === 0) {
      handleAddToCart(item);
    } else {
      updateCartItem(item.id, quantity + 1);
    }
  };

  const handleDecrement = (itemId: string) => {
    const quantity = getItemQuantity(itemId);
    if (quantity > 0) {
      updateCartItem(itemId, quantity - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-gray-900">{restaurant.name}</h1>
              <p className="text-sm text-gray-600">{restaurant.cuisine.join(', ')}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Restaurant Info */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="relative h-64 rounded-lg overflow-hidden mb-4">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
            {restaurant.isVeg && (
              <Badge className="absolute top-4 right-4 bg-green-600">
                <Leaf className="w-4 h-4 mr-1" />
                Pure Veg
              </Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <span className="text-orange-500">★</span>
                <span>{restaurant.rating}</span>
              </div>
              <span className="text-gray-600">{restaurant.deliveryTime}</span>
              <span className="text-gray-600">{restaurant.priceRange} for one</span>
            </div>
            <Link to="/cart">
              <Button className="bg-orange-500 hover:bg-orange-600">
                <ShoppingCart className="w-4 h-4 mr-2" />
                View Cart
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-gray-500 mt-2">{restaurant.address}</p>
        </div>
      </div>

      {/* Menu */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Category Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? 'bg-orange-500 hover:bg-orange-600' : ''}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="space-y-4">
          {filteredMenu.map(item => {
            const quantity = getItemQuantity(item.id);
            
            return (
              <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start">
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
                    <p className="text-gray-900 mb-2">₹{item.price}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  
                  {quantity === 0 ? (
                    <Button
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600"
                      onClick={() => handleIncrement(item)}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2 border border-orange-500 rounded">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDecrement(item.id)}
                        className="h-8 w-8 p-0 hover:bg-orange-50 text-orange-500"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center text-orange-500">{quantity}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleIncrement(item)}
                        className="h-8 w-8 p-0 hover:bg-orange-50 text-orange-500"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
