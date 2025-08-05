import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useAppContext } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Cart() {
  const { cart, updateCartItem, removeFromCart, cartTotal } = useAppContext();
  const navigate = useNavigate();

  const handleQuantityChange = (cartId, quantity) => {
    if (quantity < 1) {
      toast.error('Quantity cannot be less than 1.');
      return;
    }
    updateCartItem(cartId, quantity);
  };

  const handleRemoveItem = (cartId) => {
    removeFromCart(cartId);
    toast.success('Item removed from cart.');
  };

  const proceedToCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty.');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div>
      <NavBar />
      <div className="container mt-5" style={{ minHeight: '60vh' }}>
        <h2 className="fw-bold text-center mb-4" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '2rem'
        }}>
          🛒 Your Shopping Cart
        </h2>
        {cart.length === 0 ? (
          <div className="text-center py-5">
            <h4 className="text-muted">Your cart is empty</h4>
            <p className="text-muted">Start adding delicious food to your cart. <Link to="/menu">Visit Menu</Link>.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Food Item</th>
                  <th>Size</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.cartId}>
                    <td className="d-flex align-items-center">
                      <img src={item.image} alt={item.name} className="img-fluid rounded me-3" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                      <div>
                        <h6 className="mb-0 fw-semibold">{item.name}</h6>
                        <small className="text-muted">{item.description}</small>
                      </div>
                    </td>
                    <td>{item.size}</td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.cartId, parseInt(e.target.value))}
                        style={{ width: '60px' }}
                      />
                    </td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button className="btn btn-link text-danger" onClick={() => handleRemoveItem(item.cartId)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-between align-items-center mt-4">
              <h4 className="fw-bold text-success">Total: ${cartTotal.toFixed(2)}</h4>
              <button className="btn btn-primary btn-lg" onClick={proceedToCheckout} style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '25px',
                padding: '10px 25px'
              }}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
