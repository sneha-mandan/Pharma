import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { MdDarkMode } from 'react-icons/md';
import './Home.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faShippingFast, faUserMd } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  return (
    <div className="App">
      <Navbar toggleDarkMode={() => setDarkMode((prev) => !prev)} />
      <Hero />
      <MedicineSlider />
      <Services />
      <Testimonials />
      <Contact />
      <DoctorSlider />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

const Navbar = ({ toggleDarkMode }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/images/logo.jpg" alt="PharmaCare Logo" className="logo-img" />
        <h1>
          <span style={{ color: '#2563eb' }}>Pharma</span>
          <span style={{ color: '#16a34a' }}>Care</span>
        </h1>
      </div>

      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#doctors">Doctors</a></li>
        <li><Link to="/catalog">Catalog</Link></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <div className="nav-icons">
        <Link to="/cartpage" className="icon-container">
          <FaShoppingCart className="icon" />
        </Link>

        <Link to="/admin-login" className="sign-in-btn">
          <FaUser className="icon" />
          <span>Sign In</span>
        </Link>


        <button className="sign-in-btn">
          <FaUser className="icon" />
          <span>Sign In</span>
        </button>

        <button className="dark-mode-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
          <MdDarkMode className="icon" />
        </button>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section className="hero" id="home">
    <div className="hero-content">
      <div className="hero-text">
        <h1>Best Drugstore In Your Reach</h1>
        <p>Trusted pharmacy platform to buy medicines, upload prescriptions, and get expert help.</p>
        <button>Explore Medicines</button>
      </div>
      <div className="hero-image">
        <img src="/images/pexels-pixabay-139398.jpg" alt="Pharmacy illustration" />
      </div>
    </div>
  </section>
);

const MedicineSlider = () => {
  const medicines = [
    ['/images/paracetamol.jpeg', 'Paracetamol'],
    ['/images/cough-syrup.jpeg', 'Cough Syrup'],
    ['/images/antibiotic.jpeg', 'Antibiotic'],
    ['/images/vitamins.jpeg', 'Vitamins'],
    ['/images/skin-cream.jpeg', 'Skin Cream'],
    ['/images/inhaler.jpeg', 'Inhaler'],
    ['/images/pain-reilef.jpeg', 'Pain Relief'],
    ['/images/nasalSpary.jpeg', 'Nasal Spray'],
    ['/images/allergytable.jpeg', 'Allergy Tablets'],
    ['/images/multivitamin.jpeg', 'Multivitamins'],
  ];

  return (
    <section className="slider-section">
      <h2>Top Medicines</h2>
      <div className="slider-container">
        {medicines.map(([src, name], i) => (
          <div className="slider-card" key={i}>
            <img src={src} alt={name} />
            <h4>{name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

const DoctorSlider = () => {
  const doctors = [
    ['Dr. Sharma', '/images/femaledoctor.jpeg'],
    ['Dr. Verma', '/images/maleDoctor.jpeg'],
    ['Dr. Khan', '/images/maleDoctor.jpeg'],
    ['Dr. Iyer', '/images/femaledoctor.jpeg'],
    ['Dr. Rao', '/images/maleDoctor.jpeg'],
    ['Dr. Gupta', '/images/femaledoctor.jpeg'],
    ['Dr. Patel', '/images/maleDoctor.jpeg'],
    ['Dr. Joshi', '/images/maleDoctor.jpeg'],
    ['Dr. Roy', '/images/maleDoctor.jpeg'],
    ['Dr. Meena', '/images/femaledoctor.jpeg'],
    ['Dr. Radhika', '/images/maleDoctor.jpeg'],
  ];

  return (
    <section className="slider-section" id="doctors">
      <h2>Top Drug Experts</h2>
      <div className="slider-container">
        {doctors.map(([name, src], i) => (
          <div className="slider-card" key={i}>
            <img
              src={src}
              alt={name}
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '50%',
              }}
            />
            <h4>{name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

const Services = () => (
  <section className="services" id="about">
    <h2>Our Services</h2>
    <div className="cards">
      {['Search Medicines', 'Upload Prescription', 'Talk to Drug Expert', 'Order COVID Essentials'].map(
        (title, index) => (
          <div className="card" key={index}>
            <h3>{title}</h3>
            <p>High-quality and fast service to meet your pharmacy needs.</p>
          </div>
        )
      )}
    </div>
  </section>
);

const Testimonials = () => (
  <section className="testimonials">
    <h2>What Our Users Say</h2>
    <div className="cards">
      <div className="card">
        <p>"Fast delivery and easy to use. PharmaCare saved me time and effort!"</p>
        <h4>- Ananya</h4>
      </div>
      <div className="card">
        <p>"Great service and genuine medicines. The prescription upload feature is awesome."</p>
        <h4>- Rohit</h4>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section className="contact" id="contact">
    <h2>Contact Us</h2>
    <form>
      <input type="text" placeholder="Your Name" required />
      <input type="email" placeholder="Your Email" required />
      <textarea placeholder="Your Message" required></textarea>
      <button type="submit">Send Message</button>
    </form>
  </section>
);

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      className={`scroll-to-top${visible ? ' show' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
}

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-col">
        <div className="logo-area">
          <h1 className="brand-title">
            Pharma<span className="highlight">Care</span>
          </h1>
        </div>
        <p>Your trusted partner for pharmaceutical needs. Providing quality medications with care since 2010.</p>
      </div>

      <div className="footer-col">
        <h4>Quick Links</h4>
        <ul>
          <li>Home</li>
          <li>All Medications</li>
          <li>Prescription Refills</li>
          <li>Health Blog</li>
        </ul>
      </div>

      <div className="footer-col">
        <h4>Information</h4>
        <ul>
          <li>About Us</li>
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
          <li>Shipping Policy</li>
        </ul>
      </div>

      <div className="footer-col">
        <h4>Contact Us</h4>
        <ul>
          <li><FontAwesomeIcon icon={faShieldAlt} /> 123 Medical Ave</li>
          <li><FontAwesomeIcon icon={faShippingFast} /> (800) 555-HEAL</li>
          <li><FontAwesomeIcon icon={faUserMd} /> support@pharmacare.com</li>
        </ul>
      </div>
    </div>

    <div className="footer-bottom">
      <p>© 2023 PharmaCare. All rights reserved.</p>
    </div>
  </footer>
);

export default Home;
