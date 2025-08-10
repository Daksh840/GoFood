import { VALIDATION_RULES, DEFAULTS } from '../constants';

// Local Storage Utilities
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error);
      return defaultValue;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error);
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};

// Validation Utilities
export const validation = {
  email: (email) => {
    if (!email) return 'Email is required';
    if (!VALIDATION_RULES.EMAIL.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  },
  
  password: (password) => {
    if (!password) return 'Password is required';
    if (password.length < VALIDATION_RULES.PASSWORD.MIN_LENGTH) {
      return `Password must be at least ${VALIDATION_RULES.PASSWORD.MIN_LENGTH} characters long`;
    }
    if (!VALIDATION_RULES.PASSWORD.PATTERN.test(password)) {
      return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
    }
    return '';
  },
  
  confirmPassword: (password, confirmPassword) => {
    if (!confirmPassword) return 'Please confirm your password';
    if (password !== confirmPassword) return 'Passwords do not match';
    return '';
  },
  
  phone: (phone) => {
    if (!phone) return 'Phone number is required';
    if (!VALIDATION_RULES.PHONE.test(phone)) {
      return 'Please enter a valid phone number';
    }
    return '';
  },
  
  required: (value, fieldName) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return `${fieldName} is required`;
    }
    return '';
  },
  
  minLength: (value, minLength, fieldName) => {
    if (value && value.length < minLength) {
      return `${fieldName} must be at least ${minLength} characters long`;
    }
    return '';
  },
};

// Format Utilities
export const format = {
  currency: (amount, currency = 'USD', locale = 'en-US') => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(amount);
  },
  
  date: (date, options = {}) => {
    const defaultOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString('en-US', { ...defaultOptions, ...options });
  },
  
  time: (date, options = {}) => {
    const defaultOptions = {
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(date).toLocaleTimeString('en-US', { ...defaultOptions, ...options });
  },
  
  dateTime: (date) => {
    return `${format.date(date)} at ${format.time(date)}`;
  },
  
  phone: (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  },
  
  truncateText: (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  },
  
  capitalize: (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },
  
  kebabCase: (str) => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  },
};

// Array Utilities
export const array = {
  chunk: (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  },
  
  unique: (arr, key = null) => {
    if (!key) return [...new Set(arr)];
    const seen = new Set();
    return arr.filter(item => {
      const value = item[key];
      if (seen.has(value)) return false;
      seen.add(value);
      return true;
    });
  },
  
  sortBy: (arr, key, order = 'asc') => {
    return [...arr].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      
      if (typeof aVal === 'string') {
        return order === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      
      return order === 'asc' ? aVal - bVal : bVal - aVal;
    });
  },
  
  groupBy: (arr, key) => {
    return arr.reduce((groups, item) => {
      const group = item[key];
      if (!groups[group]) groups[group] = [];
      groups[group].push(item);
      return groups;
    }, {});
  },
};

// Image Utilities
export const image = {
  getPlaceholder: (text = '', width = 500, height = 300) => {
    const encodedText = encodeURIComponent(text);
    return `${DEFAULTS.PLACEHOLDER_IMAGE}${width}x${height}/667eea/ffffff?text=${encodedText}`;
  },
  
  preload: (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  },
  
  isValidUrl: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
};

// URL Utilities
export const url = {
  getQueryParams: (search = window.location.search) => {
    return Object.fromEntries(new URLSearchParams(search));
  },
  
  buildQueryString: (params) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        searchParams.append(key, value);
      }
    });
    return searchParams.toString();
  },
  
  updateQueryParams: (params, replace = false) => {
    const searchParams = new URLSearchParams(window.location.search);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === undefined || value === '') {
        searchParams.delete(key);
      } else {
        searchParams.set(key, value);
      }
    });
    
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    
    if (replace) {
      window.history.replaceState({}, '', newUrl);
    } else {
      window.history.pushState({}, '', newUrl);
    }
  },
};

// Performance Utilities
export const performance = {
  debounce: (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  },
  
  throttle: (func, limit) => {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        func.apply(null, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
  
  measureTime: (func) => {
    return (...args) => {
      const start = performance.now();
      const result = func(...args);
      const end = performance.now();
      console.log(`Function executed in ${end - start} milliseconds`);
      return result;
    };
  },
};

// Error Handling Utilities
export const error = {
  getErrorMessage: (error) => {
    if (typeof error === 'string') return error;
    if (error?.response?.data?.message) return error.response.data.message;
    if (error?.message) return error.message;
    return 'An unexpected error occurred';
  },
  
  logError: (error, context = '') => {
    console.error(`Error ${context}:`, error);
    // In production, you might want to send this to an error tracking service
  },
};

// DOM Utilities
export const dom = {
  scrollToTop: (behavior = 'smooth') => {
    window.scrollTo({
      top: 0,
      behavior,
    });
  },
  
  scrollToElement: (elementId, offset = 0, behavior = 'smooth') => {
    const element = document.getElementById(elementId);
    if (element) {
      const top = element.offsetTop - offset;
      window.scrollTo({
        top,
        behavior,
      });
    }
  },
  
  copyToClipboard: async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return false;
    }
  },
  
  downloadFile: (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};

// Color Utilities
export const color = {
  hexToRgb: (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : null;
  },
  
  rgbToHex: (r, g, b) => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  },
  
  adjustBrightness: (hex, percent) => {
    const rgb = color.hexToRgb(hex);
    if (!rgb) return hex;
    
    const factor = 1 + percent / 100;
    const newR = Math.min(255, Math.max(0, Math.round(rgb.r * factor)));
    const newG = Math.min(255, Math.max(0, Math.round(rgb.g * factor)));
    const newB = Math.min(255, Math.max(0, Math.round(rgb.b * factor)));
    
    return color.rgbToHex(newR, newG, newB);
  },
};
