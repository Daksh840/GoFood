import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary', 
  text = '', 
  className = '',
  overlay = false 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    primary: 'border-blue-500',
    secondary: 'border-gray-500',
    success: 'border-green-500',
    danger: 'border-red-500',
    warning: 'border-yellow-500',
    info: 'border-blue-400'
  };

  const spinnerVariants = {
    spin: {
      rotate: 360,
      transition: {
        duration: 1,
        ease: 'linear',
        repeat: Infinity
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity
      }
    }
  };

  const SpinnerContent = () => (
    <div className={`d-flex flex-column align-items-center justify-content-center ${className}`}>
      <div className="position-relative">
        {/* Main Spinner */}
        <motion.div
          className={`rounded-circle border-3 border-transparent ${sizeClasses[size]}`}
          style={{
            borderTopColor: color === 'primary' ? '#667eea' : `var(--bs-${color})`,
            borderRightColor: color === 'primary' ? '#764ba2' : `var(--bs-${color})`,
          }}
          variants={spinnerVariants}
          animate="spin"
        />
        
        {/* Inner Pulse */}
        <motion.div
          className="position-absolute top-50 start-50 translate-middle rounded-circle"
          style={{
            width: '40%',
            height: '40%',
            backgroundColor: color === 'primary' ? '#667eea' : `var(--bs-${color})`,
            opacity: 0.3
          }}
          variants={pulseVariants}
          animate="pulse"
        />
      </div>
      
      {text && (
        <motion.p
          className={`mt-3 mb-0 text-${color === 'primary' ? 'dark' : color} fw-medium`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <motion.div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(4px)',
          zIndex: 9999
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <SpinnerContent />
      </motion.div>
    );
  }

  return <SpinnerContent />;
};

// Skeleton Loading Component
export const SkeletonLoader = ({ 
  lines = 3, 
  height = 20, 
  className = '',
  avatar = false,
  card = false 
}) => {
  const skeletonVariants = {
    loading: {
      opacity: [0.4, 0.8, 0.4],
      transition: {
        duration: 1.5,
        repeat: Infinity
      }
    }
  };

  if (card) {
    return (
      <div className={`card border-0 shadow-sm ${className}`}>
        <motion.div
          className="card-img-top bg-light"
          style={{ height: '200px' }}
          variants={skeletonVariants}
          animate="loading"
        />
        <div className="card-body">
          <motion.div
            className="bg-light rounded mb-2"
            style={{ height: '24px', width: '80%' }}
            variants={skeletonVariants}
            animate="loading"
          />
          <motion.div
            className="bg-light rounded mb-2"
            style={{ height: '16px', width: '100%' }}
            variants={skeletonVariants}
            animate="loading"
          />
          <motion.div
            className="bg-light rounded mb-3"
            style={{ height: '16px', width: '60%' }}
            variants={skeletonVariants}
            animate="loading"
          />
          <div className="d-flex justify-content-between">
            <motion.div
              className="bg-light rounded"
              style={{ height: '20px', width: '30%' }}
              variants={skeletonVariants}
              animate="loading"
            />
            <motion.div
              className="bg-light rounded"
              style={{ height: '36px', width: '35%' }}
              variants={skeletonVariants}
              animate="loading"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {avatar && (
        <motion.div
          className="bg-light rounded-circle mb-3"
          style={{ width: '60px', height: '60px' }}
          variants={skeletonVariants}
          animate="loading"
        />
      )}
      {Array.from({ length: lines }).map((_, index) => (
        <motion.div
          key={index}
          className="bg-light rounded mb-2"
          style={{
            height: `${height}px`,
            width: index === lines - 1 ? '70%' : '100%'
          }}
          variants={skeletonVariants}
          animate="loading"
        />
      ))}
    </div>
  );
};

export default LoadingSpinner;
