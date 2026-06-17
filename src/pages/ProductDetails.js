import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import addToCart from "./productaddtocard";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [variant, setVariant] = useState("medium");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://ecommerce-backend-1-r8dy.onrender.com/api/products/${id}/`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  const generateModernDescription = (p, v = "medium") => {
    const name = p.name || "Product";
    const baseDesc = p.description || "High-quality item designed for everyday use.";
    const priceText = p.price ? `Priced at ₹${p.price}. ` : "";

    if (v === "short") {
      return `${name} combines modern design with reliable performance. ${priceText}Ideal for users seeking quality and value.`;
    }

    if (v === "long") {
      return `${name} — ${baseDesc} ${priceText}Crafted with attention to detail, this product features premium materials and a refined finish that supports long-lasting use. It delivers dependable performance across daily tasks and offers excellent value for professionals and hobbyists alike. With thoughtful ergonomics and reliable support, ${name} is designed to simplify your routine while elevating the overall experience.`;
    }

    // medium
    return `${name}: ${baseDesc} ${priceText}Thoughtfully engineered for performance and comfort, this product blends modern aesthetics with practical features to meet the needs of discerning users.`;
  };

  return (
    <div className="container mt-5">
      <div className="row shadow p-4 rounded bg-light align-items-center">

        {/* Product Image */}
        <div className="col-md-6 text-center">
          <img
            src={`http://127.0.0.1:8000/${product.pic}`}
            alt={product.name}
            className="img-fluid rounded"
            style={{
              height: "600px",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Product Details */}
        <div className="col-md-6">
          <span className="badge bg-primary mb-3">
            New Collection
          </span>

          <h1 className="fw-bold">{product.name}</h1>

          <h3 className="text-success mt-3">
            ₹{product.price}
          </h3>

          <div className="mt-3">
            <div className="d-flex gap-2 mb-2">
              <button
                className={`btn btn-sm ${variant === "short" ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={() => setVariant("short")}
              >
                Short
              </button>
              <button
                className={`btn btn-sm ${variant === "medium" ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={() => setVariant("medium")}
              >
                Medium
              </button>
              <button
                className={`btn btn-sm ${variant === "long" ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={() => setVariant("long")}
              >
                Long
              </button>
            </div>

            <p className="text-muted">
              {generateModernDescription(product, variant)}
            </p>
          </div>



          {/* Buttons */}
          <div className="d-flex gap-3 mt-4">
            <button
              className="btn btn-dark px-4"
              onClick={() => {
                console.log("Clicked", product.id);
                addToCart(product.id, navigate);
              }}
            >
              Add to Cart
            </button>

            <button className="btn btn-success px-4">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
