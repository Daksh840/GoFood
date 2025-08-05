import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-dark text-light mt-5">
      <div className="container py-5">
        <div className="row">
          {/* Company Info */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="fw-bold mb-3" style={{ color: '#667eea' }}>🍽️ GoFood</h5>
            <p className="text-muted">
              Your favorite food delivery service. Fresh, fast, and delicious meals 
              delivered right to your doorstep in 30 minutes or less!
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-light"><FaFacebook size={20} /></a>
              <a href="#" className="text-light"><FaTwitter size={20} /></a>
              <a href="#" className="text-light"><FaInstagram size={20} /></a>
              <a href="#" className="text-light"><FaYoutube size={20} /></a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-muted text-decoration-none">Home</Link></li>
              <li><Link to="/menu" className="text-muted text-decoration-none">Menu</Link></li>
              <li><Link to="/about" className="text-muted text-decoration-none">About Us</Link></li>
              <li><Link to="/cart" className="text-muted text-decoration-none">Cart</Link></li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">Customer Service</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-muted text-decoration-none">Help Center</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Terms of Service</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Privacy Policy</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Contact Support</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">Contact Us</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <FaMapMarkerAlt className="me-2" />
                <small>123 Food Street, Flavor City, FC 12345</small>
              </li>
              <li className="mb-2">
                <FaPhone className="me-2" />
                <small>+1 (555) 123-FOOD</small>
              </li>
              <li className="mb-2">
                <FaEnvelope className="me-2" />
                <small>support@gofood.com</small>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="my-4" />
        
        <div className="row align-items-center">
          <div className="col-md-8">
            <p className="text-muted mb-0">
              &copy; 2024 GoFood, Inc. All rights reserved. | Made with ❤️ for food lovers
            </p>
          </div>
          <div className="col-md-4 text-end">
            <small className="text-muted">
              Available on iOS & Android
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
}
