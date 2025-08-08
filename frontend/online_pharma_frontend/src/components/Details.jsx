// src/Details.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Details.css'; // Optional CSS for styling

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
 

  if (!product) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Product not found</h2>
        <button onClick={() => navigate('/')}>Go Back</button>
      </div>
    );
  }

  // ✅ Add to cart handler
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
    // Optional: redirect to cart
    // navigate('/cartpage');
  };

  return (
    <div className="details-container">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <div className="details-card">
        <img src={product.image} alt={product.name} className="details-img" />
        <div className="details-info">
          <h2>{product.name}</h2>
          <p><strong>Dosage:</strong> {product.dosage}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Uses:</strong> {product.uses}</p>
          <p><strong>Side Effects:</strong> {product.sideEffects}</p>
          <p><strong>Price:</strong> ₹{product.price}</p>
          <p><strong>Category:</strong> {product.category}</p>

          {/* ✅ Add to Cart Button */}
          <button
            className="add-to-cart-button"
            onClick={handleAddToCart}
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
