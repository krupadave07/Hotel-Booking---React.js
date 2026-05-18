import React, { useState, useEffect, useCallback } from "react";
import "./Rooms.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import axios from "../api/axios";
import RoomReviews from "../components/RoomReviews";

const defaultRooms = [
  {
    id: 1,
    room_type: "Deluxe Room",
    price: 3000,
    offer: 15,
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    amenities: ["King Bed", "City View", "Free WiFi", "Mini Bar"],
    capacity: 2,
    size: "350 sq ft",
    total_rooms: 10,
    available_rooms: 8
  },
  {
    id: 2,
    room_type: "Luxury Suite",
    price: 6000,
    offer: 25,
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    amenities: ["King Bed", "Living Area", "Ocean View", "Jacuzzi"],
    capacity: 2,
    size: "650 sq ft",
    total_rooms: 5,
    available_rooms: 3
  },
  {
    id: 3,
    room_type: "Executive Room",
    price: 4500,
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
    amenities: ["Queen Bed", "Work Desk", "Free WiFi", "Coffee Maker"],
    capacity: 2,
    size: "400 sq ft",
    total_rooms: 8,
    available_rooms: 6
  },
  {
    id: 4,
    room_type: "Presidential Suite",
    price: 12000,
    img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9",
    amenities: ["King Bed", "Dining Area", "Private Balcony", "Butler Service"],
    capacity: 4,
    size: "1200 sq ft",
    total_rooms: 2,
    available_rooms: 1
  },
  {
    id: 5,
    room_type: "Standard Room",
    price: 2500,
    offer: 10,
    img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
    amenities: ["Queen Bed", "City View", "Free WiFi", "TV"],
    capacity: 2,
    size: "280 sq ft",
    total_rooms: 12,
    available_rooms: 9
  },
  {
    id: 6,
    room_type: "Family Suite",
    price: 8000,
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
    amenities: ["2 Queen Beds", "Living Area", "Kitchenette", "Kids Play Area"],
    capacity: 4,
    size: "750 sq ft",
    total_rooms: 4,
    available_rooms: 2
  },
  {
    id: 7,
    room_type: "Business Suite",
    price: 5500,
    img: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
    amenities: ["King Bed", "Executive Desk", "Meeting Area", "High-Speed Internet"],
    capacity: 2,
    size: "500 sq ft",
    total_rooms: 6,
    available_rooms: 5
  },
  {
    id: 8,
    room_type: "Penthouse Suite",
    price: 15000,
    img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
    amenities: ["Master Bedroom", "Private Terrace", "Panoramic View", "Personal Chef"],
    capacity: 6,
    size: "2000 sq ft",
    total_rooms: 1,
    available_rooms: 1
  },

  {
    id: 10,
    room_type: "Honeymoon Suite",
    price: 7000,
    img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
    amenities: ["Heart-shaped Bed", "Champagne Setup", "Romantic Lighting", "Candlelight Dinner"],
    capacity: 2,
    size: "600 sq ft",
    total_rooms: 3,
    available_rooms: 2
  }
];

