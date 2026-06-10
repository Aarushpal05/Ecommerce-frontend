import React, { useState } from "react";
import API from "./api";
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";




function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (form.password !== form.confirmPassword) {
      setStatus("error");
      setMessage("Passwords do not match. Please try again.");
      return;
    }

    try {
      await API.post("register/", {
        username: form.username,
        email: form.email,
        password: form.password,
      });
      setStatus("success");
      setMessage("Your account has been created successfully.");
      setForm({ username: "", email: "", password: "", confirmPassword: "" });
    } catch (err) {
      setStatus("error");
      setMessage(err.response?.data?.detail || "Unable to register at this time.");
      console.error(err);
    }
  };

  return (
    // <div className="signup-page">
    //   <section className="signup-hero">
    //     <div className="signup-hero-content">
    //       <span className="signup-hero-badge">Welcome to mystore</span>
    //       <h1>Create your account</h1>
    //       <p>Join now to unlock faster checkout, saved favorites, and exclusive offers.</p>
    //     </div>
    //   </section>

      <Container className="signup-container">
        <Row className="justify-content-center">
          <Col xl={5} lg={6} md={8}>
            <Card className="signup-card shadow-lg">
              <Card.Body>
                <div className="text-center mb-5">
                  <span className="badge rounded-pill bg-white text-dark px-4 py-2 signup-badge">
                    Welcome to mystore
                  </span>
                </div>

                <div className="signup-card-header text-center mb-4">
                  <h3>Sign Up</h3>
                  <p className="mb-0">Create an account for fast checkout and exclusive offers.</p>
                </div>

                {message && (
                  <div className={`signup-alert signup-alert-${status}`}>
                    {message}
                  </div>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      value={form.username}
                      onChange={(e) => setForm({ ...form, username: e.target.value })}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Create password"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm password"
                      value={form.confirmPassword}
                      onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                      required
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 signup-submit-btn"
                  >
                    Create Account
                  </Button>
                </Form>

                <div className="login-link text-center mt-4">
                  Already have an account? <Link to="/login">Log in</Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      


  );
}



export default Signup;