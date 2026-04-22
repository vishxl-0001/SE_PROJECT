import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Package, MapPin, CheckCircle } from 'lucide-react';
import { Order } from '../App';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface PartnerDashboardProps {
  userId: string | null;
  orders: Order[];
  updateOrder: (orderId: string, updates: Partial<Order>) => void;
  logout: () => void;
}

export default function PartnerDashboard({ userId, orders, updateOrder, logout }: PartnerDashboardProps) {
  const [activeTab, setActiveTab] = useState('available');

  // Filter orders (in real app, would filter by partner ID)
  const availableOrders = orders.filter(o => o.status === 'out_for_delivery' && !o.partnerId);
  const myOrders = orders.filter(o => o.partnerId === userId && o.status === 'out_for_delivery');
  const completedOrders = orders.filter(o => o.partnerId === userId && o.status === 'delivered');

  const handleAcceptDelivery = (orderId: string) => {
    updateOrder(orderId, { 
      partnerId: userId || undefined
    });
  };

  const handleCompleteDelivery = (orderId: string) => {
    updateOrder(orderId, { status: 'delivered' });
  };

  const renderOrder = (order: Order, showAccept: boolean, showComplete: boolean) => (
    <div key={order.id} className="bg-white rounded-lg p-4 shadow-sm mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-gray-900">Order #{order.id}</h3>
          <div className="flex items-start gap-2 mt-2">
            <MapPin className="w-4 h-4 text-gray-600 mt-1" />
            <p className="text-sm text-gray-600">{order.address}</p>
          </div>
        </div>
        <Badge className={
          order.status === 'delivered' ? 'bg-green-500' : 'bg-blue-500'
        }>
          {order.status.replace('_', ' ').toUpperCase()}
        </Badge>
      </div>

      <div className="border-t pt-3 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">Delivery Fee</p>
          <p className="text-gray-900">₹{order.deliveryFee}</p>
          <p className="text-sm text-gray-600 mt-1">
            Total Order: ₹{order.total}
          </p>
          <p className="text-sm text-gray-600">
            Payment: <span className="uppercase">{order.paymentMethod}</span>
          </p>
        </div>
        
        <div className="flex gap-2">
          {showAccept && (
            <Button
              size="sm"
              className="bg-orange-500 hover:bg-orange-600"
              onClick={() => handleAcceptDelivery(order.id)}
            >
              <Package className="w-4 h-4 mr-1" />
              Accept Delivery
            </Button>
          )}
          {showComplete && (
            <Link to={`/order/${order.id}`}>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleCompleteDelivery(order.id)}
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Mark Delivered
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-gray-900">Partner Dashboard</h1>
                <p className="text-sm text-gray-600">Manage your deliveries</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Available Orders</p>
                <p className="text-2xl text-gray-900">{availableOrders.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">My Deliveries</p>
                <p className="text-2xl text-gray-900">{myOrders.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completed Today</p>
                <p className="text-2xl text-gray-900">{completedOrders.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="available">
              Available ({availableOrders.length})
            </TabsTrigger>
            <TabsTrigger value="my-orders">
              My Deliveries ({myOrders.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedOrders.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="available">
            {availableOrders.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <p className="text-gray-500">No available orders</p>
              </div>
            ) : (
              availableOrders.map(order => renderOrder(order, true, false))
            )}
          </TabsContent>

          <TabsContent value="my-orders">
            {myOrders.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <p className="text-gray-500">No active deliveries</p>
              </div>
            ) : (
              myOrders.map(order => renderOrder(order, false, true))
            )}
          </TabsContent>

          <TabsContent value="completed">
            {completedOrders.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <p className="text-gray-500">No completed deliveries</p>
              </div>
            ) : (
              completedOrders.map(order => renderOrder(order, false, false))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
