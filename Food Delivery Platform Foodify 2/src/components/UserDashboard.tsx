import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Package, Clock, CheckCircle } from 'lucide-react';
import { Order } from '../App';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface UserDashboardProps {
  userId: string | null;
  orders: Order[];
  logout: () => void;
}

export default function UserDashboard({ userId, orders, logout }: UserDashboardProps) {
  const activeOrders = orders.filter(o => o.status !== 'delivered');
  const pastOrders = orders.filter(o => o.status === 'delivered');

  const renderOrder = (order: Order) => (
    <Link
      key={order.id}
      to={`/order/${order.id}`}
      className="bg-white rounded-lg p-4 shadow-sm mb-4 block hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-gray-900">Order #{order.id}</h3>
          <p className="text-sm text-gray-600 mt-1">
            {order.items.length} item{order.items.length > 1 ? 's' : ''}
          </p>
        </div>
        <Badge className={
          order.status === 'pending' ? 'bg-yellow-500' :
          order.status === 'delivered' ? 'bg-green-500' :
          'bg-blue-500'
        }>
          {order.status.replace('_', ' ').toUpperCase()}
        </Badge>
      </div>

      <div className="space-y-1 mb-3">
        {order.items.map(item => (
          <p key={item.id} className="text-sm text-gray-600">
            {item.name} x {item.quantity}
          </p>
        ))}
      </div>

      <div className="border-t pt-3 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">Total Amount</p>
          <p className="text-gray-900">₹{order.total}</p>
        </div>
        <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
          View Details
        </Button>
      </div>
    </Link>
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
                <h1 className="text-gray-900">My Orders</h1>
                <p className="text-sm text-gray-600">Track and manage your orders</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
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
                <p className="text-sm text-gray-600">Past Orders</p>
                <p className="text-2xl text-gray-900">{pastOrders.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Active Orders */}
        {activeOrders.length > 0 && (
          <div className="mb-8">
            <h2 className="text-gray-900 mb-4">Active Orders</h2>
            {activeOrders.map(renderOrder)}
          </div>
        )}

        {/* Past Orders */}
        {pastOrders.length > 0 && (
          <div>
            <h2 className="text-gray-900 mb-4">Past Orders</h2>
            {pastOrders.map(renderOrder)}
          </div>
        )}

        {/* Empty State */}
        {orders.length === 0 && (
          <div className="bg-white rounded-lg p-8 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No orders yet</p>
            <Link to="/">
              <Button className="bg-orange-500 hover:bg-orange-600">
                Start Ordering
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
