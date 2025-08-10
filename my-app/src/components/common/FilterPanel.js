import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilter, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FOOD_CATEGORIES } from '../../constants';

const FilterPanel = ({
  filters,
  onFiltersChange,
  isOpen = false,
  onToggle,
  totalItems = 0,
  filteredItems = 0,
  className = '',
}) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    rating: true,
    dietary: true,
    prepTime: true,
    spiciness: false,
  });

  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (type, value) => {
    const newFilters = {
      ...localFilters,
      [type]: value
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters = {
      category: 'all',
      minPrice: 0,
      maxPrice: 50,
      minRating: 0,
      dietary: [],
      maxPrepTime: 60,
      spiciness: 0,
    };
    setLocalFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const handleDietaryFilter = (diet) => {
    const currentDietary = localFilters.dietary || [];
    const newDietary = currentDietary.includes(diet)
      ? currentDietary.filter(d => d !== diet)
      : [...currentDietary, diet];
    
    handleFilterChange('dietary', newDietary);
  };

  const sectionVariants = {
    open: {
      height: 'auto',
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeInOut' }
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeInOut' }
    }
  };

  const FilterSection = ({ title, section, children }) => (
    <div className="mb-4">
      <button
        className="btn btn-link p-0 text-decoration-none d-flex align-items-center justify-content-between w-100"
        onClick={() => toggleSection(section)}
        style={{ color: '#667eea' }}
      >
        <h6 className="mb-0 fw-semibold">{title}</h6>
        {expandedSections[section] ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      <AnimatePresence>
        {expandedSections[section] && (
          <motion.div
            variants={sectionVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="mt-3"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const panelVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', damping: 20, stiffness: 100 }
    },
    closed: {
      x: '-100%',
      opacity: 0,
      transition: { type: 'spring', damping: 20, stiffness: 100 }
    }
  };

  return (
    <>
      {/* Filter Toggle Button */}
      <button
        className="btn btn-outline-primary d-lg-none mb-3"
        onClick={onToggle}
        style={{ borderColor: '#667eea' }}
      >
        <FaFilter className="me-2" />
        Filters ({filteredItems}/{totalItems})
      </button>

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark d-lg-none"
            style={{ opacity: 0.5, zIndex: 1040 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Filter Panel */}
      <motion.div
        className={`bg-white border rounded shadow-sm p-4 ${className}`}
        style={{
          position: 'relative',
          zIndex: 1041,
          height: 'fit-content',
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
        variants={panelVariants}
        initial={window.innerWidth < 992 ? 'closed' : 'open'}
        animate={window.innerWidth < 992 ? (isOpen ? 'open' : 'closed') : 'open'}
      >
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h5 className="mb-0 fw-bold" style={{ color: '#667eea' }}>
            <FaFilter className="me-2" />
            Filters
          </h5>
          <div className="d-flex align-items-center gap-2">
            <small className="text-muted">
              {filteredItems}/{totalItems} items
            </small>
            <button
              className="btn btn-link p-0 text-muted d-lg-none"
              onClick={onToggle}
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Clear Filters */}
        {(localFilters.category !== 'all' || 
          localFilters.minPrice > 0 || 
          localFilters.maxPrice < 50 ||
          localFilters.minRating > 0 ||
          (localFilters.dietary && localFilters.dietary.length > 0) ||
          localFilters.maxPrepTime < 60 ||
          localFilters.spiciness > 0) && (
          <button
            className="btn btn-outline-secondary btn-sm mb-4 w-100"
            onClick={clearFilters}
          >
            Clear All Filters
          </button>
        )}

        {/* Category Filter */}
        <FilterSection title="Category" section="category">
          <div className="row g-2">
            {FOOD_CATEGORIES.map(category => (
              <div key={category.id} className="col-6">
                <button
                  className={`btn btn-sm w-100 ${
                    localFilters.category === category.id
                      ? 'btn-primary'
                      : 'btn-outline-primary'
                  }`}
                  onClick={() => handleFilterChange('category', category.id)}
                  style={
                    localFilters.category === category.id
                      ? {
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          border: 'none'
                        }
                      : { borderColor: '#667eea', color: '#667eea' }
                  }
                >
                  {category.icon} {category.name}
                </button>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range" section="price">
          <div className="mb-3">
            <label className="form-label small">
              Min Price: ${localFilters.minPrice || 0}
            </label>
            <input
              type="range"
              className="form-range"
              min="0"
              max="50"
              step="1"
              value={localFilters.minPrice || 0}
              onChange={(e) => handleFilterChange('minPrice', parseInt(e.target.value))}
              style={{ accentColor: '#667eea' }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label small">
              Max Price: ${localFilters.maxPrice || 50}
            </label>
            <input
              type="range"
              className="form-range"
              min="0"
              max="50"
              step="1"
              value={localFilters.maxPrice || 50}
              onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
              style={{ accentColor: '#667eea' }}
            />
          </div>
          <div className="d-flex justify-content-between small text-muted">
            <span>${localFilters.minPrice || 0}</span>
            <span>${localFilters.maxPrice || 50}</span>
          </div>
        </FilterSection>

        {/* Rating Filter */}
        <FilterSection title="Minimum Rating" section="rating">
          <div className="d-flex gap-1 flex-wrap">
            {[0, 1, 2, 3, 4, 4.5].map(rating => (
              <button
                key={rating}
                className={`btn btn-sm ${
                  localFilters.minRating === rating
                    ? 'btn-warning'
                    : 'btn-outline-warning'
                }`}
                onClick={() => handleFilterChange('minRating', rating)}
              >
                {rating === 0 ? 'Any' : `${rating}+ ⭐`}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Dietary Preferences */}
        <FilterSection title="Dietary Preferences" section="dietary">
          {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Halal'].map(diet => (
            <div key={diet} className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id={diet}
                checked={(localFilters.dietary || []).includes(diet.toLowerCase())}
                onChange={() => handleDietaryFilter(diet.toLowerCase())}
                style={{ accentColor: '#667eea' }}
              />
              <label className="form-check-label" htmlFor={diet}>
                {diet}
              </label>
            </div>
          ))}
        </FilterSection>

        {/* Preparation Time */}
        <FilterSection title="Max Prep Time" section="prepTime">
          <div className="mb-3">
            <label className="form-label small">
              Up to {localFilters.maxPrepTime || 60} minutes
            </label>
            <input
              type="range"
              className="form-range"
              min="5"
              max="60"
              step="5"
              value={localFilters.maxPrepTime || 60}
              onChange={(e) => handleFilterChange('maxPrepTime', parseInt(e.target.value))}
              style={{ accentColor: '#667eea' }}
            />
          </div>
          <div className="d-flex justify-content-between small text-muted">
            <span>5 min</span>
            <span>60+ min</span>
          </div>
        </FilterSection>

        {/* Spiciness Level */}
        <FilterSection title="Spiciness Level" section="spiciness">
          <div className="d-flex gap-1 flex-wrap">
            {[0, 1, 2, 3, 4].map(level => (
              <button
                key={level}
                className={`btn btn-sm ${
                  localFilters.spiciness === level
                    ? 'btn-danger'
                    : 'btn-outline-danger'
                }`}
                onClick={() => handleFilterChange('spiciness', level)}
                title={
                  level === 0 ? 'Not Spicy' :
                  level === 1 ? 'Mild' :
                  level === 2 ? 'Medium' :
                  level === 3 ? 'Hot' : 'Very Hot'
                }
              >
                {level === 0 ? '😌' : '🌶️'.repeat(level)}
              </button>
            ))}
          </div>
        </FilterSection>
      </motion.div>
    </>
  );
};

export default FilterPanel;
