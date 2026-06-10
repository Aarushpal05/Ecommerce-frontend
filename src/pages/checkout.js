import React, { useEffect, useState } from "react";
import API from "./api";
import "../css/checkout.css";
import { useLocation, useNavigate } from "react-router-dom";

function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const cartItems = location.state?.cartItems ?? [];
  const totalPrice = location.state?.totalPrice ?? 0;

  // fallback: try loading cart from localStorage if navigated directly
  const getCartFromStorage = () => {
    try {
      const raw = localStorage.getItem("cart") || localStorage.getItem("cartItems");
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
      if (parsed?.items && Array.isArray(parsed.items)) return parsed.items;
      return [];
    } catch (e) {
      return [];
    }
  };

  const getUserIdFromToken = (token) => {
    try {
      const payload = token.split(".")[1];
      if (!payload) return null;
      const decoded = JSON.parse(window.atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
      return decoded.user_id ?? decoded.id ?? null;
    } catch (e) {
      return null;
    }
  };

  const effectiveCart = cartItems.length ? cartItems : getCartFromStorage();
  const effectiveTotal = totalPrice || effectiveCart.reduce((s, it) => {
    const price = Number(it.product_price ?? it.price ?? it.amount ?? 0) || 0;
    const qty = Number(it.quantity ?? it.qty ?? it.count ?? 1) || 1;
    return s + price * qty;
  }, 0);

  // FORM STATE
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    payment_method: "COD",
  });

  // LOADING STATE
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!location.state || (cartItems.length === 0 && getCartFromStorage().length === 0)) {
      navigate("/cart", { replace: true });
    }
  }, [location.state, cartItems.length, navigate]);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // PLACE ORDER
  const placeOrder = async () => {
    if (!formData.full_name || !formData.email || !formData.phone || !formData.address) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        alert("Please login before placing an order.");
        navigate("/login");
        return;
      }

      const userId = getUserIdFromToken(token);

      const payload = {
        ...formData,
        total_price: effectiveTotal,
        user: userId,
        items: effectiveCart.map((item) => ({
          product_name: item.product_name ?? item.name ?? item.title ?? "",
          quantity: item.quantity ?? item.qty ?? item.count ?? 1,
          price: item.product_price ?? item.price ?? item.amount ?? 0,
        })),
      };

      const res = await API.post(
        "create-order/",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Order Placed Successfully!");

      // REDIRECT TO PAYMENT LINK
      if (res.data.payment_link) {
        window.location.href = res.data.payment_link;
      }

    } catch (err) {
      console.error(err?.response?.data || err);
      alert("❌ Something went wrong while placing your order. Please try again.");
    }

    setLoading(false);

  };

  return (

    

    <div className="checkout-page">

      <div className="checkout-card">

        <h1 className="checkout-title">
          🛍 Checkout
        </h1>


        <p className="checkout-subtitle">
          Complete your order details
        </p>

        {/* INPUTS */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            placeOrder();
          }}
        >
          <div className="form-fields">

            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />

            <textarea
              name="address"
              placeholder="Delivery Address"
              value={formData.address}
              onChange={handleChange}
            />

          </div>

        {/* PAYMENT */}
        <div className="payment-section">

          <h3>Select Payment Method</h3>

          <label className="payment-option">

            <input
              type="radio"
              name="payment_method"
              value="COD"
              checked={formData.payment_method === "COD"}
              onChange={handleChange}
            />

            Cash on Delivery

          </label>

          <label className="payment-option">

            <input
              type="radio"
              name="payment_method"
              value="ONLINE"
              checked={formData.payment_method === "ONLINE"}
              onChange={handleChange}
            />

            Online Payment

          </label>

        </div>

        {/* TOTAL */}
        <div className="summary">
          <h3>Order Summary</h3>
          <ul className="summary-list">
            {effectiveCart.map((it, idx) => (
              <li key={idx}>
                {(it.product_name ?? it.name ?? it.title ?? "Unnamed")} x {(it.quantity ?? it.qty ?? it.count ?? 1)} — ₹{(Number(it.product_price ?? it.price ?? it.amount ?? 0) * (Number(it.quantity ?? it.qty ?? it.count ?? 1))).toFixed(2)}
              </li>
            ))}
          </ul>
          <h2>Total: ₹{effectiveTotal.toFixed(2)}</h2>
        </div>

        {/* BUTTON */}
        <button className="checkout-btn" type="submit" disabled={loading || effectiveCart.length === 0}>
          {loading ? "Processing..." : effectiveCart.length === 0 ? "No items in cart" : "Place Order"}
        </button>

        </form>
      </div>

    </div>

  );
}

export default CheckoutPage;