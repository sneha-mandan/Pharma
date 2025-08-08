import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PharmaCatalog from './components/PharmaCatalog';
import '@fortawesome/fontawesome-free/css/all.min.css';
import CheckoutPage from './components/CheckoutPage';
import OrderHistory from './components/OrderHistory';
import CartPage from './components/CartPage';
import Details from './components/Details';
import Navbar from './components/Navbar';
import Home from './components/Home';



const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<PharmaCatalog />} />
          <Route path="/catalog" element={<PharmaCatalog />} />
          <Route path="/checkoutpage" element={<CheckoutPage />} />
          <Route path="/orderhistory" element={<OrderHistory />} />
          <Route path="/cartpage" element={<CartPage />} />
          <Route path="/details" element={<Details />} /> {/* fixed route path */}
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/home" element={<Home/>} />
          {/* for admin */}
          {/* <Route path="/admin-login" element={<AdminLoginPage />} /> */}

        </Routes>
      </div>
    </Router>
  );
};

export default App;
