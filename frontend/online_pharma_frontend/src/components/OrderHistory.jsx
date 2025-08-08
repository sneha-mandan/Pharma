import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './OrderHistory.css';

const OrderHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const orders = [
    {
      id: 'ORD-2023-001',
      date: '2023-05-15',
      status: 'delivered',
      products: [
        {
          name: 'Pain Relief Tablets',
          image: '/images/pain-relief.jpg',
          quantity: 2,
          price: 129.9,
        },
        {
          name: 'Cold & Flu Syrup',
          image: '/images/cold-flu.jpg',
          quantity: 1,
          price: 85.0,
        },
      ],
      total: 344.8,
    },
    {
      id: 'ORD-2023-002',
      date: '2023-05-10',
      status: 'delivered',
      products: [
        {
          name: 'Multivitamin Capsules',
          image: '/images/capsule.jpg',
          quantity: 1,
          price: 159.9,
        },
      ],
      total: 159.9,
    },
    {
      id: 'ORD-2023-003',
      date: '2023-05-05',
      status: 'pending',
      products: [
        {
          name: 'Antibiotic Cream',
          image: 'https://placehold.co/100x100?text=Antibiotic',
          quantity: 1,
          price: 79.9,
        },
        {
          name: 'Bandages',
          image: 'https://placehold.co/100x100?text=Bandages',
          quantity: 3,
          price: 42.5,
        },
      ],
      total: 207.4,
    },
    {
      id: 'ORD-2023-004',
      date: '2023-04-28',
      status: 'cancelled',
      products: [
        {
          name: 'Blood Pressure Monitor',
          image: 'https://placehold.co/100x100?text=BP+Monitor',
          quantity: 1,
          price: 459.9,
        },
      ],
      total: 459.9,
    },
    {
      id: 'ORD-2023-005',
      date: '2023-05-20',
      status: 'delivered',
      products: [
        {
          name: 'Crocin Advance',
          image: 'https://placehold.co/100x100?text=Crocin',
          quantity: 1,
          price: 32.0,
        },
        {
          name: 'Zincovit Syrup',
          image: 'https://placehold.co/100x100?text=Zincovit',
          quantity: 2,
          price: 48.5,
        },
        {
          name: 'Dolo 650',
          image: 'https://placehold.co/100x100?text=Dolo+650',
          quantity: 1,
          price: 20.0,
        },
      ],
      total: 149.0,
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.products.some((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      statusFilter === 'all' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case 'delivered':
        return 'ohx-status-delivered';
      case 'pending':
        return 'ohx-status-pending';
      case 'cancelled':
        return 'ohx-status-cancelled';
      default:
        return '';
    }
  };

  const handleReorder = (orderId) => {
    alert(`Reorder initiated for order ${orderId}`);
  };

  const handleViewDetails = (orderId) => {
    alert(`Viewing details for order ${orderId}`);
  };

  return (
    <div className="ohx-order-history-container">
      <div className="ohx-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Your Order History</h1>
        <Link to="/home" className="ohx-home-link">Home</Link>
      </div>

      <div className="ohx-order-list">
        <div className="ohx-filter-controls">
          <input
            type="text"
            className="ohx-search-box"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="ohx-filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="delivered">Delivered</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order.id} className="ohx-order-card">
              <div className="ohx-order-header">
                <div>
                  <span className="ohx-order-id">{order.id}</span>
                  <span className="ohx-order-date"> • {new Date(order.date).toLocaleDateString()}</span>
                </div>
                <span className={`ohx-order-status ${getStatusClass(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              <div className="ohx-order-details">
                {order.products.map((product, index) => (
                  <div key={index} className="ohx-product-item">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="ohx-product-image"
                      onError={(e) => (e.target.src = 'https://placehold.co/100x100?text=Medicine')}
                    />
                    <div className="ohx-product-info">
                      <div className="ohx-product-name">{product.name}</div>
                      <div className="ohx-product-quantity">Qty: {product.quantity}</div>
                    </div>
                    <div className="ohx-product-price">₹{product.price.toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <div className="ohx-order-total">Total: ₹{order.total.toFixed(2)}</div>

              <div className="ohx-action-buttons">
                <button
                  className="ohx-btn ohx-btn-details"
                  onClick={() => handleViewDetails(order.id)}
                >
                  View Details
                </button>
                {order.status !== 'cancelled' && (
                  <button
                    className="ohx-btn ohx-btn-reorder"
                    onClick={() => handleReorder(order.id)}
                  >
                    Reorder
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="ohx-empty-state">
            <img src="https://placehold.co/150x150?text=No+Orders" alt="No orders found" />
            <h3>No orders found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
