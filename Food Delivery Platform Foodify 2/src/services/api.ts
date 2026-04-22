// API service to communicate with backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Helper function for API calls
async function apiCall(endpoint: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// ==================== AUTH API ====================

export const authAPI = {
  // User authentication
  userRegister: async (userData: { name: string; email: string; password: string; phone: string }) => {
    return apiCall('/auth/user/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  userLogin: async (credentials: { email: string; password: string }) => {
    return apiCall('/auth/user/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Restaurant authentication
  restaurantRegister: async (restaurantData: any) => {
    return apiCall('/auth/restaurant/register', {
      method: 'POST',
      body: JSON.stringify(restaurantData),
    });
  },

  restaurantLogin: async (credentials: { email: string; password: string }) => {
    return apiCall('/auth/restaurant/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Partner authentication
  partnerRegister: async (partnerData: any) => {
    return apiCall('/auth/partner/register', {
      method: 'POST',
      body: JSON.stringify(partnerData),
    });
  },

  partnerLogin: async (credentials: { email: string; password: string }) => {
    return apiCall('/auth/partner/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
};

// ==================== RESTAURANT API ====================

export const restaurantAPI = {
  getAll: async () => {
    return apiCall('/restaurants');
  },

  getById: async (id: string) => {
    return apiCall(`/restaurants/${id}`);
  },
};

// ==================== PARTNER API ====================

export const partnerAPI = {
  getAll: async () => {
    return apiCall('/partners');
  },
};

// ==================== ORDER API ====================

export const orderAPI = {
  create: async (orderData: any) => {
    return apiCall('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  getAll: async () => {
    return apiCall('/orders');
  },

  update: async (orderId: string, updates: any) => {
    return apiCall(`/orders/${orderId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  },
};

export default {
  auth: authAPI,
  restaurants: restaurantAPI,
  partners: partnerAPI,
  orders: orderAPI,
};
