import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  footer = null,
  fullscreen = false,
  centered = true,
  scrollable = false,
}) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (closeOnEscape && event.keyCode === 27) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeOnEscape, onClose]);

  const sizeClasses = {
    sm: 'modal-sm',
    md: '',
    lg: 'modal-lg',
    xl: 'modal-xl',
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: -50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -50,
      transition: {
        duration: 0.2,
      },
    },
  };

  const handleBackdropClick = (e) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`modal fade show d-block ${className}`}
          style={{ zIndex: 1050 }}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleBackdropClick}
        >
          <div
            className={`modal-dialog ${sizeClasses[size]} ${
              centered ? 'modal-dialog-centered' : ''
            } ${scrollable ? 'modal-dialog-scrollable' : ''} ${
              fullscreen ? 'modal-fullscreen' : ''
            }`}
          >
            <motion.div
              className="modal-content border-0 shadow-lg"
              style={{ borderRadius: '15px', overflow: 'hidden' }}
              variants={modalVariants}
            >
              {/* Modal Header */}
              {(title || showCloseButton) && (
                <div
                  className={`modal-header border-0 ${headerClassName}`}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  }}
                >
                  {title && (
                    <h5 className="modal-title text-white fw-bold">{title}</h5>
                  )}
                  {showCloseButton && (
                    <button
                      type="button"
                      className="btn-close btn-close-white"
                      onClick={onClose}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        fontSize: '1.25rem',
                        padding: '0.5rem',
                      }}
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
              )}

              {/* Modal Body */}
              <div className={`modal-body ${bodyClassName}`}>
                {children}
              </div>

              {/* Modal Footer */}
              {footer && (
                <div className={`modal-footer border-0 ${footerClassName}`}>
                  {footer}
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Confirmation Modal Component
export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'primary',
  isLoading = false,
}) => {
  const footer = (
    <div className="d-flex gap-2">
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={onClose}
        disabled={isLoading}
      >
        {cancelText}
      </button>
      <button
        type="button"
        className={`btn btn-${confirmVariant}`}
        onClick={onConfirm}
        disabled={isLoading}
        style={
          confirmVariant === 'primary'
            ? {
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
              }
            : {}
        }
      >
        {isLoading ? (
          <>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
            />
            Loading...
          </>
        ) : (
          confirmText
        )}
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={footer}
      closeOnBackdropClick={!isLoading}
      closeOnEscape={!isLoading}
    >
      <p className="mb-0">{message}</p>
    </Modal>
  );
};

// Alert Modal Component
export const AlertModal = ({
  isOpen,
  onClose,
  title = 'Alert',
  message,
  type = 'info',
  buttonText = 'OK',
}) => {
  const typeConfig = {
    success: {
      icon: '✅',
      headerBg: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
      buttonClass: 'btn-success',
    },
    error: {
      icon: '❌',
      headerBg: 'linear-gradient(135deg, #dc3545 0%, #fd7e14 100%)',
      buttonClass: 'btn-danger',
    },
    warning: {
      icon: '⚠️',
      headerBg: 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)',
      buttonClass: 'btn-warning',
    },
    info: {
      icon: 'ℹ️',
      headerBg: 'linear-gradient(135deg, #17a2b8 0%, #6f42c1 100%)',
      buttonClass: 'btn-info',
    },
  };

  const config = typeConfig[type];

  const footer = (
    <button
      type="button"
      className={`btn ${config.buttonClass}`}
      onClick={onClose}
    >
      {buttonText}
    </button>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <span>
          {config.icon} {title}
        </span>
      }
      size="sm"
      footer={footer}
      headerClassName="text-white"
    >
      <div className="modal-content" style={{ background: config.headerBg }}>
        <p className="mb-0">{message}</p>
      </div>
    </Modal>
  );
};

export default Modal;
