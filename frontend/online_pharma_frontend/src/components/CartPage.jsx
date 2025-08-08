import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // ⬅️ Add useLocation
import './CartPage.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); // ⬅️ Get passed state
  const fromDetails = location.state?.fromDetails;
  const product = location.state?.product;

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartWithQty = storedCart.map(item => ({
      ...item,
      quantity: item.quantity || 1
    }));
    setCartItems(cartWithQty);
  }, []);

  const updateStorage = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const increase = (id) => {
    const updated = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateStorage(updated);
  };

  const decrease = (id) => {
    const updated = cartItems.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateStorage(updated);
  };

  const remove = (id) => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      const updated = cartItems.filter(item => item.id !== id);
      updateStorage(updated);
    }
  };

  const total = cartItems.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      <button
  className="back-button"
  onClick={() => {
    const lastViewed = JSON.parse(localStorage.getItem('lastViewedProduct'));
    if (lastViewed) {
      navigate('/catalog', { state: { product: lastViewed } });
    } else {
      navigate('/');
    }
  }}
>
  ← Back
</button>


      {cartItems.length === 0 ? (
        <p>
          Cart is empty. <a href="/">Go to catalog</a>
        </p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <span>{item.name}</span>
                <div className="controls">
                  <span>₹{item.price.toFixed(2)} x {item.quantity}</span>
                  <div className="qty-controls">
                    <button onClick={() => decrease(item.id)} disabled={item.quantity <= 1}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increase(item.id)}>+</button>
                  </div>
                  <span>Total: ₹{(item.price * item.quantity).toFixed(2)}</span>
                  <button className="remove-button" onClick={() => remove(item.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total: ₹{total.toFixed(2)}</h3>
          <button className="checkout-button" onClick={() => navigate('/checkoutpage')}>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
