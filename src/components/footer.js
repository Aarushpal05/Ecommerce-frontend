import React from 'react';
import { Link } from 'react-router-dom';
import '../css/footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo" aria-hidden="true">
            <span className="footer-logo-icon">🛒</span>
          </div>
          <div>
            <h3>Mystore</h3>
            <p>Premium shopping made easy — curated products, fast support, and seamless checkout.</p>
          </div>
        </div>

        <div className="footer-links">
          <div>
            <h4>Shop</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/categories">Categories</Link></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/profile">My Account</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:support@mystore.com">aarushpal876@gmail.com</a></li>
              <li><a href="tel:+1234567890">+1 (234) 567-890</a></li>
              <li><a href="https://www.instagram.com" target="_blank" rel="noreferrer">@mystore</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Mystore. All rights reserved.</p>
        <div className="footer-social" aria-label="Social links">
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">f</a>
          <a href="https://www.twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">t</a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">i</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
