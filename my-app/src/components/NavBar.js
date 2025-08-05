import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { FaSearch, FaSun, FaMoon, FaUser, FaSignOutAlt } from 'react-icons/fa';

export default function NavBar() {
  const { user, cartItemsCount, logout, searchTerm, setSearchTerm, theme, setTheme } = useAppContext();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate('/menu');
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic fw-bold" to="/" style={{
            color: '#fff',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            🍽️ GoFood
          </Link>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link fw-semibold" to="/">🏠 Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-semibold" to="/menu">📋 Menu</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-semibold" to="/about">ℹ️ About</Link>
              </li>
            </ul>
            
            {/* Search Bar */}
            <div className="d-flex align-items-center me-3">
              {showSearchBar && (
                <form onSubmit={handleSearch} className="d-flex me-2">
                  <input
                    className="form-control form-control-sm"
                    type="search"
                    placeholder="Search food..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '200px' }}
                  />
                </form>
              )}
              <button
                className="btn btn-outline-light btn-sm me-2"
                onClick={() => setShowSearchBar(!showSearchBar)}
                type="button"
              >
                <FaSearch />
              </button>
              
              {/* Theme Toggle */}
              <button
                className="btn btn-outline-light btn-sm me-2"
                onClick={toggleTheme}
                type="button"
              >
                {theme === 'light' ? <FaMoon /> : <FaSun />}
              </button>
            </div>
            
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link fw-semibold position-relative" to="/cart">
                  🛒 Cart
                  {cartItemsCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
              </li>
              
              {user ? (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle fw-semibold"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaUser className="me-1" />
                    {user.name}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        <FaUser className="me-2" />Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/orders">
                        📋 Order History
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        <FaSignOutAlt className="me-2" />Logout
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link fw-semibold" to="/login">👤 Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fw-semibold" to="/signup">📝 Sign Up</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
