import React, { useEffect, useState} from 'react';
import './PharmaCatalog.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch, faUser, faPlus, faTimes,
    faShieldAlt, faShippingFast, faUserMd
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const PharmaCatalog = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Medication');
    const [modalProduct, setModalProduct] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
  
    const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("No token found. Redirecting to login...");
      navigate("/login");
      return;
    }

    fetch("http://localhost:8080/api/users/drugs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log("Fetched drugs:", data);
        const withPricing = data.map((p, index) => ({
          ...p,
          id: p.id || index + 1,
          dosage: p.dosage || "N/A",
          stock: p.quantity > 0 ? "In Stock" : "Out of Stock",
          image: p.imageUrl || "/images/default.jpg",
          originalPrice: (p.price * 1.2).toFixed(2),
          category: p.category || "General"
        }));
        setProducts(withPricing);
        setFilteredProducts(withPricing);
      })
      .catch(err => console.error("Error fetching drugs:", err));
  }, []);

  // 🔍 Filtering logic
  useEffect(() => {
    if (products.length > 0) {
      filterProducts();
    }
  }, [searchTerm, selectedCategory, products]);

  const filterProducts = () => {
    const filtered = products.filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All Medication' || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    setFilteredProducts(filtered);
  };


    // useEffect(() => {
    //     const productData = [ { name: 'Paracetamol', dosage: '500mg Tablets', description: 'Paracetamol', price: 20, stock: 'In Stock', image: '/images/paracetamol.jpg', category: 'Pain Relief' },
    //         { name: 'Ibuprofen', dosage: '200mg Tablets', description: 'Ibuprofen', price: 30, stock: 'In Stock', image: '/images/Ibuprofen.jpg', category: 'Pain Relief' },
    //         { name: 'Aspirin', dosage: '300mg Tablets', description: 'Aspirin', price: 25, stock: 'In Stock', image: '/images/Aspirin.jpg', category: 'Pain Relief' },
    //         { name: 'Naproxen', dosage: '250mg Tablets', description: 'Naproxen', price: 40, stock: 'In Stock', image: '/images/Naproxen.jpg', category: 'Pain Relief' },

    //         { name: 'Amoxicillin', dosage: '500mg Capsules', description: 'Amoxicillin', price: 60, stock: 'In Stock', image: '/images/amoxicillin.jpg', category: 'Antibiotics' },
    //         { name: 'Ciprofloxacin', dosage: '500mg Tablets', description: 'Ciprofloxacin', price: 55, stock: 'In Stock', image: '/images/Ciprofloxacin.jpg', category: 'Antibiotics' },
    //         { name: 'Doxycycline', dosage: '100mg Capsules', description: 'Doxycycline', price: 50, stock: 'In Stock', image: '/images/Doxycycline.jpg', category: 'Antibiotics' },
    //         { name: 'Azithromycin', dosage: '250mg Tablets', description: 'Azithromycin', price: 65, stock: 'In Stock', image: '/images/Azithromycin.jpg', category: 'Antibiotics' },

    //         { name: 'Metformin', dosage: '500mg Tablets', description: 'Metformin', price: 60, stock: 'In Stock', image: '/images/Metformin.jpg', category: 'Diabetes' },
    //         { name: 'Glipizide', dosage: '5mg Tablets', description: 'Glipizide', price: 75, stock: 'In Stock', image: '/images/Glipizide.jpg', category: 'Diabetes' },
    //         { name: 'Insulin', dosage: '100 IU/ml Injection', description: 'Insulin', price: 150, stock: 'In Stock', image: '/images/Insulin.jpg', category: 'Diabetes' },
    //         { name: 'Glyburide', dosage: '2.5mg Tablets', description: 'Glyburide', price: 50, stock: 'In Stock', image: '/images/Glyburide.jpg', category: 'Diabetes' },

    //         { name: 'Atenolol', dosage: '50mg Tablets', description: 'Atenolol', price: 70, stock: 'In Stock', image: '/images/Atenolol.jpg', category: 'Heart Health' },
    //         { name: 'Lisinopril', dosage: '10mg Tablets', description: 'Lisinopril', price: 65, stock: 'In Stock', image: '/images/Lisinopril.jpg', category: 'Heart Health' },
    //         { name: 'Atorvastatin', dosage: '10mg Tablets', description: 'Atorvastatin', price: 85, stock: 'In Stock', image: '/images/Atorvastatin.jpg', category: 'Heart Health' },
    //         { name: 'Clopidogrel', dosage: '75mg Tablets', description: 'Clopidogrel', price: 95, stock: 'In Stock', image: '/images/Clopidogrel.jpg', category: 'Heart Health' },

    //         { name: 'Cetirizine', dosage: '10mg Tablets', description: 'Cetirizine', price: 30, stock: 'In Stock', image: '/images/Cetirizine.jpg', category: 'Allergies' },
    //         { name: 'Loratadine', dosage: '10mg Tablets', description: 'Loratadine', price: 35, stock: 'In Stock', image: '/images/Loratadine.jpg', category: 'Allergies' },
    //         { name: 'Fexofenadine', dosage: '120mg Tablets', description: 'Fexofenadine', price: 40, stock: 'In Stock', image: '/images/Fexofenadine.jpg', category: 'Allergies' },
    //         { name: 'Diphenhydramine', dosage: '25mg Tablets', description: 'Diphenhydramine', price: 28, stock: 'In Stock', image: '/images/Diphenhydramine.jpg', category: 'Allergies' },

    //         { name: 'Phenylephrine', dosage: '10mg Tablets', description: 'Phenylephrine', price: 22, stock: 'In Stock', image: '/images/Phenylephrine.jpg', category: 'Cold & Flu' },
    //         { name: 'Chlorpheniramine', dosage: '4mg Tablets', description: 'Chlorpheniramine', price: 25, stock: 'In Stock', image: '/images/Chlorpheniramine.jpg', category: 'Cold & Flu' },
    //         { name: 'Guaifenesin', dosage: '100mg Tablets', description: 'Guaifenesin', price: 33, stock: 'In Stock', image: '/images/Guaifenesin.jpg', category: 'Cold & Flu' },
    //         { name: 'Dextromethorphan', dosage: '15mg Tablets', description: 'Dextromethorphan', price: 29, stock: 'In Stock', image: '/images/Dextromethorphan.jpg', category: 'Cold & Flu' }, ];

    //     const withIdAndPricing = productData.map((p, index) => ({
    //         ...p,
    //         id: index + 1,
    //         originalPrice: (p.price * 1.2).toFixed(2)
    //     }));

    //     setProducts(withIdAndPricing);
    //     setFilteredProducts(withIdAndPricing);
    // }, []);

    // useEffect(() => {
    //     if (products.length > 0) {
    //         filterProducts();
    //     }
    // }, [searchTerm, selectedCategory, products]);

    // const filterProducts = () => {
    //     const filtered = products.filter(product => {
    //         const matchesSearch =
    //             product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //             product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //             product.category.toLowerCase().includes(searchTerm.toLowerCase());

    //         const matchesCategory =
    //             selectedCategory === 'All Medication' || product.category === selectedCategory;

    //         return matchesSearch && matchesCategory;
    //     });

    //     setFilteredProducts(filtered);
    // };

    const showProductDetails = (product) => {
        navigate('/details', { state: { product } });
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const uniqueCategories = ['All Medication', ...Array.from(new Set(products.map(p => p.category)))];

    const categoryImages = {
        "All Medication": "/images/capsule.jpg",
        "Pain Relief": "/images/pain-relief.jpg",
        "Antibiotics": "/images/antibiotics.jpg",
        "Diabetes": "/images/diabetes.jpg",
        "Heart Health": "/images/heart-health.jpg",
        "Allergies": "/images/allergies.jpg",
        "Cold & Flu": "/images/cold-flu.jpg"
    };

    return (
        <div className="pharmacatalog-bg">
            {/* Navbar */}
            <nav className="pharmacatalog-navbar">
                <div className="pharmacatalog-navbar-container">
                    <div className="pharmacatalog-navbar-logo">
                        <img src="/images/logo.jpg" alt="PharmaCare Logo" className="pharmacatalog-logo-img" />
                        <h1 className="pharmacatalog-brand-title">Pharma<span className="pharmacatalog-highlight">Care</span></h1>
                    </div>
                    <div className="pharmacatalog-navbar-links">
                        <a href="/home">Home</a>
                        <a href="#products">Products</a>
                        <a href="#categories">Categories</a>
                        <a href="#about">About</a>
                    </div>
                    <div className="pharmacatalog-navbar-search">
                        <input
                            type="text"
                            placeholder="Search medicines..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section id="home" className="pharmacatalog-hero-section">
                <div className="pharmacatalog-hero-content">
                    <h1>Your Health, Our Priority</h1>
                    <p>Get genuine medicines delivered to your doorstep. Trusted by thousands of customers nationwide.</p>
                    <div className="pharmacatalog-hero-buttons">
                        <button onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}>Shop Now</button>
                        <button>Learn More</button>
                    </div>
                </div>
                <div className="pharmacatalog-hero-image">
                    <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3dd35b2d-b0d9-4b2e-9d58-9beacabf43bc.png" alt="Happy diverse group of people holding medicine packages" />
                </div>
            </section>

            {/* Categories */}
            <section id="categories" className="pharmacatalog-categories-section">
                <h2>Shop by Category</h2>
                <p>Find the medicines you need quickly by browsing our categories</p>
                <div className="pharmacatalog-categories">
                    {uniqueCategories.map(category => (
                        <div
                            key={category}
                            className={`pharmacatalog-category-card ${selectedCategory === category ? 'pharmacatalog-category-active' : ''}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            <img
                                src={categoryImages[category] || "/images/categories/default.jpg"}
                                alt={category}
                                className="pharmacatalog-category-image"
                            />
                            <span>{category}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Products */}
            <section id="products" className="pharmacatalog-products-section">
                <h2>Our Top Products</h2>
                <p>High-quality medicines for all your health needs</p>
                <div className="pharmacatalog-products-container">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="pharmacatalog-product-card">
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p className="pharmacatalog-dosage">{product.dosage}</p>
                            <div className="pharmacatalog-product-info">
                                <span>₹{product.price}</span>
                                <span className="pharmacatalog-original-price">₹{product.originalPrice}</span>
                                <span>{product.stock}</span>
                            </div>
                            <button onClick={() => showProductDetails(product)}>View Details</button>
                        </div>
                    ))}
                </div>
                <button className="pharmacatalog-view-all">View All Products</button>
            </section>

            {/* Footer */}
            <footer className="pharmacatalog-footer">
                <div className="pharmacatalog-footer-content">
                    <div className="pharmacatalog-footer-col">
                        <div className="pharmacatalog-logo-area">
                            <h1 className="pharmacatalog-brand-title">Pharma<span className="pharmacatalog-highlight">Care</span></h1>
                        </div>
                        <p>Your trusted partner for pharmaceutical needs. Providing quality medications with care since 2010.</p>
                    </div>
                    <div className="pharmacatalog-footer-col">
                        <h4>Quick Links</h4>
                        <ul>
                            <li>Home</li>
                            <li>All Medications</li>
                            <li>Prescription Refills</li>
                            <li>Health Blog</li>
                        </ul>
                    </div>
                    <div className="pharmacatalog-footer-col">
                        <h4>Information</h4>
                        <ul>
                            <li>About Us</li>
                            <li>Privacy Policy</li>
                            <li>Terms of Service</li>
                            <li>Shipping Policy</li>
                            
                        </ul>
                    </div>
                    <div className="pharmacatalog-footer-col">
                        <h4>Contact Us</h4>
                        <ul>
                            <li><FontAwesomeIcon icon={faShieldAlt} /> 123 Medical Ave</li>
                            <li><FontAwesomeIcon icon={faShippingFast} /> (800) 555-HEAL</li>
                            <li><FontAwesomeIcon icon={faUserMd} /> support@pharmacare.com</li>
                        </ul>
                    </div>
                </div>
                <div className="pharmacatalog-footer-bottom">
                    <p>© 2023 PharmaCare. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default PharmaCatalog;
