import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cart, cartTotal, clearCart, addOrder } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      // Simulate API call for processing payment
      await new Promise(resolve => setTimeout(resolve, 2000));

      const orderDetails = {
        id: Date.now(),
        items: cart,
        total: cartTotal,
        date: new Date().toLocaleString(),
      };

      addOrder(orderDetails);
      clearCart();
      toast.success('Checkout successful! Your order has been placed.');
      navigate('/orders');
    } catch (error) {
      toast.error('Checkout failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
          🏁 Checkout
        </h2>

        {cart.length === 0 ? (
          <div className="text-center py-5">
            <h4 className="text-muted">Your cart is empty</h4>
            <p className="text-muted">Go back to the <a href="/menu">Menu</a> and add some items.</p>
          </div>
        ) : (
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow-lg mb-4">
                <div className="card-header bg-primary text-white">Order Summary</div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    {cart.map(item => (
                      <li className="list-group-item d-flex justify-content-between align-items-center" key={item.cartId}>
                        {item.name} ({item.size})
                        <span className="badge bg-primary rounded-pill">x{item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 d-flex justify-content-between">
                    <h4 className="fw-bold text-success">Total: ${cartTotal.toFixed(2)}</h4>
                  </div>
                </div>
              </div>
              <button
                className="btn btn-primary btn-lg w-100"
                onClick={handleCheckout}
                disabled={isLoading}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '25px',
                  padding: '10px 25px'
                }}
              >
                {isLoading ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
