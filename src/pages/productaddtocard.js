import axios from "axios";
import { useNavigate } from "react-router-dom";

const addToCart = (productId, navigate) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    alert("Please login first");
    navigate('/login')
  }

  axios.post(
    "http://127.0.0.1:8000/api/add-to-cart/",
    { product_id: productId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  .then(res => {
    alert("Product added to cart");
  })
  .catch(err => {
    console.log(err);
    //alert("Error adding to cart");
  });
};

export default addToCart



