import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { foodItems } from '../data/foodItems';
import { format } from '../utils';
import { ANIMATION_VARIANTS } from '../constants';
import { SkeletonLoader } from './common/LoadingSpinner';
import { useInView } from 'react-intersection-observer';
import debounce from 'lodash.debounce';
import FilterPanel from './common/FilterPanel';

export default function Card({ showFilters = true, itemsPerPage = 12 }) {
  const { addToCart, searchTerm, filterCategory } = useAppContext();
  const [quantities, setQuantities] = useState({});
  const [sizes, setSizes] = useState({});
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0,
    maxPrice: 50,
    minRating: 0,
    dietary: [],
    maxPrepTime: 60,
    spiciness: 0,
  });
  const [sortBy, setSortBy] = useState('popular');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoadErrors, setImageLoadErrors] = useState({});

  // Debounced search to improve performance
  const debouncedSearch = useMemo(
    () => debounce((term) => {
      setCurrentPage(1); // Reset to first page on search
    }, 300),
    []
  );

  const getQuantity = (itemId) => quantities[itemId] || 1;
  const getSize = (itemId) => sizes[itemId] || 'full';

  const setQuantity = (itemId, quantity) => {
    setQuantities(prev => ({ ...prev, [itemId]: quantity }));
  };

  const setSize = (itemId, size) => {
    setSizes(prev => ({ ...prev, [itemId]: size }));
  };

  const calculatePrice = (item) => {
    const quantity = getQuantity(item.id);
    const size = getSize(item.id);
    return (item.price[size] * quantity).toFixed(2);
  };

  const handleAddToCart = (item) => {
    const quantity = getQuantity(item.id);
    const size = getSize(item.id);
    
    const cartItem = {
      id: item.id,
      name: item.name,
      description: item.description,
      image: item.image,
      price: item.price[size],
      size: size,
      quantity: quantity,
      category: item.category
    };
    
    addToCart(cartItem);
    toast.success(`${item.name} added to cart!`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-warning">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-warning">☆</span>);
    }
    return stars;
  };

  // Filter items based on search term and category
  const filteredItems = foodItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || 
                           item.category.toLowerCase() === filterCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12">
          <h2 className="text-center mb-4 fw-bold" style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '2.5rem'
          }}>
            🍽️ Our Delicious Menu
          </h2>
        </div>
      </div>
      
      {filteredItems.length === 0 ? (
        <div className="text-center py-5">
          <h4 className="text-muted">No items found</h4>
          <p className="text-muted">Try adjusting your search or filter criteria.</p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredItems.map((item) => {
            const itemQuantity = getQuantity(item.id);
            const itemSize = getSize(item.id);
            
            return (
              <div key={item.id} className="col-lg-4 col-md-6 col-sm-12">
                <div className="card h-100 shadow-lg border-0" style={{
                  borderRadius: '15px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }} 
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                }}>
                  
                  <div className="position-relative">
                    <img 
                      src={item.image} 
                      className="card-img-top" 
                      alt={item.name}
                      style={{ height: '200px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/500x300/667eea/ffffff?text=${encodeURIComponent(item.name)}`;
                      }}
                      loading="lazy"
                    />
                    <div className="position-absolute top-0 end-0 m-2">
                      <span className="badge bg-primary" style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none'
                      }}>
                        {item.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold text-dark">{item.name}</h5>
                    <p className="card-text text-muted flex-grow-1">{item.description}</p>
                    
                    <div className="mb-2">
                      <div className="d-flex align-items-center">
                        {renderStars(item.rating)}
                        <span className="ms-2 text-muted">({item.rating})</span>
                      </div>
                    </div>
                    
                    <div className="row g-2 mb-3">
                      <div className="col-6">
                        <select 
                          className="form-select form-select-sm"
                          value={itemQuantity}
                          onChange={(e) => setQuantity(item.id, parseInt(e.target.value))}
                          style={{ borderColor: '#667eea' }}
                        >
                          {Array.from(Array(10), (e, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-6">
                        <select 
                          className="form-select form-select-sm"
                          value={itemSize}
                          onChange={(e) => setSize(item.id, e.target.value)}
                          style={{ borderColor: '#667eea' }}
                        >
                          <option value="half">Half</option>
                          <option value="full">Full</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="fw-bold text-success fs-5">
                        ${calculatePrice(item)}
                      </div>
                      <button 
                        className="btn btn-primary"
                        onClick={() => handleAddToCart(item)}
                        style={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          border: 'none',
                          borderRadius: '25px',
                          padding: '8px 20px'
                        }}
                      >
                        Add to Cart 🛒
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
