// import React, { useState, useEffect } from "react";
// import "./restaurant.css";
// import { motion } from "framer-motion";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

// function Restaurant() {

//   const navigate = useNavigate();

//   const [wishlist, setWishlist] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("foodWishlist")) || [];
//     setWishlist(saved);
//   }, []);

//   const menu = [
//     { name: "Pizza", price: 299, img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65", rating: 4.5, offer: 40 },
//     { name: "Burger", price: 199, img: "https://images.unsplash.com/photo-1550547660-d9450f859349", rating: 4.2, offer: 25 },
//     { name: "Pasta", price: 249, img: "https://images.unsplash.com/photo-1525755662778-989d0524087e", rating: 4.6, offer: 20 },
//     { name: "Cold Coffee", price: 120, img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735", rating: 4.6, offer: 15 },
//     { name: "Ice Cream", price: 150, img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb", rating: 4.7, offer: 35 },
//     { name: "Sandwich", price: 180, img: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f", rating: 4.3, offer: 18 }
//   ];

//   const filteredMenu = menu.filter(item =>
//     item.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const addWishlist = (item) => {
//     const updated = [...wishlist, item];
//     setWishlist(updated);
//     localStorage.setItem("foodWishlist", JSON.stringify(updated));
//     Swal.fire("Added ❤️", item.name, "success");
//   };

//   const handleOrder = (item) => {
//     navigate("/food-payment", {
//       state: { order: item }
//     });
//   };

//   return (
//     <div className="restaurant-page">

//       {/* HERO */}
//       <div className="hero-img">
//         <div className="overlay">

//           <motion.h1
//             className="hero-title"
//             initial={{ opacity: 0, y: -40 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             Luxury Dining Experience 🍽️
//           </motion.h1>

//           <p className="hero-subtitle">
//             Taste the finest dishes crafted by expert chefs
//           </p>

//           <input
//             type="text"
//             placeholder="Search food..."
//             className="search-box"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//         </div>
//       </div>

//       {/* FOOD GRID */}
//       <div className="container mt-5">
//         <div className="row">

//           {filteredMenu.map((item, i) => {

//             const finalPrice = Math.round(
//               item.price - (item.price * item.offer) / 100
//             );

//             return (
//               <motion.div
//                 className="col-md-4 mb-4"
//                 key={i}
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//               >

//                 <div className="food-card">

//                   <span className="offer-badge">{item.offer}% OFF</span>

//                   <span
//                     className="wishlist"
//                     onClick={() => addWishlist(item)}
//                   >
//                     ❤️
//                   </span>

//                   <img src={item.img} alt="" />

//                   <div className="food-info">

//                     <h4>{item.name}</h4>

//                     <p className="rating">⭐ {item.rating}</p>

//                     <p>
//                       <del>₹{item.price}</del>
//                       <span className="final"> ₹{finalPrice}</span>
//                     </p>

//                     <button
//                       className="order-btn"
//                       onClick={() => handleOrder(item)}
//                     >
//                       Order Now
//                     </button>

//                   </div>

//                 </div>

//               </motion.div>
//             );
//           })}

//         </div>
//       </div>

//     </div>
//   );
// }

// export default Restaurant;


// // import React, { useState, useEffect } from "react";
// // import Swal from "sweetalert2";
// // import "./restaurant.css";
// // import { motion } from "framer-motion";

// // function Restaurant() {

// //   const [cart, setCart] = useState([]);
// //   const [wishlist, setWishlist] = useState([]);
// //   const [search, setSearch] = useState("");

// //   useEffect(() => {
// //     const saved = JSON.parse(localStorage.getItem("foodWishlist")) || [];
// //     setWishlist(saved);
// //   }, []);

// //   const menu = [
// //     { name: "Pizza", price: 299, img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65", rating: 4.5, offer: 40 },
// //     { name: "Burger", price: 199, img: "https://images.unsplash.com/photo-1550547660-d9450f859349", rating: 4.2, offer: 25 },
// //     { name: "Pasta", price: 249, img: "https://images.unsplash.com/photo-1525755662778-989d0524087e", rating: 4.6, offer: 20 },
// //     { name: "Cold Coffee", price: 120, img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735", rating: 4.6, offer: 15 },
// //     { name: "Ice Cream", price: 150, img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb", rating: 4.7, offer: 35 },
// //     { name: "Sandwich", price: 180, img: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f", rating: 4.3, offer: 18 }
// //   ];

// //   const filteredMenu = menu.filter(item =>
// //     item.name.toLowerCase().includes(search.toLowerCase())
// //   );

// //   const addToCart = (item) => {
// //     setCart([...cart, item]);
// //     Swal.fire("Added 🛒", item.name, "success");
// //   };

