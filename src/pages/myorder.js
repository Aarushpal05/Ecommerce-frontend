import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import API from "./api";
import "../css/myorder.css";

function MyOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 useEffect(() => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    setError("Please login to view your orders.");
    setLoading(false);
    return;
  }

  const fetchOrders = async () => {
    try {
      const res = await API.get("orders/history/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);

      // Correct response handling  
      const recent = res.data?.recent_order || null;
      const history = res.data?.last_5_orders || [];

      // Put recent order first
      const allOrders = recent
        ? [recent, ...history.filter((o) => o.id !== recent.id)]
        : history;

      setOrders(allOrders);

      if (allOrders.length === 0) {
        setError("No orders found for your account.");
      } else {
        setError(null);
      }

    } catch (err) {
      console.error(err?.response?.data || err.message);

      if (
        err?.response?.status === 401 ||
        err?.response?.status === 403
      ) {
        setError("You are not authorized. Please login again.");
      } else {
        setError("Unable to load orders. Please try again later.");
      }

      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();
}, []);

  const recentOrder = orders[0];

  return (
    <div className="myorder-page container">
      <section className="myorder-header py-4">
        <h1>My Orders</h1>
        <p>Review your most recent order and the last 5 orders you placed.</p>
      </section>    
    
      {loading ? (
        <div className="alert alert-secondary">Loading your orders...</div>
      ) : (
        <> 
          {error && <div className="alert alert-warning">{error}</div>}

          {recentOrder ? (
            <div className="recent-order-card card mb-4 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h5 className="card-title mb-1">Recent Order</h5><hr/>  
                    <p className="text-muted mb-0">Order #{recentOrder.id}</p>
                  </div>
                  <span className={`badge ${recentOrder.status === "Delivered" ? "bg-success" : recentOrder.status === "Shipped" ? "bg-info" : "bg-secondary"}`}>
                    {recentOrder.status}
                  </span>
                </div>  

                <div className="row mb-3">
                  <div className="col-md-3">
                    <strong>Date</strong>
                    <p>{recentOrder.created_at}</p>
                  </div>  
                  <div className="col-md-3">
                    <strong>Total</strong>
                    <p>{recentOrder.total_price}</p>
                  </div>
                  {/* <div className="col-md-3">
                    <strong>Shipping</strong>
                    <p>{recentOrder.shipping}</p>
                  </div> */}
                  <div className="col-md-3">
                    <strong>Payment</strong>
                    <p>{recentOrder.payment_method}</p>
                  </div>
                </div>

                <div>
                  <h5>Items</h5>
                  <ul className="list-group list-group-flush">
                    {recentOrder.items.map((item, index) => (
                      <li key={index} className="list-group-item px-0 py-2 d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{item.product_name}</strong>
                          <div className="text-muted small">Qty: {item.quantity}</div>
                        </div>
                        <span>{item.price}</span> 
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="alert alert-info">No recent order data available.</div>
          )}

          <section className="order-history">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>Order History</h5>

            </div>
            <hr/>

            <div className="row gy-3">
              {orders.map((order) => (
                <div className="col-12" key={order.id}>
                  <div className="card order-card shadow-sm">
                    <div className="card-body">
                      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-2">
                        <div>
                          <h5 className="mb-1">Order #{order.id}</h5>
                          <div className="text-muted">{order.created_at}</div>
                        </div>
                        <div className="text-sm-end">
                          <span className="order-total d-block mb-1">Total: {order.total_price}</span>
                          <span className={`badge ${order.status === "Delivered" ? "bg-success" : order.status === "Shipped" ? "bg-info" : "bg-secondary"}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>

                      <div className="order-preview">
                        <strong>Items:</strong>
                        <span className="text-muted ms-2">
                          {order.items.map((item) => item.product_name).join(", ")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default MyOrder;
