

import React, { useEffect, useState ,useRef} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../css/category.css";
import { Link } from "react-router-dom";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const scrollRef = useRef(null);

  // Fetch Categories
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categories/")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  // Automatic Horizontal Scroll
  useEffect(() => {
    const slider = scrollRef.current;

    const autoScroll = setInterval(() => {
      if (slider) {
        slider.scrollLeft += 1;

        // Restart Scroll
        if (
          slider.scrollLeft + slider.clientWidth >=
          slider.scrollWidth
        ) {
          slider.scrollLeft = 0;
        }
      }
    }, 15);

    return () => clearInterval(autoScroll);
  }, []);

  return (
    <div className="container-fluid my-5">
    <div className="text-center py-14 bg-white">

  {/* Small Text */}
  <p className="text-blue-500 uppercase tracking-[5px] font-semibold mb-3">
    Shop By Collection
  </p>

  {/* Main Heading */}
  <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">
    Our
    <span className="ml-3 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
      Categories
    </span>
  </h1>

  {/* Stylish Underline */}
  <div className="flex justify-center mt-5">
    <div className="w-28 h-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
  </div>

  {/* Subtitle */}
  <p className="text-gray-500 mt-6 text-lg max-w-2xl mx-auto">
    Explore a wide range of categories crafted to match your style and needs.
  </p>

</div>

      <div className="category-slider" ref={scrollRef}>
        {categories.map((cat) => (
          <div className="category-card" key={cat.id}>
            <Link
              to={`/category/${cat.id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center">
                  <img
                    src={`http://127.0.0.1:8000/${cat.pic}`}
                    alt={cat.name}
                    className="img-fluid categorygrid"
                  />
                  <h5 className="mt-3">{cat.name}</h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
























































// // import React, { useEffect, useState } from "react";
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import "bootstrap/dist/js/bootstrap.bundle.min.js";
// // import "../css/category.css";
// // import { Link } from "react-router-dom";

// // function CategoryList() {
// //   const [categories, setCategories] = useState([]);

// //   useEffect(() => {
// //     fetch("http://127.0.0.1:8000/api/categories/")
// //       .then((res) => res.json())
// //       .then((data) => setCategories(data))
// //       .catch((err) => console.log(err));
// //   }, []);

// //   return (
// //     <div className="container">
// //       <h2 className="text-center my-4 fw-bold">
// //         <marquee behavior="alternate" scrollamount="20">Categories</marquee>
// //       </h2>



// //       <div className="row">
// //         {categories.map((cat) => (
// //           <div className="col-lg-3" key={cat.id}>
// //             <Link
// //               to={`/category/${cat.id}`}
// //               style={{ textDecoration: "none", color: "black" }}
// //             >
// //               <div className="card">
// //                 <div className="card-body">
// //                   <img
// //                     src={`http://127.0.0.1:8000/${cat.pic}`}
// //                     alt={cat.name}
// //                     className="img-fluid categorygrid"
// //                   />
// //                   <h3>{cat.name}</h3>
// //                 </div>
// //               </div>
// //             </Link>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default CategoryList;


































































// // // import React, { useEffect, useState } from "react";
// // // import 'bootstrap/dist/css/bootstrap.min.css';
// // // import "bootstrap/dist/js/bootstrap.bundle.min.js";
// // // import "../css/category.css";
// // // import { Link } from "react-router-dom";


// // // function CategoryList() {
// // //   const [categories, setCategories] = useState([]);

// // //   useEffect(() => {
// // //     fetch("http://127.0.0.1:8000/api/categories/")
// // //       .then((res) => res.json())
// // //       .then((data) => setCategories(data))
// // //       .catch((err) => console.log(err));
// // //   }, []);

// // //   return (
// // //     <div className="container">
// // //       <h2 className="text-center my-4 fw-bold"><marquee behavior="alternate" scrollamount="20">Categories</marquee></h2>
      


// // // {categories.map(cat => (
// // //   <div key={cat.id}>
// // //     <Link to={`/category/${cat.id}`}>
// // //       {cat.name}
// // //     </Link>
// // //   </div>
// // // ))}
// // //       <div className="row">
// // //         {categories.map((cat) => (
// // //           <div className="col-lg-3" key={cat.id}>
// // //             <div className="card">
// // //               <div className="card-body">
// // //                 <img 
// // //                   src={`http://127.0.0.1:8000/${cat.pic}`} 
// // //                   alt={cat.name} 
// // //                   className="img-fluid categorygrid"
// // //                 />
// // //                 <h3>{cat.name}</h3>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default CategoryList;