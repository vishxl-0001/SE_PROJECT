import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, User, Phone } from 'lucide-react';
import { Order } from '../App';
import { delhiPartners } from '../data/partners';
import { Button } from './ui/button';
import DeliveryMap from './DeliveryMap';

interface OrderTrackingProps {
  orders: Order[];
  updateOrder: (orderId: string, updates: Partial<Order>) => void;
  userType: string | null;
}

export default function OrderTracking({ orders, updateOrder, userType }: OrderTrackingProps) {
  const { id } = useParams<{ id: string }>();
  const order = orders.find(o => o.id === id);
  const [partner, setPartner] = useState<typeof delhiPartners[0] | null>(null);

  useEffect(() => {
    if (!order) return;

    // Assign partner if order is accepted
    if (order.status === 'accepted' && !order.partnerId) {
      const availablePartner = delhiPartners.find(p => p.isAvailable);
      if (availablePartner) {
        updateOrder(order.id, { 
          partnerId: availablePartner.id,
          status: 'preparing'
        });
        setPartner(availablePartner);
      }
    } else if (order.partnerId) {
      const foundPartner = delhiPartners.find(p => p.id === order.partnerId);
      if (foundPartner) setPartner(foundPartner);
    }
  }, [order?.status, order?.partnerId]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Order not found</p>
      </div>
    );
  }

  const statusSteps = [
    { key: 'pending', label: 'Order Placed' },
    { key: 'accepted', label: 'Order Accepted' },
    { key: 'preparing', label: 'Preparing' },
    { key: 'out_for_delivery', label: 'Out for Delivery' },
    { key: 'delivered', label: 'Delivered' }
  ];

  const currentStepIndex = statusSteps.findIndex(s => s.key === order.status);

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
            <div>
              <h1 className="text-gray-900">Order Tracking</h1>
              <p className="text-sm text-gray-600">Order ID: {order.id}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Order Status */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
          <h3 className="text-gray-900 mb-4">Order Status</h3>
          <div className="relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
              <div
                className="h-full bg-orange-500 transition-all"
                style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
              />
            </div>
            <div className="relative flex justify-between">
              {statusSteps.map((step, index) => (
                <div key={step.key} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index <= currentStepIndex
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {index < currentStepIndex ? '✓' : index + 1}
                  </div>
                  <span className="text-xs text-gray-600 mt-2 text-center max-w-20">
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Map */}
<         div className="bg-white rounded-lg shadow-sm p-4 mb-4">
           <h3 className="text-gray-900 mb-4">Live Tracking</h3>
           <DeliveryMap
             customerLocation={{ lat: 28.6139, lng: 77.2090 }}
             restaurantLocation={{ lat: 28.6431, lng: 77.1840 }}
             partnerLocation={{ lat: 28.6200, lng: 77.2100 }}
          />
        </div>
        

        {/* Delivery Partner Info */}
        {partner && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h3 className="text-gray-900 mb-4">Delivery Partner</h3>
            <div className="flex items-center gap-4">
              <img
                src={partner.photo}
                alt={partner.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h4 className="text-gray-900">{partner.name}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <Phone className="w-4 h-4" />
                  <span>{partner.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <span className="text-orange-500">★</span>
                  <span>{partner.rating}</span>
                  <span>•</span>
                  <span>{partner.deliveriesCompleted} deliveries</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 capitalize">{partner.vehicleType}</p>
                <p className="text-sm text-gray-900">{partner.vehicleNumber}</p>
              </div>
            </div>
          </div>
        )}

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h3 className="text-gray-900 mb-4">Order Details</h3>
          <div className="space-y-2 mb-4">
            {order.items.map(item => (
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
              <span className="text-gray-600">Delivery Fee</span>
              <span className="text-gray-900">₹{order.deliveryFee}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">₹{order.total}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Payment Method</span>
              <span className="text-gray-900 uppercase">{order.paymentMethod}</span>
            </div>
          </div>
          <div className="border-t mt-4 pt-4">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-gray-600 mt-1" />
              <div>
                <p className="text-sm text-gray-600">Delivery Address</p>
                <p className="text-gray-900">{order.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
