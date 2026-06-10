import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../css/product-grid.css";
import "../css/product.css";
import { useNavigate } from "react-router-dom";

const Product = ({ limitedProducts = false, showAll = false }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/products/")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  // Display limited or all products
  const displayedProducts = limitedProducts && !showAll ? products.slice(0, 8) : products;

  // Add To Cart Function
  const addToCart = async (productId) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      alert("Please Login First");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/add-to-cart/",
        {
          product_id: productId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product Added To Cart");
    } catch (error) {
      console.log(error);
      alert("Error Adding Product");
    }
  };

  return (
    <div className="container-fluid my-5">

      <div className="text-center py-14 bg-white">

  {/* Small Text */}
  <p className="text-orange-500 uppercase tracking-[5px] font-semibold mb-3">
    Premium Collection
  </p>

  {/* Main Heading */}
  <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">
    Our
    <span className="ml-3 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
      Products
    </span>
  </h1>

  {/* Stylish Line */}
  <div className="flex justify-center mt-5">
    <div className="w-28 h-1 rounded-full bg-gradient-to-r from-orange-500 to-pink-500"></div>
  </div>

  {/* Subtitle */}
  <p className="text-gray-500 mt-6 text-lg max-w-2xl mx-auto">
    Discover premium quality products designed for your modern lifestyle.
  </p>

</div>


      <div className="row">

        {displayedProducts.map(product => (
          <div className="col-lg-3 col-6 col-md-4 mb-4" key={product.id}>

            <div
              className="card h-100"
              style={{ cursor: "pointer" }}
            >

              <div
                className="card-body"
                onClick={() => navigate(`/product/${product.id}`)}
              >

                <img
                  src={`http://127.0.0.1:8000/${product.pic}`}
                  alt={product.name}
                  className="productgrid"
                />

                <h3>{product.name}</h3>

                <p>₹{product.price}</p>

              </div>

              {/* Add To Cart Button */}

              <div className="p-3">
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(product.id)}
                >
                  Add To Cart
                </button>
              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Product;





















