export interface DeliveryPartner {
  id: string;
  name: string;
  phone: string;
  vehicleType: 'bike' | 'scooter' | 'bicycle';
  vehicleNumber: string;
  photo: string;
  location: { lat: number; lng: number };
  isAvailable: boolean;
  rating: number;
  deliveriesCompleted: number;
}

export const delhiPartners: DeliveryPartner[] = [
  {
    id: 'p1',
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    vehicleType: 'bike',
    vehicleNumber: 'DL 5C AB 1234',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    location: { lat: 28.6400, lng: 77.2000 },
    isAvailable: true,
    rating: 4.7,
    deliveriesCompleted: 1250
  },
  {
    id: 'p2',
    name: 'Amit Sharma',
    phone: '+91 98765 43211',
    vehicleType: 'scooter',
    vehicleNumber: 'DL 8S CD 5678',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    location: { lat: 28.6300, lng: 77.2200 },
    isAvailable: true,
    rating: 4.5,
    deliveriesCompleted: 980
  },
  {
    id: 'p3',
    name: 'Vikram Singh',
    phone: '+91 98765 43212',
    vehicleType: 'bike',
    vehicleNumber: 'DL 3C EF 9012',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200',
    location: { lat: 28.6500, lng: 77.2300 },
    isAvailable: true,
    rating: 4.8,
    deliveriesCompleted: 1450
  },
  {
    id: 'p4',
    name: 'Suresh Yadav',
    phone: '+91 98765 43213',
    vehicleType: 'bicycle',
    vehicleNumber: 'N/A',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200',
    location: { lat: 28.6200, lng: 77.2100 },
    isAvailable: true,
    rating: 4.6,
    deliveriesCompleted: 750
  },
  {
    id: 'p5',
    name: 'Manoj Verma',
    phone: '+91 98765 43214',
    vehicleType: 'scooter',
    vehicleNumber: 'DL 1S GH 3456',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    location: { lat: 28.6100, lng: 77.1900 },
    isAvailable: true,
    rating: 4.4,
    deliveriesCompleted: 820
  },
  {
    id: 'p6',
    name: 'Deepak Chauhan',
    phone: '+91 98765 43215',
    vehicleType: 'bike',
    vehicleNumber: 'DL 6C IJ 7890',
    photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200',
    location: { lat: 28.6600, lng: 77.2400 },
    isAvailable: false,
    rating: 4.9,
    deliveriesCompleted: 1680
  }
];
