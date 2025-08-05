import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';

export default function Profile() {
  const { user, setUser } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setUser({ ...user, ...formData });
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || ''
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div>
        <NavBar />
        <div className="container mt-5 text-center" style={{ minHeight: '60vh' }}>
          <h4 className="text-muted">Please log in to view your profile</h4>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="container mt-5" style={{ minHeight: '60vh' }}>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-lg border-0" style={{ borderRadius: '20px' }}>
              <div className="card-header text-center" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                borderRadius: '20px 20px 0 0'
              }}>
                <h3 className="mb-0">👤 My Profile</h3>
              </div>
              <div className="card-body p-5">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        style={{
                          borderRadius: '10px',
                          border: '2px solid #e9ecef'
                        }}
                      />
                    ) : (
                      <p className="form-control-plaintext fs-5">{user.name}</p>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{
                          borderRadius: '10px',
                          border: '2px solid #e9ecef'
                        }}
                      />
                    ) : (
                      <p className="form-control-plaintext fs-5">{user.email}</p>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        className="form-control form-control-lg"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        style={{
                          borderRadius: '10px',
                          border: '2px solid #e9ecef'
                        }}
                      />
                    ) : (
                      <p className="form-control-plaintext fs-5">{user.phone}</p>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Address</label>
                    {isEditing ? (
                      <textarea
                        className="form-control"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="3"
                        style={{
                          borderRadius: '10px',
                          border: '2px solid #e9ecef'
                        }}
                      />
                    ) : (
                      <p className="form-control-plaintext fs-5">{user.address}</p>
                    )}
                  </div>
                </div>

                <div className="text-center mt-4">
                  {isEditing ? (
                    <div>
                      <button
                        className="btn btn-success me-3"
                        onClick={handleSave}
                        style={{
                          borderRadius: '25px',
                          padding: '10px 25px'
                        }}
                      >
                        <FaSave className="me-2" />
                        Save Changes
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={handleCancel}
                        style={{
                          borderRadius: '25px',
                          padding: '10px 25px'
                        }}
                      >
                        <FaTimes className="me-2" />
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => setIsEditing(true)}
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        borderRadius: '25px',
                        padding: '10px 25px'
                      }}
                    >
                      <FaEdit className="me-2" />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
