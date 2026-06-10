import React, { useState } from "react";
import { Link } from "react-router-dom";
import CategoryList from "./category";
import Product from "./Products";
import "../css/home.css";

function Home() {
  const [showAllProducts, setShowAllProducts] = useState(false);

  const handleViewMore = () => {
    setShowAllProducts(true);
  };

  return (
    <>
      <section className="hero-banner">
        <div className="hero-overlay">
          <span className="hero-tag">NEW COLLECTION 2026</span>

          <h1>MODERN & ECOMMERCE</h1>

          <h2>FASHION STORE</h2>

          <p>
            We bring you the latest trends and premium collections
            designed for modern lifestyles.
          </p>

          <div className="hero-buttons">
            <button className="shop-btn">SHOP NOW</button>

            <button className="explore-btn">EXPLORE MORE</button>
          </div>
        </div>
      </section>

      <CategoryList />

      <Product limitedProducts={true} showAll={showAllProducts} />

      {/* View More Button */}
      {!showAllProducts ? (
        <div className="view-more-container">
          <button onClick={handleViewMore} className="view-more-btn">
            VIEW MORE
          </button>
        </div>
      ) : (
        <div className="view-more-container">
          <Link to="/products" className="view-more-btn">
            VIEW ALL PRODUCTS
          </Link>
        </div>
      )}
    </>
  );
}

export default Home;