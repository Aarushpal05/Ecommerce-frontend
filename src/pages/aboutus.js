import React from "react";
import "../css/aboutus.css";

function About() {
  return (
    <section className="about-section">
      <div className="overlay">
        <div className="about-container">

          <h1 className="about-title">About Us</h1>

          <p className="about-subtitle">
            We provide premium products, seamless shopping experiences,
            and world-class customer service to help customers shop
            with confidence and convenience.
          </p>

          <div className="about-cards">

            <div className="about-card">
              <h3>🎯 Our Mission</h3>
              <p>
                Deliver exceptional products with trust, quality,
                and customer satisfaction at the core.
              </p>
            </div>

            <div className="about-card">
              <h3>🚀 Our Vision</h3>
              <p>
                To become a leading ecommerce destination recognized
                for innovation and excellence.
              </p>
            </div>

            <div className="about-card">
              <h3>⭐ Why Choose Us</h3>
              <p>
                Fast delivery, secure payments, premium quality,
                and dedicated support for every customer.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default About;