// //   const addWishlist = (item) => {
// //     const updated = [...wishlist, item];
// //     setWishlist(updated);
// //     localStorage.setItem("foodWishlist", JSON.stringify(updated));
// //     Swal.fire("Added ❤️", item.name, "success");
// //   };

// //   const total = cart.reduce((sum, i) => sum + i.price, 0);

// //   return (
// //     <div className="restaurant-page">

// //       {/* HERO */}
// //       <div className="hero-img">

// //         <div className="overlay">

// //           <motion.h1
// //             className="hero-title"
// //             initial={{ opacity: 0, y: -40 }}
// //             animate={{ opacity: 1, y: 0 }}
// //           >
// //             Luxury Dining Experience 
// //           </motion.h1>

// //           <p className="hero-subtitle">
// //             Taste the finest dishes crafted by expert chefs
// //           </p>

// //           <input
// //             type="text"
// //             placeholder="Search delicious food..."
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //             className="search-box"
// //           />

// //         </div>

// //       </div>

// //       {/* CART */}
// //       <div className="cart-box">
// //         🛒 {cart.length} | ₹{total}
// //       </div>

// //       {/* FOOD GRID */}
// //       <div className="container mt-5">
// //         <div className="row">

// //           {filteredMenu.map((item, i) => {

// //             const finalPrice = item.price - (item.price * item.offer) / 100;

// //             return (
// //               <motion.div
// //                 className="col-md-4 mb-4"
// //                 key={i}
// //                 initial={{ opacity: 0, y: 40 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ delay: i * 0.2 }}
// //               >

// //                 <div className="food-card">

// //                   <span className="offer-badge">{item.offer}% OFF</span>

// //                   <span
// //                     className="wishlist"
// //                     onClick={() => addWishlist(item)}
// //                   >
// //                     ❤️
// //                   </span>

// //                   <img src={item.img} alt="" />

// //                   <div className="food-info">

// //                     <h4>{item.name}</h4>

// //                     <p className="rating">⭐ {item.rating}</p>

// //                     <p>
// //                       <del>₹{item.price}</del>
// //                       <span className="final"> ₹{Math.round(finalPrice)}</span>
// //                     </p>

// //                     <button
// //                       className="order-btn"
// //                       onClick={() => addToCart(item)}
// //                     >
// //                       Order Now
// //                     </button>

// //                   </div>

// //                 </div>

// //               </motion.div>
// //             );
// //           })}

// //         </div>
// //       </div>

// //     </div>
// //   );
// // }

// // export default Restaurant;


// import React, { useState, useEffect } from "react";
// import "./restaurant.css";
// import { motion } from "framer-motion";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

// function Restaurant() {

//   const navigate = useNavigate();

//   const [wishlist, setWishlist] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("foodWishlist")) || [];
//     setWishlist(saved);
//   }, []);

//   const menu = [
//     { name: "Pizza", price: 299, img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65", rating: 4.5, offer: 40 },
//     { name: "Burger", price: 199, img: "https://images.unsplash.com/photo-1550547660-d9450f859349", rating: 4.2, offer: 25 },
//     { name: "Pasta", price: 249, img: "https://images.unsplash.com/photo-1525755662778-989d0524087e", rating: 4.6, offer: 20 },
//     { name: "Cold Coffee", price: 120, img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735", rating: 4.6, offer: 15 },
//     { name: "Ice Cream", price: 150, img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb", rating: 4.7, offer: 35 },
//     { name: "Sandwich", price: 180, img: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f", rating: 4.3, offer: 18 }
//   ];

//   const filteredMenu = menu.filter(item =>
//     item.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const addWishlist = (item) => {
//     const updated = [...wishlist, item];
//     setWishlist(updated);
//     localStorage.setItem("foodWishlist", JSON.stringify(updated));
//     Swal.fire("Added ❤️", item.name, "success");
//   };

//   const handleOrder = (item) => {
//     navigate("/food-payment", {
//       state: { order: item }
//     });
//   };

//   return (
//     <div className="restaurant-page">

//       {/* HERO */}
//       <div className="hero-img">
//         <div className="overlay">

//           <motion.h1
//             className="hero-title"
//             initial={{ opacity: 0, y: -40 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             Luxury Dining Experience 🍽️
//           </motion.h1>

//           <p className="hero-subtitle">
//             Taste the finest dishes crafted by expert chefs
//           </p>

//           <input
//             type="text"
//             placeholder="Search food..."
//             className="search-box"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//         </div>
//       </div>

//       {/* FOOD GRID */}
//       <div className="container mt-5">
//         <div className="row">

//           {filteredMenu.map((item, i) => {

//             const finalPrice = Math.round(
//               item.price - (item.price * item.offer) / 100
//             );

//             return (
//               <motion.div
//                 className="col-md-4 mb-4"
//                 key={i}
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//               >

//                 <div className="food-card">

