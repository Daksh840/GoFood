# 🍽️ GoFood - Premium Food Delivery Application

A comprehensive, modern food delivery application built with React.js, featuring a beautiful UI, complete user authentication, shopping cart functionality, and order management system.

## ✨ Features

### 🔐 Authentication System
- **User Registration** - Complete signup form with validation
- **User Login** - Secure login with form validation
- **Profile Management** - Edit and update user information
- **Session Persistence** - User state maintained across browser sessions

### 🛒 Shopping Cart
- **Add to Cart** - Add items with different sizes and quantities
- **Cart Management** - Update quantities, remove items
- **Real-time Updates** - Live cart count and total calculation
- **Persistent Cart** - Cart items saved in local storage

### 🍕 Food Menu
- **Interactive Menu** - Browse delicious food items with high-quality images
- **Search Functionality** - Find food items by name, description, or category
- **Category Filtering** - Filter by Pizza, Burger, Salad, Indian, Dessert, Mexican
- **Detailed Cards** - Each item shows rating, price, description
- **Size Options** - Choose between half and full portions
- **Quantity Selection** - Select quantity from 1-10

### 📦 Order Management
- **Checkout Process** - Streamlined order placement
- **Order History** - View all past orders with details
- **Order Tracking** - Order status and date tracking

### 🎨 User Experience
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Dark/Light Theme** - Toggle between themes
- **Beautiful Animations** - Smooth transitions and hover effects
- **Toast Notifications** - Real-time feedback for user actions
- **Loading States** - Elegant loading indicators

### 🏠 Pages
- **Home** - Hero carousel with featured content
- **Menu** - Complete food catalog with search and filters
- **About** - Information about the service
- **Cart** - Shopping cart management
- **Profile** - User account management
- **Orders** - Order history and tracking
- **Checkout** - Order finalization

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd gofood-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Frontend Framework:** React.js 18
- **Routing:** React Router DOM
- **Styling:** Bootstrap 5 + Custom CSS
- **Icons:** React Icons (Font Awesome)
- **Notifications:** React Toastify
- **State Management:** React Context API
- **Local Storage:** For data persistence
- **Unique IDs:** UUID for cart items

## 📁 Project Structure

```
src/
├── components/
│   ├── NavBar.js          # Navigation with search & theme toggle
│   ├── Footer.js          # Comprehensive footer
│   ├── Card.js            # Food item cards with filtering
│   └── Carousal.js        # Hero carousel
├── screens/
│   ├── Home.js            # Landing page
│   ├── Login.js           # User authentication
│   ├── Signup.js          # User registration
│   ├── Menu.js            # Food catalog
│   ├── Cart.js            # Shopping cart
│   ├── Checkout.js        # Order placement
│   ├── Profile.js         # User profile
│   ├── About.js           # About page
│   └── OrderHistory.js    # Order tracking
├── context/
│   └── AppContext.js      # Global state management
├── App.js                 # Main app component
├── index.js              # App entry point
└── index.css             # Global styles
```

## 🎯 Key Features Explained

### State Management
The app uses React Context API for global state management, handling:
- User authentication state
- Shopping cart items
- Order history
- Search and filter states
- Theme preferences

### Data Persistence
- User data stored in localStorage
- Cart items persist across sessions
- Order history maintained locally
- Theme preference remembered

### Responsive Design
- Mobile-first approach
- Bootstrap grid system
- Custom breakpoints for optimal viewing
- Touch-friendly interface

## 🚀 Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production with optimizations

### `npm run eject`
**Note: This is a one-way operation!**

## 🎨 Customization

### Theme Colors
Main gradient: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`

To customize, update the gradient in:
- `src/index.css` (for global styles)
- Component-specific styles

### Adding New Food Items
Update the `foodItems` array in `src/components/Card.js`:

```javascript
{
  id: 7,
  name: "New Item",
  description: "Description here",
  image: "image-url",
  rating: 4.5,
  price: { half: 8.99, full: 15.99 },
  category: "Category"
}
```

## 📱 Mobile Optimization

- Responsive navigation with hamburger menu
- Touch-optimized buttons and forms
- Optimized images for mobile loading
- Swipe-friendly carousel

## 🔒 Security Features

- Form validation for all inputs
- Password visibility toggle
- Email format validation
- Phone number validation
- XSS protection through React

## 🌟 Future Enhancements

- [ ] Payment gateway integration
- [ ] Real-time order tracking
- [ ] Restaurant admin panel
- [ ] Reviews and ratings system
- [ ] Push notifications
- [ ] GPS location integration
- [ ] Multiple payment methods
- [ ] Promotional codes/coupons

## 🐛 Known Issues

None currently. Please report any bugs in the issues section.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ for food lovers everywhere!

---

**Enjoy your delicious journey with GoFood! 🍕🍔🥗**
