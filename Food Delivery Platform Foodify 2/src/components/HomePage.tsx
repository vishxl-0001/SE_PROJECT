import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, MapPin, User, ShoppingCart, Leaf, Store, Bike, ChefHat, Package, Clock, Star } from 'lucide-react';
import { delhiRestaurants } from '../data/restaurants';
import { UserType } from '../App';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface HomePageProps {
  userType: UserType;
  logout: () => void;
}

type SortOption = 'rating' | 'deliveryTime' | 'price';

export default function HomePage({ userType, logout }: HomePageProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showVegOnly, setShowVegOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('rating');

  // Redirect to dashboards if logged in as restaurant or partner
  React.useEffect(() => {
    if (userType === 'restaurant') {
      navigate('/restaurant-dashboard', { replace: true });
    } else if (userType === 'partner') {
      navigate('/partner-dashboard', { replace: true });
    }
  }, [userType, navigate]);

  // Don't render if redirecting
  if (userType === 'restaurant' || userType === 'partner') {
    return null;
  }

  const filteredRestaurants = delhiRestaurants
    .filter(restaurant => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesVeg = !showVegOnly || restaurant.isVeg;
      return matchesSearch && matchesVeg;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'deliveryTime') {
        const timeA = parseInt(a.deliveryTime.split('-')[0]);
        const timeB = parseInt(b.deliveryTime.split('-')[0]);
        return timeA - timeB;
      }
      if (sortBy === 'price') {
        const priceA = parseInt(a.priceRange.replace('₹', ''));
        const priceB = parseInt(b.priceRange.replace('₹', ''));
        return priceA - priceB;
      }
      return 0;
    });

  // Show guest landing page if not logged in
  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white"/>
                    <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2"/>
                    <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2"/>
                  </svg>
                </div>
                <h1 className="text-orange-500">Foodify</h1>
              </div>
              
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-gray-900 mb-4">Order Food From Your Favorite Restaurants in Delhi</h1>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Fast delivery, great food, and amazing restaurants all in one place. Join thousands of satisfied customers.
          </p>
          <div className="flex justify-center gap-4 mb-12">
            <Link to="/login">
              <Button className="bg-orange-500 hover:bg-orange-600">
                <User className="w-4 h-4 mr-2" />
                Order Food
              </Button>
            </Link>
          </div>

          {/* Preview Image */}
          <div className="rounded-lg overflow-hidden shadow-2xl max-w-4xl mx-auto">
            <img 
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800" 
              alt="Delicious food"
              className="w-full h-96 object-cover"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-center text-gray-900 mb-12">Join Foodify</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* For Customers */}
            <div className="bg-white rounded-lg p-8 shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-gray-900 mb-3">For Customers</h3>
              <p className="text-gray-600 mb-6">
                Order from your favorite restaurants with fast delivery and great deals
              </p>
              <Link to="/login">
                <Button className="bg-orange-500 hover:bg-orange-600 w-full">
                  Order Now
                </Button>
              </Link>
            </div>

            {/* For Restaurants */}
            <div className="bg-white rounded-lg p-8 shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Store className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-gray-900 mb-3">For Restaurants</h3>
              <p className="text-gray-600 mb-6">
                Grow your business and reach thousands of hungry customers
              </p>
              <Link to="/restaurant-login">
                <Button variant="outline" className="w-full">
                  Partner With Us
                </Button>
              </Link>
            </div>

            {/* For Delivery Partners */}
            <div className="bg-white rounded-lg p-8 shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bike className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-gray-900 mb-3">For Delivery Partners</h3>
              <p className="text-gray-600 mb-6">
                Earn money on your schedule with flexible delivery opportunities
              </p>
              <Link to="/partner-login">
                <Button variant="outline" className="w-full">
                  Become a Partner
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-orange-500 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
              <div>
                <div className="mb-2">500+</div>
                <p className="text-orange-100">Restaurants</p>
              </div>
              <div>
                <div className="mb-2">10,000+</div>
                <p className="text-orange-100">Happy Customers</p>
              </div>
              <div>
                <div className="mb-2">200+</div>
                <p className="text-orange-100">Delivery Partners</p>
              </div>
              <div>
                <div className="mb-2">50,000+</div>
                <p className="text-orange-100">Orders Delivered</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="bg-orange-500 p-2 rounded-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white"/>
                  <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2"/>
                  <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2"/>
                </svg>
              </div>
              <span>Foodify</span>
            </div>
            <p className="text-gray-400 text-sm">© 2025 Foodify. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  }

  // Show restaurant browsing page for logged-in users
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-orange-500 p-2 rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white"/>
                  <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2"/>
                  <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2"/>
                </svg>
              </div>
              <div>
                <h1 className="text-orange-500">Foodify</h1>
                <div className="flex items-center gap-1 text-gray-600 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>Delhi, India</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {userType === 'user' ? (
                <>
                  <Link to="/user-dashboard">
                    <Button variant="ghost" size="sm">
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link to="/cart">
                    <Button variant="ghost" size="sm">
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={logout}>
                    Logout
                  </Button>
                </>
              ) : userType === 'restaurant' ? (
                <>
                  <Link to="/restaurant-dashboard">
                    <Button variant="ghost" size="sm">Dashboard</Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
                </>
              ) : userType === 'partner' ? (
                <>
                  <Link to="/partner-dashboard">
                    <Button variant="ghost" size="sm">Dashboard</Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" size="sm">User Login</Button>
                  </Link>
                  <Link to="/restaurant-login">
                    <Button variant="outline" size="sm">Restaurant</Button>
                  </Link>
                  <Link to="/partner-login">
                    <Button variant="outline" size="sm">Partner</Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for restaurants and cuisines"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant={showVegOnly ? "default" : "outline"}
              onClick={() => setShowVegOnly(!showVegOnly)}
              className={showVegOnly ? "bg-green-600 hover:bg-green-700" : ""}
            >
              <Leaf className="w-4 h-4 mr-2" />
              Pure Veg
            </Button>
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-2 mt-3">
            <SlidersHorizontal className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">Sort by:</span>
            <div className="flex gap-2">
              <Button
                variant={sortBy === 'rating' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('rating')}
                className={sortBy === 'rating' ? 'bg-orange-500 hover:bg-orange-600' : ''}
              >
                Rating
              </Button>
              <Button
                variant={sortBy === 'deliveryTime' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('deliveryTime')}
                className={sortBy === 'deliveryTime' ? 'bg-orange-500 hover:bg-orange-600' : ''}
              >
                Delivery Time
              </Button>
              <Button
                variant={sortBy === 'price' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('price')}
                className={sortBy === 'price' ? 'bg-orange-500 hover:bg-orange-600' : ''}
              >
                Price
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Restaurant Grid */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="mb-4 text-gray-800">Restaurants in Delhi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map(restaurant => (
            <Link
              key={restaurant.id}
              to={`/restaurant/${restaurant.id}`}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
                {restaurant.isVeg && (
                  <Badge className="absolute top-2 right-2 bg-green-600">
                    <Leaf className="w-3 h-3 mr-1" />
                    Pure Veg
                  </Badge>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-gray-900 mb-1">{restaurant.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {restaurant.cuisine.join(', ')}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-orange-500">★</span>
                    <span>{restaurant.rating}</span>
                  </div>
                  <span className="text-gray-600">{restaurant.deliveryTime}</span>
                  <span className="text-gray-600">{restaurant.priceRange} for one</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">{restaurant.address}</p>
              </div>
            </Link>
          ))}
        </div>
        
        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No restaurants found matching your criteria</p>
          </div>
        )}
      </main>
    </div>
  );
}