//                   <span className="offer-badge">{item.offer}% OFF</span>

//                   <span
//                     className="wishlist"
//                     onClick={() => addWishlist(item)}
//                   >
//                     ❤️
//                   </span>

//                   <img src={item.img} alt="" />

//                   <div className="food-info">

//                     <h4>{item.name}</h4>

//                     <p className="rating">⭐ {item.rating}</p>

//                     <p>
//                       <del>₹{item.price}</del>
//                       <span className="final"> ₹{finalPrice}</span>
//                     </p>

//                     <button
//                       className="order-btn"
//                       onClick={() => handleOrder(item)}
//                     >
//                       Order Now
//                     </button>

//                   </div>

//                 </div>

//               </motion.div>
//             );
//           })}

//         </div>
//       </div>

//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import "./restaurant.css";
// import { motion } from "framer-motion";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

// function Restaurant() {

//   const navigate = useNavigate();

//   const [wishlist, setWishlist] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("foodWishlist")) || [];
//     setWishlist(saved);
//   }, []);

//   const menu = [
//     { name: "Pizza", price: 299, img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65", rating: 4.5, offer: 40 },
//     { name: "Burger", price: 199, img: "https://images.unsplash.com/photo-1550547660-d9450f859349", rating: 4.2, offer: 25 },
//     { name: "Pasta", price: 249, img: "https://images.unsplash.com/photo-1525755662778-989d0524087e", rating: 4.6, offer: 20 },
//     { name: "Cold Coffee", price: 120, img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735", rating: 4.6, offer: 15 },
//     { name: "Ice Cream", price: 150, img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb", rating: 4.7, offer: 35 },
//     { name: "Sandwich", price: 180, img: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f", rating: 4.3, offer: 18 }
//   ];

//   const filteredMenu = menu.filter(item =>
//     item.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const addWishlist = (item) => {
//     const updated = [...wishlist, item];
//     setWishlist(updated);
//     localStorage.setItem("foodWishlist", JSON.stringify(updated));
//     Swal.fire("Added ❤️", item.name, "success");
//   };

//   const handleOrder = (item) => {
//     navigate("/food-payment", {
//       state: { order: item }
//     });
//   };

//   return (
//     <div className="restaurant-page">

//       {/* HERO */}
//       <div className="hero-img">
//         <div className="overlay">

//           <motion.h1
//             className="hero-title"
//             initial={{ opacity: 0, y: -40 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             Luxury Dining Experience 🍽️
//           </motion.h1>

//           <p className="hero-subtitle">
//             Taste the finest dishes crafted by expert chefs
//           </p>

//           <input
//             type="text"
//             placeholder="Search food..."
//             className="search-box"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//         </div>
//       </div>

//       {/* FOOD GRID */}
//       <div className="container mt-5">
//         <div className="row">

//           {filteredMenu.map((item, i) => {

//             const finalPrice = Math.round(
//               item.price - (item.price * item.offer) / 100
//             );

//             return (
//               <motion.div
//                 className="col-md-4 mb-4"
//                 key={i}
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//               >

//                 <div className="food-card">

//                   <span className="offer-badge">{item.offer}% OFF</span>

//                   <span
//                     className="wishlist"
//                     onClick={() => addWishlist(item)}
//                   >
//                     ❤️
//                   </span>

//                   <img src={item.img} alt="" />

//                   <div className="food-info">

//                     <h4>{item.name}</h4>

//                     <p className="rating">⭐ {item.rating}</p>

//                     <p>
//                       <del>₹{item.price}</del>
//                       <span className="final"> ₹{finalPrice}</span>
//                     </p>

//                     <button
//                       className="order-btn"
//                       onClick={() => handleOrder(item)}
//                     >
//                       Order Now
//                     </button>

//                   </div>

//                 </div>

//               </motion.div>
//             );
//           })}

//         </div>
//       </div>

//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import "./restaurant.css";
// import { motion } from "framer-motion";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

// function Restaurant() {

//   const navigate = useNavigate();

//   const [wishlist, setWishlist] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("foodWishlist")) || [];
//     setWishlist(saved);
//   }, []);

//   const menu = [
//     { name: "Pizza", price: 299, img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65", rating: 4.5, offer: 40 },
//     { name: "Burger", price: 199, img: "https://images.unsplash.com/photo-1550547660-d9450f859349", rating: 4.2, offer: 25 },
//     { name: "Pasta", price: 249, img: "https://images.unsplash.com/photo-1525755662778-989d0524087e", rating: 4.6, offer: 20 },
//     { name: "Cold Coffee", price: 120, img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735", rating: 4.6, offer: 15 },
//     { name: "Ice Cream", price: 150, img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb", rating: 4.7, offer: 35 },
//     { name: "Sandwich", price: 180, img: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f", rating: 4.3, offer: 18 }
//   ];

