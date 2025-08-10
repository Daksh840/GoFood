import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaHome, FaRedo } from 'react-icons/fa';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const handleReload = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <motion.div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px'
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <motion.div
              className="card shadow-lg border-0"
              style={{ borderRadius: '20px' }}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="card-body p-5 text-center">
                <motion.div
                  className="text-danger mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                >
                  <FaExclamationTriangle size={64} />
                </motion.div>
                
                <motion.h2
                  className="fw-bold text-dark mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Oops! Something went wrong
                </motion.h2>
                
                <motion.p
                  className="text-muted mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  We're sorry, but something unexpected happened. Don't worry, our team has been notified and we're working to fix it.
                </motion.p>
                
                {process.env.NODE_ENV === 'development' && (
                  <motion.div
                    className="alert alert-danger text-start mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <strong>Error Details:</strong>
                    <pre className="mt-2 mb-0" style={{ fontSize: '0.875rem' }}>
                      {error.message}
                    </pre>
                  </motion.div>
                )}
                
                <motion.div
                  className="d-flex gap-3 justify-content-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <button
                    className="btn btn-outline-primary px-4"
                    onClick={resetErrorBoundary}
                  >
                    <FaRedo className="me-2" />
                    Try Again
                  </button>
                  
                  <button
                    className="btn px-4 text-white"
                    onClick={handleGoHome}
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none'
                    }}
                  >
                    <FaHome className="me-2" />
                    Go Home
                  </button>
                </motion.div>
                
                <motion.p
                  className="text-muted mt-4 mb-0"
                  style={{ fontSize: '0.875rem' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  If the problem persists, please contact our support team.
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ErrorBoundary = ({ children }) => {
  const handleError = (error, errorInfo) => {
    // Log error to monitoring service
    console.error('Error Boundary caught an error:', error, errorInfo);
    
    // In production, you would send this to an error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error);
    }
  };

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={handleError}
      onReset={() => window.location.reload()}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
