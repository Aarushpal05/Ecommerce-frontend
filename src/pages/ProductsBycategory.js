import React, { useEffect, useState } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import Product from "./Products";
import { useNavigate } from "react-router-dom";


function ProductsByCategory() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
   const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://ecommerce-backend-1-r8dy.onrender.com/api/category_products/${id}/`)
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, [id]);

  

  return (
    <div className="container">
      <h2 className="text-center my-4">Category Products</h2>

      <div className="row">
        {products.length > 0 ? (
          products.map(p => (
            <div className="col-md-3" key={p.id}>
              <div className="card p-3" onClick={() => navigate(`/product/${p.id}`)} style={{ cursor: "pointer" }}>
                <div className="card-body">
                  <img src={`http://127.0.0.1:8000/${p.pic}`} alt={p.name} className="productgrid"/>
        
                <h5>{p.name}</h5>
                <p>₹{p.price}</p>

                </div>
              </div>
            </div>
          ))
        ) : (
          <h4>No Products Found</h4>
        )}
      </div>
    </div>
  );
}

export default ProductsByCategory;