function Rooms() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState(defaultRooms);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showReviewsRoom, setShowReviewsRoom] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    checkIn: "",
    checkOut: "",
    guests: 1
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(saved);
  }, []);

  const mergeRooms = (apiRooms) => {
    if (!apiRooms?.length) return defaultRooms;
    const roomMap = new Map(apiRooms.map((room) => [room.room_type, room]));
    const merged = [...apiRooms];
    defaultRooms.forEach((defaultRoom) => {
      if (!roomMap.has(defaultRoom.room_type)) {
        merged.push({ ...defaultRoom, average_rating: 0, review_count: 0 });
      }
    });
    return merged;
  };

  const fetchRooms = useCallback(async () => {
    try {
      const response = await axios.get("/rooms");
      setRooms(mergeRooms(response.data));
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setRooms(defaultRooms);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const addWishlist = (room) => {
    const updated = [...wishlist, room];
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));

    Swal.fire({
      icon: "success",
      title: "Added to Wishlist ❤️",
      text: room.room_type,
      timer: 1500,
      showConfirmButton: false
    });
  };

  const openBookingForm = (room) => {
    setSelectedRoom(room);
    setBookingForm({
      name: "",
      email: "",
      checkIn: "",
      checkOut: "",
      guests: 1
    });
    setShowBookingForm(true);
  };

  const closeBookingForm = () => {
    setSelectedRoom(null);
    setShowBookingForm(false);
  };

  const handleBookingChange = (event) => {
    const { name, value } = event.target;
    setBookingForm((prev) => ({
      ...prev,
      [name]: name === "guests" ? Number(value) : value
    }));
  };

  const submitBooking = (event) => {
    event.preventDefault();

    const { name, email, checkIn, checkOut, guests } = bookingForm;
    if (!name.trim() || !email.trim() || !checkIn || !checkOut) {
      Swal.fire("Missing fields", "Enter name, email, check-in and check-out dates.", "warning");
      return;
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    if (isNaN(start) || isNaN(end) || end <= start) {
      Swal.fire("Invalid dates", "Check-out must be after check-in.", "warning");
      return;
    }

    if (guests < 1) {
      Swal.fire("Invalid guests", "Please select at least one guest.", "warning");
      return;
    }

    const nights = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
    const finalPrice = Math.round(selectedRoom.price - (selectedRoom.price * (selectedRoom.offer || 0)) / 100);

    const booking = {
      room: selectedRoom.room_type,
      room_type: selectedRoom.room_type,
      roomId: selectedRoom.id,
      price: finalPrice,
      totalPrice: finalPrice * nights,
      checkIn,
      checkOut,
      nights,
      name: name.trim(),
      email: email.trim(),
      guests
    };

    navigate("/payment", { state: { booking } });
  };

  if (loading) {
    return (
      <div className="rooms-page">
        <div className="container mt-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading rooms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rooms-page">
      {showReviewsRoom && (
        <RoomReviews
          roomId={showReviewsRoom.id}
          roomType={showReviewsRoom.room_type}
          onClose={() => setShowReviewsRoom(null)}
          onReviewAdded={fetchRooms}
        />
      )}

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

      {showBookingForm && selectedRoom && (
        <div className="container mt-4">
          <div className="booking-form card p-4 mb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 className="mb-1">Book {selectedRoom.room_type}</h3>
                <p className="text-muted mb-0">Enter your details and travel dates before payment.</p>
              </div>
              <button className="btn btn-outline-secondary" onClick={closeBookingForm} type="button">
                Cancel
              </button>
            </div>

            <form onSubmit={submitBooking}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Full Name</label>
                  <input
                    className="form-control"
                    name="name"
                    value={bookingForm.name}
                    onChange={handleBookingChange}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={bookingForm.email}
                    onChange={handleBookingChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Check-in</label>
                  <input
                    type="date"
                    className="form-control"
                    name="checkIn"
                    value={bookingForm.checkIn}
                    onChange={handleBookingChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Check-out</label>
                  <input
                    type="date"
                    className="form-control"
                    name="checkOut"
                    value={bookingForm.checkOut}
                    onChange={handleBookingChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Guests</label>
                  <input
                    type="number"
                    min="1"
                    className="form-control"
                    name="guests"
                    value={bookingForm.guests}
                    onChange={handleBookingChange}
                  />
                </div>
              </div>
              <div className="mt-4 text-end">
                <button className="btn btn-primary" type="submit">
                  Continue to Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="container mt-5">
        <div className="row">
          {rooms.map((room, index) => {
            const finalPrice = Math.round(room.price - (room.price * (room.offer || 0)) / 100);

            return (
              <motion.div
                className="col-md-4 mb-5"
                key={room.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="room-card position-relative">
                  {room.offer > 0 && (
                    <span className="offer-badge position-absolute" style={{ top: '10px', left: '10px', background: '#e74c3c', color: 'white', padding: '5px 10px', borderRadius: '4px', fontWeight: 'bold', zIndex: 2, fontSize: '0.85rem' }}>
                      {room.offer}% OFF
                    </span>
                  )}
                  <div className="img-box">
                    <img src={room.img || "https://images.unsplash.com/photo-1631049307264-da0ec9d70304"} alt={room.room_type} />
                    <span className="price">
                      ₹{finalPrice}
                      {room.offer > 0 && <span className="text-decoration-line-through ms-2" style={{ fontSize: "1rem", color: "#ddd" }}>₹{room.price}</span>}
                    </span>
                    <span className="offer">{room.available_rooms}/{room.total_rooms} Available</span>
                    <span className="wishlist" onClick={() => addWishlist(room)}>❤️</span>
                  </div>
                  <div className="card-body text-center">
                    <h4 className="room-name">{room.room_type}</h4>
                    <div className="room-details mb-2">
                      <small className="text-muted">
                        <i className="fas fa-users"></i> {room.capacity} guests •
                        <i className="fas fa-expand-arrows-alt"></i> {room.size}
                      </small>
                    </div>
                    <div className="room-amenities mb-2">
                      {room.amenities && room.amenities.slice(0, 3).map((amenity, idx) => (
                        <span key={idx} className="badge badge-light mr-1">{amenity}</span>
                      ))}
                    </div>
                    <div className="stars">
                      <span style={{ color: "#ffc107" }}>
                        {"★".repeat(Math.round(room.average_rating || 0))}
                        {"☆".repeat(5 - Math.round(room.average_rating || 0))}
                      </span>
                      <small className="text-muted ms-2" style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => setShowReviewsRoom(room)}>
                        ({room.review_count || 0} reviews)
                      </small>
                    </div>
                    <button className="book-btn mt-3" onClick={() => openBookingForm(room)}>
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <footer className="footer">
        © 2026 Taj Hotel | Luxury Experience ✨
      </footer>
    </div>
  );
}

export default Rooms;
