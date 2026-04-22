import React, { useEffect, useRef } from 'react';
import { MapPin, Store, User } from 'lucide-react';

interface Location {
  lat: number;
  lng: number;
}

interface DeliveryMapProps {
  customerLocation: Location;
  restaurantLocation: Location;
  partnerLocation: Location;
}

export default function DeliveryMap({ customerLocation, restaurantLocation, partnerLocation }: DeliveryMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = rect.width;
    const height = rect.height;

    // Clear canvas
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, width, height);

    // Draw grid pattern for map-like appearance
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i < width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    for (let i = 0; i < height; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }

    // Calculate bounds
    const allLats = [customerLocation.lat, restaurantLocation.lat, partnerLocation.lat];
    const allLngs = [customerLocation.lng, restaurantLocation.lng, partnerLocation.lng];
    const minLat = Math.min(...allLats);
    const maxLat = Math.max(...allLats);
    const minLng = Math.min(...allLngs);
    const maxLng = Math.max(...allLngs);

    // Add padding
    const padding = 60;
    const latRange = maxLat - minLat || 0.01;
    const lngRange = maxLng - minLng || 0.01;

    // Convert lat/lng to canvas coordinates
    const toCanvas = (lat: number, lng: number) => {
      const x = padding + ((lng - minLng) / lngRange) * (width - 2 * padding);
      const y = height - padding - ((lat - minLat) / latRange) * (height - 2 * padding);
      return { x, y };
    };

    const restaurantPos = toCanvas(restaurantLocation.lat, restaurantLocation.lng);
    const customerPos = toCanvas(customerLocation.lat, customerLocation.lng);
    const partnerPos = toCanvas(partnerLocation.lat, partnerLocation.lng);

    // Draw route line from restaurant to customer
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(restaurantPos.x, restaurantPos.y);
    ctx.lineTo(customerPos.x, customerPos.y);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw route from partner to customer
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(partnerPos.x, partnerPos.y);
    ctx.lineTo(customerPos.x, customerPos.y);
    ctx.stroke();

    // Draw markers
    const drawMarker = (x: number, y: number, color: string, label: string) => {
      // Marker pin
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y - 15, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x, y - 3);
      ctx.lineTo(x - 6, y - 12);
      ctx.lineTo(x + 6, y - 12);
      ctx.closePath();
      ctx.fill();

      // White center
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(x, y - 15, 5, 0, Math.PI * 2);
      ctx.fill();

      // Label background
      ctx.fillStyle = 'white';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetY = 2;
      const textWidth = ctx.measureText(label).width;
      ctx.fillRect(x - textWidth / 2 - 8, y + 5, textWidth + 16, 24);
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;

      // Label text
      ctx.fillStyle = '#374151';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(label, x, y + 20);
    };

    drawMarker(restaurantPos.x, restaurantPos.y, '#f97316', 'Restaurant');
    drawMarker(customerPos.x, customerPos.y, '#ef4444', 'Delivery Location');
    drawMarker(partnerPos.x, partnerPos.y, '#10b981', 'Delivery Partner');

  }, [customerLocation, restaurantLocation, partnerLocation]);

  return (
    <div className="relative h-80 rounded-lg overflow-hidden border border-gray-200">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3 space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <span className="text-gray-700">Restaurant</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-gray-700">Your Location</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-gray-700">Delivery Partner</span>
        </div>
      </div>
    </div>
  );
}