//   const filteredMenu = menu.filter(item =>
//     item.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const addWishlist = (item) => {
//     const updated = [...wishlist, item];
//     setWishlist(updated);
//     localStorage.setItem("foodWishlist", JSON.stringify(updated));
//     Swal.fire("Added ❤️", item.name, "success");
//   };

//   const handleOrder = (item) => {
//     navigate("/food-payment", {
//       state: { order: item }
//     });
//   };

//   return (
//     <div className="restaurant-page">

//       {/* HERO */}
//       <div className="hero-img">
//         <div className="overlay">

//           <motion.h1
//             className="hero-title"
//             initial={{ opacity: 0, y: -40 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             Luxury Dining Experience 🍽️
//           </motion.h1>

//           <p className="hero-subtitle">
//             Taste the finest dishes crafted by expert chefs
//           </p>

//           <input
//             type="text"
//             placeholder="Search food..."
//             className="search-box"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//         </div>
//       </div>

//       {/* FOOD GRID */}
//       <div className="container mt-5">
//         <div className="row">

//           {filteredMenu.map((item, i) => {

//             const finalPrice = Math.round(
//               item.price - (item.price * item.offer) / 100
//             );

//             return (
//               <motion.div
//                 className="col-md-4 mb-4"
//                 key={i}
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//               >

//                 <div className="food-card">

//                   <span className="offer-badge">{item.offer}% OFF</span>

//                   <span
//                     className="wishlist"
//                     onClick={() => addWishlist(item)}
//                   >
//                     ❤️
//                   </span>

//                   <img src={item.img} alt="" />

//                   <div className="food-info">

//                     <h4>{item.name}</h4>

//                     <p className="rating">⭐ {item.rating}</p>

//                     <p>
//                       <del>₹{item.price}</del>
//                       <span className="final"> ₹{finalPrice}</span>
//                     </p>

//                     <button
//                       className="order-btn"
//                       onClick={() => handleOrder(item)}
//                     >
//                       Order Now
//                     </button>

//                   </div>

//                 </div>

//               </motion.div>
//             );
//           })}

//         </div>
//       </div>

//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import "./restaurant.css";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Restaurant() {

  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("foodWishlist")) || [];
    setWishlist(saved);
  }, []);

  const menu = [
    { name: "Pizza", price: 299, img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65", rating: 4.5, offer: 40 },
    { name: "Burger", price: 199, img: "https://images.unsplash.com/photo-1550547660-d9450f859349", rating: 4.2, offer: 25 },
    { name: "Pasta", price: 249, img: "https://images.unsplash.com/photo-1525755662778-989d0524087e", rating: 4.6, offer: 20 },
    { name: "Cold Coffee", price: 120, img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735", rating: 4.6, offer: 15 },
    { name: "Ice Cream", price: 150, img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb", rating: 4.7, offer: 35 },
    { name: "Sandwich", price: 180, img: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f", rating: 4.3, offer: 18 }
  ];

  const filteredMenu = menu.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const addWishlist = (item) => {
    const updated = [...wishlist, item];
    setWishlist(updated);
    localStorage.setItem("foodWishlist", JSON.stringify(updated));
    Swal.fire("Added ❤️", item.name, "success");
  };

  const handleOrder = (item) => {
    navigate("/food-payment", {
      state: { order: item }
    });
  };

  return (
    <div className="restaurant-page">

      {/* HERO */}
      <div className="hero-img">
        <div className="overlay">

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Luxury Dining Experience 
          </motion.h1>

          <p className="hero-subtitle">
            Taste the finest dishes crafted by expert chefs
          </p>

          <input
            type="text"
            placeholder="Search food..."
            className="search-box"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>
      </div>

      {/* FOOD GRID */}
      <div className="container mt-5">
        <div className="row">

          {filteredMenu.map((item, i) => {

            const finalPrice = Math.round(
              item.price - (item.price * item.offer) / 100
            );

            return (
              <motion.div
                className="col-md-4 mb-4"
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
              >

                <div className="food-card">

                  <span className="offer-badge">{item.offer}% OFF</span>

                  <span
                    className="wishlist"
                    onClick={() => addWishlist(item)}
                  >
                    ❤️
                  </span>

                  <img src={item.img} alt="" />

                  <div className="food-info">

                    <h4>{item.name}</h4>

                    <p className="rating">⭐ {item.rating}</p>

                    <p>
                      <del>₹{item.price}</del>
                      <span className="final"> ₹{finalPrice}</span>
                    </p>

                    <button
                      className="order-btn"
                      onClick={() => handleOrder(item)}
                    >
                      Order Now
                    </button>

                  </div>

                </div>

              </motion.div>
            );
          })}

        </div>
      </div>

    </div>
  );
}

export default Restaurant;