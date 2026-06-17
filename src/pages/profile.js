import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const res = await axios.get("https://ecommerce-backend-1-r8dy.onrender.com/api/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.log(err.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const initials = user?.username ? user.username.charAt(0).toUpperCase() : "U";


  return (
    <Container className="py-5">
  <Row>
    <Col lg={4}>
      <Card className="shadow border-0 profile-card">
        <Card.Body className="text-center">
          <img
            src="https://via.placeholder.com/150"
            alt="profile"
            className="profile-img"
          />

          <h3 className="mt-3">Ayush Pal</h3>
          <p className="text-muted">ayush@gmail.com</p>

          <Button variant="dark" className="w-100">
            Edit Profile
          </Button>
        </Card.Body>
      </Card>
    </Col>

    <Col lg={8}>
      <Row>
        <Col md={4}>
          <Card className="stats-card">
            <Card.Body>
              <h5>Total Orders</h5>
              <h2>25</h2>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="stats-card">
            <Card.Body>
              <h5>Wishlist</h5>
              <h2>12</h2>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="stats-card">
            <Card.Body>
              <h5>Cart Items</h5>
              <h2>5</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mt-4 shadow border-0">
        <Card.Body>
          <h4>Recent Orders</h4>

          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#1001</td>
                <td>iPhone 16</td>
                <td className="text-success">Delivered</td>
              </tr>
              <tr>
                <td>#1002</td>
                <td>Nike Shoes</td>
                <td className="text-warning">Shipping</td>
              </tr>
            </tbody>
          </table>
        </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>
  );
}

export default Profile;
