import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// --- Reusable Input Component ---
export const Input = React.forwardRef(
  (
    {
      type = 'text',
      name,
      label,
      placeholder,
      className = '',
      containerClassName = '',
      labelClassName = '',
      error,
      icon: Icon,
      ...props
    },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    const inputType = type === 'password' && isPasswordVisible ? 'text' : type;

    return (
      <div className={`mb-4 ${containerClassName}`}>
        {label && (
          <label
            htmlFor={name}
            className={`form-label fw-semibold ${labelClassName}`}
          >
            {label}
          </label>
        )}
        <div className="position-relative">
          {Icon && (
            <div
              className="position-absolute top-50 translate-middle-y"
              style={{ left: '15px', zIndex: 2 }}
            >
              <Icon className="text-muted" />
            </div>
          )}
          <input
            id={name}
            name={name}
            type={inputType}
            ref={ref}
            className={`form-control form-control-lg ${error ? 'is-invalid' : ''} ${
              Icon ? 'ps-5' : ''
            } ${className}`}
            placeholder={placeholder}
            style={{
              borderRadius: '10px',
              border: '2px solid #e9ecef',
              padding: '12px 16px',
              transition: 'all 0.3s ease',
            }}
            {...props}
          />
          {type === 'password' && (
            <button
              type="button"
              className="btn btn-link position-absolute"
              style={{
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                border: 'none',
                color: '#667eea',
              }}
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          )}
        </div>
        {error && <div className="invalid-feedback mt-1">{error.message}</div>}
      </div>
    );
  }
);

// --- Reusable Select Component ---
export const Select = React.forwardRef(
  (
    {
      name,
      label,
      options,
      className = '',
      containerClassName = '',
      labelClassName = '',
      error,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`mb-4 ${containerClassName}`}>
        {label && (
          <label
            htmlFor={name}
            className={`form-label fw-semibold ${labelClassName}`}
          >
            {label}
          </label>
        )}
        <select
          id={name}
          name={name}
          ref={ref}
          className={`form-select form-select-lg ${error ? 'is-invalid' : ''} ${className}`}
          style={{
            borderRadius: '10px',
            border: '2px solid #e9ecef',
            padding: '12px 16px',
          }}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <div className="invalid-feedback mt-1">{error.message}</div>}
      </div>
    );
  }
);

// --- Reusable Checkbox Component ---
export const Checkbox = React.forwardRef(
  (
    {
      name,
      label,
      className = '',
      containerClassName = '',
      labelClassName = '',
      error,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`form-check mb-4 ${containerClassName}`}>
        <input
          id={name}
          name={name}
          type="checkbox"
          ref={ref}
          className={`form-check-input ${error ? 'is-invalid' : ''} ${className}`}
          {...props}
        />
        {label && (
          <label
            htmlFor={name}
            className={`form-check-label ${labelClassName}`}
          >
            {label}
          </label>
        )}
        {error && <div className="invalid-feedback mt-1">{error.message}</div>}
      </div>
    );
  }
);

// --- Form Component with react-hook-form integration ---
export const Form = ({ onSubmit, children, className = '', formMethods }) => {
  return (
    <form onSubmit={formMethods.handleSubmit(onSubmit)} className={className}>
      {children}
    </form>
  );
};

// --- Form Field Component to automatically connect to react-hook-form ---
export const FormField = ({ name, component, ...props }) => {
  const { control, formState: { errors } } = useForm();
  const error = errors[name];
  const FieldComponent = component;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FieldComponent {...field} {...props} error={error} />
      )}
    />
  );
};
