import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AppContext = createContext();

// Action types
const ACTIONS = {
  SET_USER: 'SET_USER',
  LOGOUT: 'LOGOUT',
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_CART_ITEM: 'UPDATE_CART_ITEM',
  CLEAR_CART: 'CLEAR_CART',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  ADD_ORDER: 'ADD_ORDER',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_FILTER_CATEGORY: 'SET_FILTER_CATEGORY',
  SET_THEME: 'SET_THEME'
};

// Initial state
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  orders: JSON.parse(localStorage.getItem('orders')) || [],
  loading: false,
  error: null,
  searchTerm: '',
  filterCategory: 'all',
  theme: localStorage.getItem('theme') || 'light'
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload
      };
    
    case ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        cart: [],
        orders: []
      };
    
    case ACTIONS.ADD_TO_CART:
      const existingItem = state.cart.find(item => 
        item.id === action.payload.id && 
        item.size === action.payload.size
      );
      
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id && item.size === action.payload.size
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      }
      
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, cartId: uuidv4() }]
      };
    
    case ACTIONS.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.cartId !== action.payload)
      };
    
    case ACTIONS.UPDATE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.cartId === action.payload.cartId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case ACTIONS.CLEAR_CART:
      return {
        ...state,
        cart: []
      };
    
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    
    case ACTIONS.ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
        cart: []
      };
    
    case ACTIONS.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload
      };
    
    case ACTIONS.SET_FILTER_CATEGORY:
      return {
        ...state,
        filterCategory: action.payload
      };
    
    case ACTIONS.SET_THEME:
      return {
        ...state,
        theme: action.payload
      };
    
    default:
      return state;
  }
};

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(state.orders));
  }, [state.orders]);

  useEffect(() => {
    localStorage.setItem('theme', state.theme);
    document.body.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  // Actions
  const setUser = (user) => {
    dispatch({ type: ACTIONS.SET_USER, payload: user });
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('orders');
    dispatch({ type: ACTIONS.LOGOUT });
  };

  const addToCart = (item) => {
    dispatch({ type: ACTIONS.ADD_TO_CART, payload: item });
  };

  const removeFromCart = (cartId) => {
    dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: cartId });
  };

  const updateCartItem = (cartId, quantity) => {
    dispatch({ type: ACTIONS.UPDATE_CART_ITEM, payload: { cartId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: ACTIONS.CLEAR_CART });
  };

  const setLoading = (loading) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: ACTIONS.SET_ERROR, payload: error });
  };

  const addOrder = (order) => {
    dispatch({ type: ACTIONS.ADD_ORDER, payload: order });
  };

  const setSearchTerm = (term) => {
    dispatch({ type: ACTIONS.SET_SEARCH_TERM, payload: term });
  };

  const setFilterCategory = (category) => {
    dispatch({ type: ACTIONS.SET_FILTER_CATEGORY, payload: category });
  };

  const setTheme = (theme) => {
    dispatch({ type: ACTIONS.SET_THEME, payload: theme });
  };

  // Computed values
  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const value = {
    ...state,
    setUser,
    logout,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    setLoading,
    setError,
    addOrder,
    setSearchTerm,
    setFilterCategory,
    setTheme,
    cartItemsCount,
    cartTotal
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
