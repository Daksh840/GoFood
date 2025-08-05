import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useAppContext } from '../context/AppContext';

export default function OrderHistory() {
  const { orders } = useAppContext();

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
          📜 Order History
        </h2>

        {orders.length === 0 ? (
          <div className="text-center py-5">
            <h4 className="text-muted">You have no orders yet</h4>
            <p className="text-muted">Go ahead and <a href="/menu">order some delicious food</a>!</p>
          </div>
        ) : (
          <div className="accordion" id="accordionOrders">
            {orders.map((order, index) => (
              <div className="accordion-item" key={order.id}>
                <h2 className="accordion-header" id={`heading${index}`}>
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${index}`}
                  >
                    Order on {order.date} - ${order.total.toFixed(2)}
                  </button>
                </h2>
                <div id={`collapse${index}`} className="accordion-collapse collapse" data-bs-parent="#accordionOrders">
                  <div className="accordion-body">
                    <ul className="list-group list-group-flush">
                      {order.items.map((item) => (
                        <li className="list-group-item d-flex justify-content-between align-items-center" key={item.cartId}>
                          {item.name} ({item.size} x{item.quantity})
                          <span>${item.price.toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
