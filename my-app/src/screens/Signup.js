import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { setUser } = useAppContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields');
      return false;
    }

    if (!formData.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return false;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }

    if (formData.phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock user data (in real app, this would come from your backend)
      const userData = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address
      };
      
      setUser(userData);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
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
              <h1 className="display-4 fw-bold mb-4">Join GoFood!</h1>
              <p className="lead mb-4">
                Create your account and start ordering delicious food from the best restaurants in your area.
              </p>
              <div className="row justify-content-center">
                <div className="col-4 text-center mb-3">
                  <div className="display-6">🍔</div>
                  <small>500+ Restaurants</small>
                </div>
                <div className="col-4 text-center mb-3">
                  <div className="display-6">⚡</div>
                  <small>30 Min Delivery</small>
                </div>
                <div className="col-4 text-center mb-3">
                  <div className="display-6">💳</div>
                  <small>Secure Payment</small>
                </div>
                <div className="col-4 text-center">
                  <div className="display-6">🎁</div>
                  <small>Special Offers</small>
                </div>
                <div className="col-4 text-center">
                  <div className="display-6">📱</div>
                  <small>Easy Ordering</small>
                </div>
                <div className="col-4 text-center">
                  <div className="display-6">👥</div>
                  <small>24/7 Support</small>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-6">
            <div className="card shadow-lg border-0" style={{ borderRadius: '20px' }}>
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold" style={{ color: '#667eea' }}>Create Account</h2>
                  <p className="text-muted">Fill in your details to get started</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-12 mb-3">
                      <label htmlFor="name" className="form-label fw-semibold">Full Name</label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        style={{
                          borderRadius: '10px',
                          border: '2px solid #e9ecef',
                          padding: '12px 16px'
                        }}
                        required
                      />
                    </div>
                    
                    <div className="col-12 mb-3">
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
                    
                    <div className="col-12 mb-3">
                      <label htmlFor="phone" className="form-label fw-semibold">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control form-control-lg"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        style={{
                          borderRadius: '10px',
                          border: '2px solid #e9ecef',
                          padding: '12px 16px'
                        }}
                        required
                      />
                    </div>
                    
                    <div className="col-12 mb-3">
                      <label htmlFor="address" className="form-label fw-semibold">Address</label>
                      <textarea
                        className="form-control"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your complete address"
                        rows="2"
                        style={{
                          borderRadius: '10px',
                          border: '2px solid #e9ecef',
                          padding: '12px 16px'
                        }}
                        required
                      />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <label htmlFor="password" className="form-label fw-semibold">Password</label>
                      <div className="position-relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="form-control form-control-lg"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Create password"
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
                    
                    <div className="col-md-6 mb-3">
                      <label htmlFor="confirmPassword" className="form-label fw-semibold">Confirm Password</label>
                      <div className="position-relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          className="form-control form-control-lg"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm password"
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
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="agreeTerms" required />
                      <label className="form-check-label" htmlFor="agreeTerms">
                        I agree to the{' '}
                        <a href="#" className="text-decoration-none" style={{ color: '#667eea' }}>
                          Terms of Service
                        </a>
                        {' '}and{' '}
                        <a href="#" className="text-decoration-none" style={{ color: '#667eea' }}>
                          Privacy Policy
                        </a>
                      </label>
                    </div>
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
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </form>
                
                <div className="text-center mt-4">
                  <p className="text-muted">
                    Already have an account?{' '}
                    <Link to="/login" className="text-decoration-none fw-semibold" style={{ color: '#667eea' }}>
                      Sign in here
                    </Link>
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
