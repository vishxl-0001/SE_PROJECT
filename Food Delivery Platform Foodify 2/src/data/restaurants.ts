export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string[];
  rating: number;
  deliveryTime: string;
  priceRange: string;
  address: string;
  location: { lat: number; lng: number };
  isVeg: boolean;
  menu: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  isVeg: boolean;
  category: string;
  image?: string;
}

export const delhiRestaurants: Restaurant[] = [
  {
    id: 'r1',
    name: 'Haldiram\'s Rajinder Nagar',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
    cuisine: ['North Indian', 'Street Food', 'Sweets'],
    rating: 4.5,
    deliveryTime: '30-40 mins',
    priceRange: '₹200',
    address: 'Rajinder Nagar, New Delhi',
    location: { lat: 28.6431, lng: 77.1840 },
    isVeg: true,
    menu: [
      {
        id: 'm1',
        name: 'Chole Bhature',
        price: 180,
        description: 'Traditional North Indian dish with fluffy bhature and spicy chole',
        isVeg: true,
        category: 'Main Course'
      },
      {
        id: 'm2',
        name: 'Raj Kachori',
        price: 120,
        description: 'Crispy kachori filled with yogurt, chutneys and sev',
        isVeg: true,
        category: 'Starters'
      },
      {
        id: 'm3',
        name: 'Paneer Tikka',
        price: 280,
        description: 'Grilled cottage cheese with aromatic spices',
        isVeg: true,
        category: 'Starters'
      },
      {
        id: 'm4',
        name: 'Gulab Jamun',
        price: 80,
        description: 'Classic Indian dessert soaked in sugar syrup',
        isVeg: true,
        category: 'Desserts'
      }
    ]
  },
  {
    id: 'r2',
    name: 'Karim\'s',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
    cuisine: ['Mughlai', 'Non-Veg', 'Kebabs'],
    rating: 4.7,
    deliveryTime: '40-50 mins',
    priceRange: '₹400',
    address: 'Jama Masjid, Old Delhi',
    location: { lat: 28.6507, lng: 77.2334 },
    isVeg: false,
    menu: [
      {
        id: 'm5',
        name: 'Mutton Korma',
        price: 450,
        description: 'Tender mutton in rich creamy gravy',
        isVeg: false,
        category: 'Main Course'
      },
      {
        id: 'm6',
        name: 'Seekh Kebab',
        price: 380,
        description: 'Minced meat kebabs grilled to perfection',
        isVeg: false,
        category: 'Starters'
      },
      {
        id: 'm7',
        name: 'Chicken Jahangiri',
        price: 420,
        description: 'Signature chicken preparation with royal spices',
        isVeg: false,
        category: 'Main Course'
      },
      {
        id: 'm8',
        name: 'Butter Naan',
        price: 50,
        description: 'Soft butter naan from tandoor',
        isVeg: true,
        category: 'Breads'
      }
    ]
  },
  {
    id: 'r3',
    name: 'Saravana Bhavan',
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400',
    cuisine: ['South Indian', 'Vegetarian'],
    rating: 4.4,
    deliveryTime: '25-35 mins',
    priceRange: '₹250',
    address: 'Connaught Place, New Delhi',
    location: { lat: 28.6315, lng: 77.2167 },
    isVeg: true,
    menu: [
      {
        id: 'm9',
        name: 'Masala Dosa',
        price: 150,
        description: 'Crispy dosa with spiced potato filling',
        isVeg: true,
        category: 'Main Course'
      },
      {
        id: 'm10',
        name: 'Idli Sambar',
        price: 120,
        description: 'Steamed rice cakes with lentil soup',
        isVeg: true,
        category: 'Main Course'
      },
      {
        id: 'm11',
        name: 'Vada Sambar',
        price: 130,
        description: 'Crispy lentil fritters with sambar',
        isVeg: true,
        category: 'Starters'
      },
      {
        id: 'm12',
        name: 'Filter Coffee',
        price: 80,
        description: 'Authentic South Indian filter coffee',
        isVeg: true,
        category: 'Beverages'
      }
    ]
  },
  {
    id: 'r4',
    name: 'Barbeque Nation',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400',
    cuisine: ['Barbeque', 'North Indian', 'Continental'],
    rating: 4.3,
    deliveryTime: '35-45 mins',
    priceRange: '₹800',
    address: 'Janakpuri, New Delhi',
    location: { lat: 28.6219, lng: 77.0851 },
    isVeg: false,
    menu: [
      {
        id: 'm13',
        name: 'BBQ Veg Platter',
        price: 650,
        description: 'Assorted grilled vegetables with sauces',
        isVeg: true,
        category: 'Main Course'
      },
      {
        id: 'm14',
        name: 'BBQ Non-Veg Platter',
        price: 850,
        description: 'Assorted grilled meats and seafood',
        isVeg: false,
        category: 'Main Course'
      },
      {
        id: 'm15',
        name: 'Paneer Tikka',
        price: 320,
        description: 'Grilled cottage cheese marinated in spices',
        isVeg: true,
        category: 'Starters'
      },
      {
        id: 'm16',
        name: 'Chocolate Brownie',
        price: 180,
        description: 'Warm chocolate brownie with ice cream',
        isVeg: true,
        category: 'Desserts'
      }
    ]
  },
  {
    id: 'r5',
    name: 'Diggin Cafe',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
    cuisine: ['Cafe', 'Italian', 'Continental'],
    rating: 4.6,
    deliveryTime: '30-40 mins',
    priceRange: '₹600',
    address: 'Chanakyapuri, New Delhi',
    location: { lat: 28.5969, lng: 77.1839 },
    isVeg: false,
    menu: [
      {
        id: 'm17',
        name: 'Margherita Pizza',
        price: 450,
        description: 'Classic pizza with mozzarella and basil',
        isVeg: true,
        category: 'Main Course'
      },
      {
        id: 'm18',
        name: 'Chicken Burger',
        price: 380,
        description: 'Juicy chicken patty with fresh veggies',
        isVeg: false,
        category: 'Main Course'
      },
      {
        id: 'm19',
        name: 'Caesar Salad',
        price: 320,
        description: 'Crispy lettuce with caesar dressing',
        isVeg: true,
        category: 'Starters'
      },
      {
        id: 'm20',
        name: 'Iced Latte',
        price: 220,
        description: 'Cold coffee with milk',
        isVeg: true,
        category: 'Beverages'
      }
    ]
  },
  {
    id: 'r6',
    name: 'Kuremal Mohan Lal Kulfi Wale',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400',
    cuisine: ['Desserts', 'Street Food'],
    rating: 4.8,
    deliveryTime: '20-30 mins',
    priceRange: '₹150',
    address: 'Chawri Bazar, Old Delhi',
    location: { lat: 28.6500, lng: 77.2280 },
    isVeg: true,
    menu: [
      {
        id: 'm21',
        name: 'Stuffed Mango Kulfi',
        price: 180,
        description: 'Real mango stuffed with kulfi',
        isVeg: true,
        category: 'Desserts'
      },
      {
        id: 'm22',
        name: 'Paan Kulfi',
        price: 150,
        description: 'Kulfi with betel leaf flavor',
        isVeg: true,
        category: 'Desserts'
      },
      {
        id: 'm23',
        name: 'Malai Kulfi',
        price: 120,
        description: 'Traditional creamy kulfi',
        isVeg: true,
        category: 'Desserts'
      },
      {
        id: 'm24',
        name: 'Falooda',
        price: 140,
        description: 'Milk dessert with noodles and ice cream',
        isVeg: true,
        category: 'Desserts'
      }
    ]
  }
];
