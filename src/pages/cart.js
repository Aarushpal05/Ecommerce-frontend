import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const token = localStorage.getItem("access_token");

  // FETCH CART
  const fetchCart = () => {
    axios
      .get("http://127.0.0.1:8000/api/cart/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCartItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // UPDATE QUANTITY
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;

    axios
      .put(
        `http://127.0.0.1:8000/api/cart/update/${id}/`,
        {
          quantity: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        fetchCart();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // DELETE ITEM
  const deleteItem = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/cart/delete/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        fetchCart();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // TOTAL PRICE
  const totalPrice = cartItems.reduce(
    (total, item) =>
      Number(total) +
      Number(item.product_price) * Number(item.quantity),
    0
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <h5 className="text-center">Cart is empty</h5>
      ) : (
        <div className="row">
          <div className="col-md-8">
            {cartItems.map((item) => (
              <div className="card mb-3 p-3 shadow-sm" key={item.id}>
                <div className="d-flex justify-content-between align-items-center">

                  <div>
                    <h5>{item.product_name}</h5>

                    <p>Price: ₹{item.product_price}</p>

                    <div className="d-flex align-items-center gap-2">

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        className="btn btn-success btn-sm"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>

                    </div>
                  </div>

                  <div>
                    <h5>
                      ₹{item.product_price * item.quantity}
                    </h5>

                    <button
                      className="btn btn-dark btn-sm mt-2"
                      onClick={() => deleteItem(item.id)}
                    >
                      Delete
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div className="col-md-4">
            <div className="card p-4 shadow">
              <h4>Summary</h4>

              <hr />

              <h5>Total: ₹{totalPrice}</h5>

             <Link to="/checkout" state={{cartItems: cartItems, totalPrice: totalPrice}} className="btn btn-primary w-100 mt-3"
>Checkout </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;