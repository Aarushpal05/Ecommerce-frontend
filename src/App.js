//import logo from './logo.svg';
import './App.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './pages/home';
import About from './pages/aboutus';
import Header from './components/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Products from './pages/Products';
import Profile from './pages/profile';
import MyOrder from './pages/myorder';
import CategoryList from './pages/category';
import ProductDetail from './pages/ProductDetails';
import ProductsByCategory from './pages/ProductsBycategory';
import Cart from './pages/cart';
import CheckoutPage from './pages/checkout';
import Footer from './components/footer';



function App() {
  return (
      <Router>

      <Header/>    

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/ >} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/> } />
        <Route path="/products" element={<Products/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/myorders" element={<MyOrder/>} />
        <Route path="/categories" element={<CategoryList/>}/>
        <Route path="/product/:id" element={<ProductDetail/>} />
        <Route path="/category/:id" element={<ProductsByCategory />} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/checkout' element={<CheckoutPage/>}/>
    

        
      
      </Routes>
      <Footer/>
    </Router>
  

  );
}


export default App;
