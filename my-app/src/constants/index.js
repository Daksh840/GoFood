// App Constants
export const APP_CONFIG = {
  NAME: 'GoFood',
  VERSION: process.env.REACT_APP_VERSION || '2.0.0',
  ENVIRONMENT: process.env.REACT_APP_ENVIRONMENT || 'development',
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  USER: 'gofood_user',
  CART: 'gofood_cart',
  ORDERS: 'gofood_orders',
  THEME: 'gofood_theme',
  PREFERENCES: 'gofood_preferences',
};

// Theme Constants
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

// Color Palette
export const COLORS = {
  PRIMARY: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  PRIMARY_HOVER: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
  SUCCESS: '#28a745',
  ERROR: '#dc3545',
  WARNING: '#ffc107',
  INFO: '#17a2b8',
  LIGHT: '#f8f9fa',
  DARK: '#343a40',
};

// Food Categories
export const FOOD_CATEGORIES = [
  { id: 'all', name: 'All Items', icon: '🍽️' },
  { id: 'pizza', name: 'Pizza', icon: '🍕' },
  { id: 'burger', name: 'Burger', icon: '🍔' },
  { id: 'salad', name: 'Salad', icon: '🥗' },
  { id: 'indian', name: 'Indian', icon: '🍛' },
  { id: 'dessert', name: 'Dessert', icon: '🍰' },
  { id: 'mexican', name: 'Mexican', icon: '🌮' },
  { id: 'chinese', name: 'Chinese', icon: '🥡' },
  { id: 'italian', name: 'Italian', icon: '🍝' },
];

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  ON_THE_WAY: 'on_the_way',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
  },
  MENU: {
    GET_ITEMS: '/menu/items',
    GET_CATEGORIES: '/menu/categories',
    SEARCH: '/menu/search',
  },
  ORDERS: {
    CREATE: '/orders',
    GET_USER_ORDERS: '/orders/user',
    GET_ORDER_DETAILS: '/orders/:id',
    CANCEL_ORDER: '/orders/:id/cancel',
  },
  USER: {
    GET_PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
    CHANGE_PASSWORD: '/user/change-password',
  },
};

// Validation Rules
export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\+]?[1-9][\d]{0,15}$/,
  PASSWORD: {
    MIN_LENGTH: 8,
    PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  },
};

// Animation Variants
export const ANIMATION_VARIANTS = {
  FADE_IN: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  },
  SLIDE_IN_LEFT: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
    transition: { duration: 0.3 },
  },
  SCALE_UP: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: 0.2 },
  },
};

// Default Values
export const DEFAULTS = {
  ITEMS_PER_PAGE: 12,
  DELIVERY_FEE: 3.99,
  MIN_ORDER_AMOUNT: 15.00,
  MAX_QUANTITY: 10,
  DEFAULT_AVATAR: '/images/default-avatar.png',
  PLACEHOLDER_IMAGE: 'https://via.placeholder.com/500x300/667eea/ffffff?text=',
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Internal server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  CART_EMPTY: 'Your cart is empty. Add some items to proceed.',
  LOGIN_REQUIRED: 'Please log in to continue.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully logged in!',
  LOGOUT_SUCCESS: 'Successfully logged out!',
  REGISTER_SUCCESS: 'Account created successfully!',
  ORDER_PLACED: 'Order placed successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  PASSWORD_CHANGED: 'Password changed successfully!',
  ITEM_ADDED_TO_CART: 'Item added to cart!',
  ITEM_REMOVED_FROM_CART: 'Item removed from cart!',
};
