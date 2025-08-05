import React from 'react'

export default function Carousal() {
  return (
    <div className="position-relative">
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to="2"></button>
        </div>
        
        <div className="carousel-inner">
          <div className="carousel-item active position-relative">
            <img 
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1200&h=600&fit=crop&crop=center&auto=format&q=60" 
              className="d-block w-100" 
              alt="Delicious Pizza"
              style={{height: '70vh', objectFit: 'cover', filter: 'brightness(0.7)'}}
            />
            <div className="carousel-caption d-flex flex-column justify-content-center h-100">
              <h1 className="display-4 fw-bold mb-3" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                🍕 Delicious Food Delivered
              </h1>
              <p className="lead mb-4" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>
                Fresh, hot meals delivered right to your doorstep in minutes!
              </p>
              <div>
                <button className="btn btn-primary btn-lg me-3" style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  padding: '12px 30px'
                }}>
                  Order Now 🚀
                </button>
              </div>
            </div>
          </div>
          
          <div className="carousel-item position-relative">
            <img 
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=600&fit=crop&crop=center&auto=format&q=60" 
              className="d-block w-100" 
              alt="Fresh Ingredients"
              style={{height: '70vh', objectFit: 'cover', filter: 'brightness(0.7)'}}
            />
            <div className="carousel-caption d-flex flex-column justify-content-center h-100">
              <h1 className="display-4 fw-bold mb-3" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                🥗 Fresh & Healthy Options
              </h1>
              <p className="lead mb-4" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>
                Made with the freshest ingredients and lots of love!
              </p>
            </div>
          </div>
          
          <div className="carousel-item position-relative">
            <img 
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=600&fit=crop&crop=center&auto=format&q=60" 
              className="d-block w-100" 
              alt="Fast Delivery"
              style={{height: '70vh', objectFit: 'cover', filter: 'brightness(0.7)'}}
            />
            <div className="carousel-caption d-flex flex-column justify-content-center h-100">
              <h1 className="display-4 fw-bold mb-3" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                ⚡ Super Fast Delivery
              </h1>
              <p className="lead mb-4" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>
                Get your favorite meals in 30 minutes or less!
              </p>
            </div>
          </div>
        </div>
        
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  )
}
