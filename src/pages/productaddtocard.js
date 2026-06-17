import axios from "axios";
const addToCart = (productId, navigate) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    alert("Please login first");
    navigate("/login");
    return;
  }

  axios
    .post(
      "https://ecommerce-backend-1-r8dy.onrender.com/api/add-to-cart/",
      { product_id: productId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(() => {
      alert("Product added to cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default addToCart;
