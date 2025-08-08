import React, { useEffect, useState } from 'react';
import './CheckoutPage.css';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        email: '',
        phone: ''
    });

    const [errors, setErrors] = useState({});
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [loading, setLoading] = useState(false);

    const updateQuantity = (id, delta) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
            )
        );
        updateStorage(updated);
    };

    const removeItem = (id) => {
        const updated = items.filter(item => item.id !== id);
        updateStorage(updated);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = (subtotal - discount) * 0.075;
    const total = subtotal - discount + tax;

    const validateShippingForm = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        else if (!/^[A-Za-z\s]+$/.test(formData.firstName)) newErrors.firstName = 'Only letters allowed';

        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        else if (!/^[A-Za-z\s]+$/.test(formData.lastName)) newErrors.lastName = 'Only letters allowed';

        if (!formData.address.trim()) newErrors.address = 'Address is required';
        else if (formData.address.length < 10) newErrors.address = 'Address too short';

        if (!formData.city.trim()) newErrors.city = 'City is required';
        else if (!/^[A-Za-z\s]+$/.test(formData.city)) newErrors.city = 'Only letters allowed';

        if (!formData.state) newErrors.state = 'State is required';

        if (!/^\d{6}$/.test(formData.zip)) newErrors.zip = 'Enter valid 6-digit ZIP code';

        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) newErrors.email = 'Invalid email';

        if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Enter valid 10-digit number';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleShippingSubmit = (e) => {
        e.preventDefault();
        if (validateShippingForm()) {
            alert('✅ Shipping information submitted successfully!');
        }
    };

    const applyPromoCode = () => {
        if (promoCode === 'HEALTH10') {
            const discountAmount = subtotal * 0.10;
            setDiscount(discountAmount);
            alert(`🎉 Promo code applied! ₹${discountAmount.toFixed(2)} off`);
        } else {
            setDiscount(0);
            alert('❌ Invalid promo code');
        }
    };

    const handlePayment = () => {
        if (items.length === 0) {
            alert('🛒 Your cart is empty. Add items before proceeding to payment.');
            return;
        }

        if (!validateShippingForm()) {
            alert('🚫 Please complete valid shipping information before making payment.');
            return;
        }

        setLoading(true);

        const options = {
            key: 'rzp_test_4Ea0vvGa7O4ivP',
            amount: Math.round(total * 100),
            currency: 'INR',
            name: 'PharmaCare',
            description: 'Medicine Purchase',
            image: '/logo.png',
            handler: function (response) {
                alert('✅ Payment Successful! Payment ID: ' + response.razorpay_payment_id);
                setItems([]);
                setDiscount(0);
                setPromoCode('');
                setLoading(false);
            },
            prefill: {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                contact: formData.phone
            },
            notes: {
                address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.zip}`
            },
            theme: {
                color: '#16a34a'
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
        rzp.on('payment.failed', () => {
            setLoading(false);
            alert('❌ Payment Failed');
        });
    };

    return (
        <div className="checkout-page">
            {/* --- Header --- */}
            <header className="pharmacheckout-header">
                <div className="pharmacheckout-header-container">
                    <div className="pharmacheckout-site-title">
                        <h1><span style={{ color: '#2563eb' }}>Pharma</span><span style={{ color: '#16a34a' }}>Care</span></h1>
                    </div>
                    <div className="pharmacheckout-home-link">
                        <Link to="/cartpage">Back</Link>
                    </div>
                </div>
            </header>

            {/* --- Main Content --- */}
            <main className="pharmacheckout-main-content">
                {/* Cart Section */}
                <section className="pharmacheckout-order-section">
                    <div className="pharmacheckout-card">
                        <h2><i className="fas fa-pills"></i> Your Medications</h2>
                        {items.length === 0 ? (
                            <p>Your cart is empty. <Link to="/">Go back to shop</Link></p>
                        ) : (
                            items.map(item => (
                                <div key={item.id} className="pharmacheckout-item-card">
                                    <img src={item.image} alt={item.name} className="pharmacheckout-item-image" />
                                    <div className="pharmacheckout-item-info">
                                        <div className="pharmacheckout-item-header">
                                            <h3>{item.name}</h3>
                                            <span>₹{item.price.toFixed(2)}</span>
                                        </div>
                                        <p>30 tablets | Prescription Medicine</p>
                                        <div className="pharmacheckout-item-footer">
                                            <div className="pharmacheckout-quantity-control">
                                                <button onClick={() => updateQuantity(item.id, -1)}><i className="fas fa-minus"></i></button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)}><i className="fas fa-plus"></i></button>
                                            </div>
                                            <button className="pharmacheckout-remove-btn" onClick={() => removeItem(item.id)}>
                                                <i className="fas fa-trash"></i> Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
 {/* Shipping Form */}
                    <div className="pharmacheckout-card">
                        <h2><i className="fas fa-truck"></i> Shipping Information</h2>
                        <form onSubmit={handleShippingSubmit} noValidate>
                            <div className="pharmacheckout-form-row">
                                <div className="pharmacheckout-form-group">
                                    <label>First Name</label>
                                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className={errors.firstName ? 'input-error' : ''} />
                                    {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                                </div>
                                <div className="pharmacheckout-form-group">
                                    <label>Last Name</label>
                                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className={errors.lastName ? 'input-error' : ''} />
                                    {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                                </div>
                            </div>

                            <div className="pharmacheckout-form-row">
                                <div className="pharmacheckout-form-group full-width">
                                    <label>Address</label>
                                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} className={errors.address ? 'input-error' : ''} />
                                    {errors.address && <span className="error-text">{errors.address}</span>}
                                </div>
                            </div>

                            <div className="pharmacheckout-form-row">
                                <div className="pharmacheckout-form-group">
                                    <label>City</label>
                                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} className={errors.city ? 'input-error' : ''} />
                                    {errors.city && <span className="error-text">{errors.city}</span>}
                                </div>
                                <div className="pharmacheckout-form-group">
                                    <label>State</label>
                                    <select name="state" value={formData.state} onChange={handleInputChange} className={errors.state ? 'input-error' : ''}>
                                        <option value="">Select</option>
                                        {[ 'Maharashtra', 'Gujarat', 'Karnataka', 'Tamil Nadu', 'Delhi', 'Rajasthan', 'Punjab', 'Uttar Pradesh', 'West Bengal', 'Kerala', 'Madhya Pradesh', 'Andhra Pradesh', 'Bihar', 'Odisha', 'Haryana', 'Chhattisgarh', 'Jharkhand', 'Assam', 'Himachal Pradesh', 'Goa' ].map(state => (
                                            <option key={state} value={state}>{state}</option>
                                        ))}
                                    </select>
                                    {errors.state && <span className="error-text">{errors.state}</span>}
                                </div>
                            </div>

                            <div className="pharmacheckout-form-row">
                                <div className="pharmacheckout-form-group full-width">
                                    <label>ZIP Code</label>
                                    <input type="text" name="zip" value={formData.zip} onChange={handleInputChange} className={errors.zip ? 'input-error' : ''} />
                                    {errors.zip && <span className="error-text">{errors.zip}</span>}
                                </div>
                            </div>

                            <div className="pharmacheckout-form-row">
                                <div className="pharmacheckout-form-group">
                                    <label>Email</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={errors.email ? 'input-error' : ''} />
                                    {errors.email && <span className="error-text">{errors.email}</span>}
                                </div>
                                <div className="pharmacheckout-form-group">
                                    <label>Phone</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className={errors.phone ? 'input-error' : ''} />
                                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                                </div>
                            </div>

                            <button type="submit" className="pharmacheckout-checkout-btn">Submit Shipping Info</button>
                        </form>
                    </div>
                </section>



                {/* Order Summary Section */}
                <aside className="pharmacheckout-summary-section">
                    <div className="pharmacheckout-card">
                        <h2><i className="fas fa-receipt"></i> Order Summary</h2>
                        <div className="pharmacheckout-summary-item"><span>Subtotal ({items.length} items)</span><span>₹{subtotal.toFixed(2)}</span></div>
                        <div className="pharmacheckout-summary-item"><span>Discount</span><span>- ₹{discount.toFixed(2)}</span></div>
                        <div className="pharmacheckout-summary-item"><span>Tax</span><span>₹{tax.toFixed(2)}</span></div>
                        <div className="pharmacheckout-coupon-row">
                            <input type="text" placeholder="Promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} className="pharmacheckout-coupon-input" />
                            <button className="pharmacheckout-apply-btn" onClick={applyPromoCode}>Apply</button>
                        </div>
                        <div className="pharmacheckout-total-row">
                            <span>Total</span>
                            <span className="pharmacheckout-total-amount">₹{total.toFixed(2)}</span>
                        </div>
                        <button className="pharmacheckout-checkout-btn" onClick={handlePayment} disabled={loading}>
                            <i className="fas fa-lock"></i> {loading ? 'Processing...' : 'Complete Secure Payment'}
                        </button>
                        <p className="pharmacheckout-terms">By completing your purchase you agree to our <a href="#">Terms of Service</a> and acknowledge our <a href="#">Privacy Policy</a>.</p>
                        <div className="pharmacheckout-support"><i className="fas fa-headset"></i> Need help? <a href="#">Contact Support</a></div>
                    </div>
                </aside>
            </main>
        </div>
    );
};

export default CheckoutPage;
