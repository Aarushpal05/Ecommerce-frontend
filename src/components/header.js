import React from "react";
import { Link } from "react-router-dom";
import '../css/header.css';

function Header() {
  return (
 <nav className="navbar navbar-expand-lg navbar-light menu">
  <div className="container-fluid">
    <Link className="navbar-brand" to="#">MY STORE</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link menulink" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link menulink" to="About">About</Link>
        </li>

         <li className="nav-item">
          <Link className="nav-link menulink" to="products">Products</Link>

        </li>

         <li className="nav-item">
          <Link className="nav-link menulink" to="categories">Categories</Link>
          
        </li>

       <li className="nav-item">
          <Link className="nav-link menulink" to="/cart">
          View Cart
          </Link>
        </li>
    

       <li className="nav-item">
          <Link className="nav-link menulink" to="/myorders">
          My Orders
          </Link>
        </li>

       <li className="nav-item">
          <Link className="nav-link menulink" to="/profile">
          View Profile
          </Link>
        </li>
      

      
       
       
        <li className="nav-item">
         <Link className="btn btn-info ms-2" to="/signup">
          Signup
          </Link>
        </li> 

        <li className="nav-item">
          <Link className="btn btn-success ms-2" to="/login">
          Login
          </Link>
        </li>
        
      </ul>
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>






















    // <nav>
    //     <Link to="/">Home</Link>
    //     <Link to="/about">About</Link>
    //     <Link to="/login">Login</Link>
    //     <Link to='/signup'>Create Account</Link> 
    //   </nav>
  );
}

export default Header;