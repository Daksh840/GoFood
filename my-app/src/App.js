import React, { Suspense, lazy } from 'react';
import './App.css';
import { AppProvider } from './context/AppContext';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { HelmetProvider } from 'react-helmet-async';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';
import { useAppContext } from './context/AppContext';

// Lazy load components for better performance
const Home = lazy(() => import('./screens/Home'));
const Login = lazy(() => import('./screens/Login'));
const Signup = lazy(() => import('./screens/Signup'));
const Cart = lazy(() => import('./screens/Cart'));
const Menu = lazy(() => import('./screens/Menu'));
const About = lazy(() => import('./screens/About'));
const Profile = lazy(() => import('./screens/Profile'));
const OrderHistory = lazy(() => import('./screens/OrderHistory'));
const Checkout = lazy(() => import('./screens/Checkout'));

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Loading fallback component
const AppLoading = () => (
  <div className="min-vh-100 d-flex align-items-center justify-content-center">
    <LoadingSpinner size="lg" text="Loading GoFood..." />
  </div>
);

// Main App Routes component
const AppRoutes = () => {
  const { theme } = useAppContext();

  // Apply theme to body
  React.useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="App">
      <Suspense fallback={<AppLoading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/checkout" element={<Checkout />} />
          {/* 404 Route */}
          <Route path="*" element={
            <div className="min-vh-100 d-flex align-items-center justify-content-center">
              <div className="text-center">
                <h1 className="display-1 fw-bold" style={{ color: '#667eea' }}>404</h1>
                <h4 className="mb-4">Page Not Found</h4>
                <p className="text-muted mb-4">The page you're looking for doesn't exist.</p>
                <a href="/" className="btn btn-primary" style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none'
                }}>Go Home</a>
              </div>
            </div>
          } />
        </Routes>
      </Suspense>
      
      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === 'dark' ? 'dark' : 'light'}
        toastStyle={{
          borderRadius: '10px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}
      />
    </div>
  );
};

// Main App component
function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <Router>
              <AppRoutes />
            </Router>
          </AppProvider>
          {/* React Query DevTools - only in development */}
          {process.env.NODE_ENV === 'development' && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
