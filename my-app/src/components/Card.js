import React, { useState } from "react";
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

export default function Card() {
  const { addToCart, searchTerm, filterCategory } = useAppContext();
  const [quantities, setQuantities] = useState({});
  const [sizes, setSizes] = useState({});
  
  const foodItems = [
    {
      id: 1,
      name: "Margherita Pizza",
      description: "Fresh tomatoes, mozzarella cheese, basil leaves",
      image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&h=300&fit=crop&crop=center&auto=format&q=60",
      rating: 4.5,
      price: { half: 12.99, full: 18.99 },
      category: "Pizza"
    },
    {
      id: 2,
      name: "Chicken Burger",
      description: "Grilled chicken breast with lettuce, tomato, mayo",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=300&fit=crop&crop=center&auto=format&q=60",
      rating: 4.7,
      price: { half: 8.99, full: 14.99 },
      category: "Burger"
    },
    {
      id: 3,
      name: "Caesar Salad",
      description: "Crisp romaine lettuce, parmesan, croutons, caesar dressing",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=300&fit=crop&crop=center&auto=format&q=60",
      rating: 4.3,
      price: { half: 6.99, full: 11.99 },
      category: "Salad"
    },
    {
      id: 4,
      name: "Chicken Biryani",
      description: "Aromatic basmati rice with tender chicken and spices",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d25c?w=500&h=300&fit=crop&crop=center&auto=format&q=60",
      rating: 4.8,
      price: { half: 9.99, full: 16.99 },
      category: "Indian"
    },
    {
      id: 5,
      name: "Chocolate Cake",
      description: "Rich chocolate cake with creamy chocolate frosting",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=300&fit=crop&crop=center&auto=format&q=60",
      rating: 4.9,
      price: { half: 4.99, full: 8.99 },
      category: "Dessert"
    },
    {
      id: 6,
      name: "Fish Tacos",
      description: "Grilled fish with fresh salsa and avocado cream",
      image: "https://images.unsplash.com/photo-1565299585323-38174c4a6233?w=500&h=300&fit=crop&crop=center&auto=format&q=60",
      rating: 4.4,
      price: { half: 7.99, full: 13.99 },
      category: "Mexican"
    },
    {
      id: 7,
      name: "Pepperoni Pizza",
      description: "Classic pepperoni with mozzarella cheese and tomato sauce",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=300&fit=crop&crop=center&auto=format&q=60",
      rating: 4.6,
      price: { half: 14.99, full: 22.99 },
      category: "Pizza"
    },
    {
      id: 8,
      name: "Beef Burger",
      description: "Juicy beef patty with cheese, lettuce, tomato, and special sauce",
      image: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=500&h=300&fit=crop&crop=center&auto=format&q=60",
      rating: 4.5,
      price: { half: 9.99, full: 16.99 },
      category: "Burger"
    },
    {
      id: 9,
      name: "Greek Salad",
      description: "Fresh vegetables with feta cheese, olives, and olive oil dressing",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&h=300&fit=crop&crop=center&auto=format&q=60",
      rating: 4.2,
      price: { half: 7.99, full: 12.99 },
      category: "Salad"
    },
    {
      id: 10,
      name: "Butter Chicken",
      description: "Creamy tomato-based curry with tender chicken pieces",
      image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=500&h=300&fit=crop&crop=center&auto=format&q=60",
      rating: 4.7,
      price: { half: 11.99, full: 18.99 },
      category: "Indian"
    },
    {
      id: 11,
      name: "Tiramisu",
      description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone",
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&h=300&fit=crop&crop=center&auto=format&q=60",
      rating: 4.8,
      price: { half: 5.99, full: 9.99 },
      category: "Dessert"
    },
    {
      id: 12,
      name: "Chicken Quesadilla",
      description: "Grilled tortilla filled with chicken, cheese, and peppers",
      image: "https://images.unsplash.com/photo-1599974042762-64d2b8cfb4d1?w=500&h=300&fit=crop&crop=center&auto=format&q=60",
      rating: 4.3,
      price: { half: 8.99, full: 14.99 },
      category: "Mexican"
    }
  ];

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
