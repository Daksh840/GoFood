import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { setUser } = useAppContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (!formData.email.includes('@')) {
      toast.error('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock user data (in real app, this would come from your backend)
      const userData = {
        id: 1,
        name: 'John Doe',
        email: formData.email,
        phone: '+1234567890',
        address: '123 Main St, City, State 12345'
      };
      
      setUser(userData);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container-fluid" style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div className="row w-100" style={{ maxWidth: '1200px' }}>
          <div className="col-lg-6 d-flex align-items-center justify-content-center">
            <div className="text-white text-center">
              <h1 className="display-4 fw-bold mb-4">Welcome Back!</h1>
              <p className="lead mb-4">
                Sign in to access your account and continue your delicious journey with GoFood.
              </p>
              <div className="d-flex justify-content-center gap-4">
                <div className="text-center">
                  <div className="display-6">🍕</div>
                  <small>Delicious Food</small>
                </div>
                <div className="text-center">
                  <div className="display-6">🚚</div>
                  <small>Fast Delivery</small>
                </div>
                <div className="text-center">
                  <div className="display-6">👌</div>
                  <small>Best Quality</small>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-6">
            <div className="card shadow-lg border-0" style={{ borderRadius: '20px' }}>
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold" style={{ color: '#667eea' }}>Sign In</h2>
                  <p className="text-muted">Enter your credentials to access your account</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      style={{
                        borderRadius: '10px',
                        border: '2px solid #e9ecef',
                        padding: '12px 16px'
                      }}
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-semibold">Password</label>
                    <div className="position-relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control form-control-lg"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        style={{
                          borderRadius: '10px',
                          border: '2px solid #e9ecef',
                          padding: '12px 16px',
                          paddingRight: '50px'
                        }}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-link position-absolute"
                        style={{
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          border: 'none',
                          color: '#667eea'
                        }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="rememberMe" />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                    <a href="#" className="text-decoration-none" style={{ color: '#667eea' }}>
                      Forgot password?
                    </a>
                  </div>
                  
                  <button
                    type="submit"
                    className="btn btn-lg w-100 text-white fw-semibold"
                    disabled={isLoading}
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '12px'
                    }}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Signing In...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </button>
                </form>
                
                <div className="text-center mt-4">
                  <p className="text-muted">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-decoration-none fw-semibold" style={{ color: '#667eea' }}>
                      Sign up here
                    </Link>
                  </p>
                </div>
                
                <div className="text-center mt-4 pt-4 border-top">
                  <p className="text-muted small">
                    By signing in, you agree to our{' '}
                    <a href="#" className="text-decoration-none" style={{ color: '#667eea' }}>Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-decoration-none" style={{ color: '#667eea' }}>Privacy Policy</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
