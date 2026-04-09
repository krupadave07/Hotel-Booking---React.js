import React, { useState, useEffect } from "react";
import "./Rooms.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";


const rooms = [
  {
    id: 1,
    name: "Deluxe Room",
    price: 3000,
    rating: 4,
    offer: "20% OFF",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945"
  },
  {
    id: 2,
    name: "Luxury Room",
    price: 6000,
    rating: 5,
    offer: "15% OFF",
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
  },
  {
    id: 3,
    name: "Suite",
    price: 9000,
    rating: 5,
    offer: "10% OFF",
    img: "https://images.unsplash.com/photo-1590490360182-c33d57733427"
  },

  /* NEW 9 ROOMS 👇 */

  {
    id: 4,
    name: "Executive Room",
    price: 7000,
    rating: 4,
    offer: "25% OFF",
    img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32"
  },
  {
    id: 5,
    name: "Family Room",
    price: 5000,
    rating: 4,
    offer: "18% OFF",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6"
  },
  {
    id: 6,
    name: "Presidential Suite",
    price: 15000,
    rating: 5,
    offer: "30% OFF",
    img: "https://images.unsplash.com/photo-1600585152915-d208bec867a1"
  },
  {
    id: 7,
    name: "Single Room",
    price: 2000,
    rating: 3,
    offer: "10% OFF",
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
  },
  {
    id: 8,
    name: "Double Room",
    price: 3500,
    rating: 4,
    offer: "12% OFF",
    img: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf"
  },
  {
    id: 9,
    name: "Premium Room",
    price: 8000,
    rating: 5,
    offer: "22% OFF",
    img: "https://images.unsplash.com/photo-1591088398332-8a7791972843"
  },
  {
    id: 10,
    name: "Sea View Room",
    price: 9500,
    rating: 5,
    offer: "20% OFF",
    img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511"
  },
  {
    id: 11,
    name: "Garden View Room",
    price: 4000,
    rating: 4,
    offer: "15% OFF",
    img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461"
  },
  {
    id: 12,
    name: "Budget Room",
    price: 1500,
    rating: 3,
    offer: "5% OFF",
    img: "https://images.unsplash.com/photo-1551776235-dde6d4829808"
  }
];

function Rooms() {

  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  /* ================= LOAD WISHLIST ================= */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(saved);
  }, []);

  /* ================= ADD TO WISHLIST ================= */
  const addWishlist = (room) => {
    const updated = [...wishlist, room];
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));

    Swal.fire({
      icon: "success",
      title: "Added to Wishlist ❤️",
      text: room.name,
      timer: 1500,
      showConfirmButton: false
    });
  };

  /* ================= BOOK ROOM ================= */
  const bookRoom = (room) => {
    Swal.fire({
      title: "Booking Successful 🎉",
      text: `${room.name} booked successfully!`,
      icon: "success",
      confirmButtonColor: "#6366f1"
    }).then(() => {
      navigate("/payment", {
        state: {
          booking: {
            room: room.name,
            price: room.price,
            checkIn: "2026-04-10",
            checkOut: "2026-04-12"
          }
        }
      });
    });
  };

  return (
    <div className="rooms-page">

      {/* ================= HERO SECTION ================= */}
      <div className="hero-section">
        <div className="overlay">

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Experience Royal Comfort at Taj Hotel
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            Discover a perfect blend of luxury, elegance, and world-class hospitality.
            Book your dream stay with unforgettable comfort and premium services.
          </motion.p>

        </div>
      </div>

      {/* ================= ROOMS ================= */}
      <div className="container mt-5">
        <div className="row">

          {rooms.map((room, index) => (
            <motion.div
              className="col-md-4 mb-5"
              key={room.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >

              <div className="room-card">

                {/* IMAGE */}
                <div className="img-box">
                  <img src={room.img} alt={room.name} />

                  <span className="price">₹{room.price}</span>
                  <span className="offer">{room.offer}</span>

                  <span
                    className="wishlist"
                    onClick={() => addWishlist(room)}
                  >
                    ❤️
                  </span>
                </div>

                {/* DETAILS */}
                <div className="card-body text-center">

                  <h4 className="room-name">{room.name}</h4>

                  <div className="stars">
                    {"★".repeat(room.rating)}
                  </div>

                  <button
                    className="book-btn mt-3"
                    onClick={() => bookRoom(room)}
                  >
                    Book Now
                  </button>

                </div>

              </div>

            </motion.div>
          ))}

        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        © 2026 Taj Hotel | Luxury Experience ✨
      </footer>

    </div>
  );
}

export default Rooms;