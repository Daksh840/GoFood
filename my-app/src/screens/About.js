import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div>
      <NavBar />
      <div className="container mt-5" style={{ minHeight: '60vh' }}>
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h2 className="fw-bold mb-4" style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '2.5rem'
            }}>
              ℹ️ About GoFood
            </h2>
            <p className="lead text-muted">
              Welcome to GoFood, your go-to destination for the most delicious and diverse culinary experiences.
            </p>
            <p className="text-muted mb-5">
              Our mission is simple: deliver happiness through food. Whether you're craving a quick
              bite or a gourmet meal, GoFood brings your favorite restaurants to your doorstep in no time!
            </p>
            
            <div className="row g-4 mb-5">
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <div className="display-4 mb-3">🚚</div>
                    <h5 className="fw-bold">Fast Delivery</h5>
                    <p className="text-muted">Get your food delivered in 30 minutes or less</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <div className="display-4 mb-3">🍽️</div>
                    <h5 className="fw-bold">Quality Food</h5>
                    <p className="text-muted">Fresh ingredients and authentic flavors</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <div className="display-4 mb-3">👥</div>
                    <h5 className="fw-bold">24/7 Support</h5>
                    <p className="text-muted">Round the clock customer service</p>
                  </div>
                </div>
              </div>
            </div>
            
            <h4 className="mb-3">Why Choose GoFood?</h4>
            <ul className="list-unstyled text-muted">
              <li className="mb-2">✅ Our team works tirelessly to ensure fast delivery and top-notch service.</li>
              <li className="mb-2">✅ We partner with hundreds of restaurants to offer diverse food choices.</li>
              <li className="mb-2">✅ Your satisfaction is our priority: fresh, hot, and delicious meals every time.</li>
              <li className="mb-2">✅ Tech-driven approach to ensure smooth and reliable service.</li>
            </ul>
            
            <p className="text-muted mt-4">
              Thank you for choosing GoFood and letting us be part of your everyday meals! 
              We love delighting you with amazing food adventures.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
