import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Cart from './screens/Cart';
import Menu from './screens/Menu';
import About from './screens/About';
import Profile from './screens/Profile';
import OrderHistory from './screens/OrderHistory';
import Checkout from './screens/Checkout';
import { AppProvider } from './context/AppContext';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <AppProvider>
      <Router>
        <div> 
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/signup" element={<Signup/>} />
            <Route exact path="/cart" element={<Cart/>} />
            <Route exact path="/menu" element={<Menu/>} />
            <Route exact path="/about" element={<About/>} />
            <Route exact path="/profile" element={<Profile/>} />
            <Route exact path="/orders" element={<OrderHistory/>} />
            <Route exact path="/checkout" element={<Checkout/>} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
