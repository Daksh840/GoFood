import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { useAppContext } from '../context/AppContext';

export default function Menu() {
  const { filterCategory, setFilterCategory, searchTerm, setSearchTerm } = useAppContext();

  const categories = ['all', 'pizza', 'burger', 'salad', 'indian', 'dessert', 'mexican'];

  return (
    <div>
      <NavBar />
      
      {/* Hero Section */}
      <div className="container-fluid py-5" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        marginBottom: '40px'
      }}>
        <div className="container text-center text-white">
          <h1 className="display-4 fw-bold mb-3">Our Complete Menu</h1>
          <p className="lead mb-4">Discover our amazing selection of delicious food items</p>
          
          {/* Search Bar */}
          <div className="row justify-content-center mb-4">
            <div className="col-md-6">
              <div className="input-group input-group-lg">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for food items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    borderRadius: '25px 0 0 25px',
                    border: 'none',
                    padding: '12px 20px'
                  }}
                />
                <button 
                  className="btn btn-light"
                  style={{
                    borderRadius: '0 25px 25px 0',
                    border: 'none',
                    padding: '12px 20px'
                  }}
                >
                  🔍
                </button>
              </div>
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="d-flex flex-wrap justify-content-center gap-2">
            {categories.map(category => (
              <button
                key={category}
                className={`btn ${filterCategory === category ? 'btn-light' : 'btn-outline-light'} btn-sm`}
                onClick={() => setFilterCategory(category)}
                style={{
                  borderRadius: '20px',
                  padding: '8px 16px',
                  border: filterCategory === category ? 'none' : '2px solid white'
                }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Menu Items */}
      <Card />
      
      <Footer />
    </div>
  );
}
