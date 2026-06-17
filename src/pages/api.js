// api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://ecommerce-backend-1-r8dy.onrender.com/api/",
});

export default API; 
