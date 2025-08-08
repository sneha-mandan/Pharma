import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartCount }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">PharmaCare</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">
          🛒 Cart{cartCount > 0 && <span className="cart-badge">({cartCount})</span>}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;