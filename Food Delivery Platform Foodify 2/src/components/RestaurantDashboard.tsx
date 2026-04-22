import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Package, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Order } from '../App';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface RestaurantDashboardProps {
  userId: string | null;
  orders: Order[];
  updateOrder: (orderId: string, updates: Partial<Order>) => void;
  logout: () => void;
}

export default function RestaurantDashboard({ userId, orders, updateOrder, logout }: RestaurantDashboardProps) {
  const [activeTab, setActiveTab] = useState('pending');

  // Filter orders for this restaurant (in real app, would filter by restaurant ID)
  const pendingOrders = orders.filter(o => o.status === 'pending');
  const activeOrders = orders.filter(o => ['accepted', 'preparing', 'out_for_delivery'].includes(o.status));
  const completedOrders = orders.filter(o => o.status === 'delivered');

  const handleAcceptOrder = (orderId: string) => {
    updateOrder(orderId, { status: 'accepted' });
  };

  const handleRejectOrder = (orderId: string) => {
    // In real app, would handle rejection properly
    updateOrder(orderId, { status: 'delivered' });
  };

  const handleMarkReady = (orderId: string) => {
    updateOrder(orderId, { status: 'out_for_delivery' });
  };

  const renderOrder = (order: Order, showActions: boolean) => (
    <div key={order.id} className="bg-white rounded-lg p-4 shadow-sm mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-gray-900">Order #{order.id}</h3>
          <p className="text-sm text-gray-600 mt-1">{order.address}</p>
        </div>
        <Badge className={
          order.status === 'pending' ? 'bg-yellow-500' :
          order.status === 'delivered' ? 'bg-green-500' :
          'bg-blue-500'
        }>
          {order.status.replace('_', ' ').toUpperCase()}
        </Badge>
      </div>

      <div className="space-y-2 mb-3">
        {order.items.map(item => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="text-gray-600">
              {item.name} x {item.quantity}
            </span>
            <span className="text-gray-900">₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="border-t pt-3 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">Total Amount</p>
          <p className="text-gray-900">₹{order.total}</p>
          <p className="text-sm text-gray-600 mt-1">
            Payment: <span className="uppercase">{order.paymentMethod}</span>
          </p>
        </div>
        
        {showActions && (
          <div className="flex gap-2">
            {order.status === 'pending' && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleRejectOrder(order.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Reject
                </Button>
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => handleAcceptOrder(order.id)}
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Accept
                </Button>
              </>
            )}
            {(order.status === 'accepted' || order.status === 'preparing') && (
              <Button
                size="sm"
                className="bg-orange-500 hover:bg-orange-600"
                onClick={() => handleMarkReady(order.id)}
              >
                <Package className="w-4 h-4 mr-1" />
                Ready for Pickup
              </Button>
            )}
          </div>
        )}
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
                <h1 className="text-gray-900">Restaurant Dashboard</h1>
                <p className="text-sm text-gray-600">Manage your orders</p>
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
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending Orders</p>
                <p className="text-2xl text-gray-900">{pendingOrders.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Orders</p>
                <p className="text-2xl text-gray-900">{activeOrders.length}</p>
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
            <TabsTrigger value="pending">
              Pending ({pendingOrders.length})
            </TabsTrigger>
            <TabsTrigger value="active">
              Active ({activeOrders.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedOrders.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            {pendingOrders.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <p className="text-gray-500">No pending orders</p>
              </div>
            ) : (
              pendingOrders.map(order => renderOrder(order, true))
            )}
          </TabsContent>

          <TabsContent value="active">
            {activeOrders.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <p className="text-gray-500">No active orders</p>
              </div>
            ) : (
              activeOrders.map(order => renderOrder(order, true))
            )}
          </TabsContent>

          <TabsContent value="completed">
            {completedOrders.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <p className="text-gray-500">No completed orders</p>
              </div>
            ) : (
              completedOrders.map(order => renderOrder(order, false))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
