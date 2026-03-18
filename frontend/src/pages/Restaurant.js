import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./restaurant.css";

function Restaurant() {

  const [cart, setCart] = useState([]);
  const [modalItem, setModalItem] = useState(null);

  const [mealType, setMealType] = useState("");
  const [time, setTime] = useState("");
  const [room, setRoom] = useState("");

  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");

  const [activeCategory, setActiveCategory] = useState("All");
  const [vegFilter, setVegFilter] = useState("All");

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  /* ================= MENU ================= */

  const menu = [

    { name: "Poha", price: 120, img: "https://tse1.mm.bing.net/th/id/OIP.ihzgnMqRMLgOIEUoVPZXLwHaHa?w=1200&h=1200&rs=1&pid=ImgDetMain&o=7&rm=3", category: "Breakfast", rating: 4.3, type: "Veg", offer: 20 },

    { name: "Idli Sambar", price: 130, img: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976", category: "Breakfast", rating: 4.5, type: "Veg", offer: 10 },

    { name: "Masala Dosa", price: 140, img: "https://images.unsplash.com/photo-1630383249896-424e482df921", category: "Breakfast", rating: 4.6, type: "Veg", offer: 20 },

    { name: "Paneer Butter Masala", price: 250, img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398", category: "Lunch", rating: 4.6, type: "Veg", offer: 30 },

    { name: "Chicken Biryani", price: 280, img: "https://images.pexels.com/photos/16020573/pexels-photo-16020573.jpeg?cs=srgb&dl=pexels-gourav-sarkar-462560178-16020573.jpg&fm=jpg", category: "Lunch", rating: 4.7, type: "Non-Veg", offer: 40 },

    { name: "Pizza", price: 299, img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65", category: "Dinner", rating: 4.5, type: "Veg", offer: 40 },

    { name: "Burger", price: 199, img: "https://images.unsplash.com/photo-1550547660-d9450f859349", category: "Dinner", rating: 4.2, type: "Non-Veg", offer: 25 },

    { name: "Cold Coffee", price: 120, img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735", category: "Drinks", rating: 4.6, type: "Veg", offer: 15 },

    { name: "Ice Cream", price: 150, img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb", category: "Dessert", rating: 4.7, type: "Veg", offer: 35 }

  ];

  /* ================= FILTER ================= */

  const filteredMenu = menu.filter((item) => {

    return (

      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (activeCategory === "All" || item.category === activeCategory) &&
      (vegFilter === "All" || item.type === vegFilter)

    );

  });

  /* ================= CART ================= */

  const addToCart = (item) => {

    setCart([...cart, item]);

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: `${item.name} added to cart`,
      showConfirmButton: false,
      timer: 1200
    });

  };

  /* ================= MODAL ================= */

  const openModal = (item) => {
    setModalItem(item);
    setErrors({});
  };

  const closeModal = () => {
    setModalItem(null);
  };

  /* ================= ORDER ================= */

  const confirmOrder = async () => {

    let newErrors = {};

    if (!mealType) newErrors.mealType = "Select meal type";
    if (!time) newErrors.time = "Select delivery time";
    if (!room) newErrors.room = "Select room";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {

      await axios.post("http://localhost:5000/api/restaurant/order", {
        name: modalItem.name,
        price: modalItem.price,
        mealType,
        time,
        room,
        date: new Date().toISOString().split("T")[0]
      });

      Swal.fire({
        icon: "success",
        title: "Order Confirmed 🍽️",
        text: `${modalItem.name} will arrive at Room ${room}`
      });

      closeModal();

    } catch {

      Swal.fire({
        icon: "error",
        title: "Order Failed",
        text: "Server error"
      });

    }

  };

  return (

    <>

      {/* HERO */}

      <div className="restaurant-hero">

        <h1>The Taj Restaurant</h1>
        <p>Discover best food & drinks</p>

        <input
          type="text"
          placeholder="Search delicious food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

      </div>


      {/* CATEGORY */}

      <div className="category-tabs">

        {["All","Breakfast","Lunch","Dinner","Drinks","Dessert"].map((cat) => (

          <button
            key={cat}
            className={activeCategory === cat ? "active-tab" : ""}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>

        ))}

      </div>


      {/* VEG FILTER */}

      <div className="veg-filter">

        <button onClick={() => setVegFilter("All")}>All</button>

        <button onClick={() => setVegFilter("Veg")} className="veg-btn">
          🟢 Veg
        </button>

        <button onClick={() => setVegFilter("Non-Veg")} className="nonveg-btn">
          🔴 Non-Veg
        </button>

      </div>


      {/* CART */}

      <div className="cart-box">
        🛒 {cart.length} items | ₹{totalAmount}
      </div>


      {/* FOOD GRID */}

      <div className="food-grid">

        {filteredMenu.map((item, i) => {

          const finalPrice = Math.round(
            item.price - (item.price * item.offer) / 100
          );

          return (

            <div className="food-card" key={i}>

              <span className="offer-badge">
                {item.offer}% OFF
              </span>

              <span className="veg-badge">
                {item.type === "Veg" ? "🟢" : "🔴"}
              </span>

              <img src={item.img} alt="" />

              <div className="food-info">

                <h4>{item.name}</h4>

                <p className="rating">⭐ {item.rating}</p>

                <p className="price">
                  <del>₹{item.price}</del>
                  <span> ₹{finalPrice}</span>
                </p>

                <button
                  className="order-btn"
                  onClick={() => openModal(item)}
                >
                  Order Now
                </button>

                <button
                  className="cart-btn"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </button>

              </div>

            </div>

          );

        })}

      </div>


      {/* MODAL */}
{modalItem && (

  <div className="modal-bg">

    <div className="modal-box">

      <h3 className="modal-title">
        Order {modalItem.name}
      </h3>

      {/* MEAL TYPE */}
      <select
        className={`form-control ${errors.mealType ? "error-input" : ""}`}
        value={mealType}
        onChange={(e) => {
          setMealType(e.target.value);
          setErrors({ ...errors, mealType: "" });
        }}
      >
        <option value="">Meal Type</option>
        <option>Breakfast</option>
        <option>Lunch</option>
        <option>Dinner</option>
      </select>

      {errors.mealType && (
        <small className="error-text">{errors.mealType}</small>
      )}

      {/* TIME */}
      <input
        type="time"
        className={`form-control mt-2 ${errors.time ? "error-input" : ""}`}
        value={time}
        onChange={(e) => {
          setTime(e.target.value);
          setErrors({ ...errors, time: "" });
        }}
      />

      {errors.time && (
        <small className="error-text">{errors.time}</small>
      )}

      {/* ROOM */}
      <select
        className={`form-control mt-2 ${errors.room ? "error-input" : ""}`}
        value={room}
        onChange={(e) => {
          setRoom(e.target.value);
          setErrors({ ...errors, room: "" });
        }}
      >
        <option value="">Select Room</option>
        {[...Array(10)].map((_, i) => (
          <option key={i}>{i + 1}</option>
        ))}
      </select>

      {errors.room && (
        <small className="error-text">{errors.room}</small>
      )}

      {/* BUTTONS */}
      <div className="modal-actions">

        <button
          className="cancel-btn"
          onClick={closeModal}
        >
          Cancel
        </button>

        <button
          className="confirm-btn"
          onClick={confirmOrder}
        >
          Confirm Order
        </button>

      </div>

    </div>

  </div>

)}
    </>
  );

}

export default Restaurant;