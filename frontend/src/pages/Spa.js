import React, { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import "./spa.css";
import { motion } from "framer-motion";
import axios from "../api/axios";
import SpaReviews from "../components/SpaReviews";

const defaultSpaServices = [
  { id: 1, name: "Swedish Massage", price: 120, duration: "60 min", img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874", rating: 4.8, category: "Massage", description: "Relaxing full-body massage with gentle strokes" },
  { id: 2, name: "Deep Tissue Massage", price: 160, duration: "70 min", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b", rating: 4.7, category: "Massage", description: "Intensive massage targeting deep muscle layers" },
  
  { id: 7, name: "Anti-Aging Facial", price: 200, duration: "60 min", img: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9", rating: 4.8, category: "Facial", description: "Advanced treatment to reduce fine lines" },
  { id: 8, name: "Acne Treatment Facial", price: 130, duration: "50 min", img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881", rating: 4.5, category: "Facial", description: "Specialized treatment for acne-prone skin" },
  { id: 9, name: "Brightening Facial", price: 140, duration: "55 min", img: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9", rating: 4.6, category: "Facial", description: "Vitamin C treatment for radiant skin" },
  { id: 10, name: "Body Scrub", price: 130, duration: "50 min", img: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9", rating: 4.5, category: "Body", description: "Exfoliating treatment for smooth skin" },
  { id: 11, name: "Herbal Body Wrap", price: 140, duration: "55 min", img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881", rating: 4.5, category: "Body", description: "Detoxifying wrap with natural herbs" },
  { id: 12, name: "Mud Therapy", price: 110, duration: "45 min", img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56", rating: 4.4, category: "Body", description: "Mineral-rich mud treatment for skin health" },
  { id: 13, name: "Manicure & Pedicure", price: 80, duration: "60 min", img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56", rating: 4.6, category: "Nails", description: "Complete nail care treatment" },
  { id: 14, name: "Reflexology", price: 90, duration: "40 min", img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56", rating: 4.4, category: "Feet", description: "Foot massage targeting pressure points" },
  { id: 15, name: "Paraffin Hand Treatment", price: 70, duration: "30 min", img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56", rating: 4.3, category: "Hands", description: "Warming wax treatment for hands" },
  { id: 16, name: "Scalp Massage", price: 70, duration: "30 min", img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874", rating: 4.4, category: "Head", description: "Relaxing head and scalp massage" },
  { id: 17, name: "Oxygen Facial", price: 170, duration: "45 min", img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881", rating: 4.7, category: "Facial", description: "Oxygen infusion for glowing skin" },
  
];

function Spa() {

  const [spaServices, setSpaServices] = useState(defaultSpaServices);
  const [loading, setLoading] = useState(true);
  const [modalService, setModalService] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reviewsModalService, setReviewsModalService] = useState(null);

  const handleOpenReviews = (service) => {
    setReviewsModalService(service);
  };

  const handleCloseReviews = () => {
    setReviewsModalService(null);
    fetchServices();
  };

  const mergeSpaServices = (apiServices) => {
    if (!apiServices?.length) return defaultSpaServices;
    const serviceMap = new Map(apiServices.map((item) => [item.name, item]));
    const merged = [...apiServices];
    defaultSpaServices.forEach((defaultItem) => {
      if (!serviceMap.has(defaultItem.name)) {
        merged.push(defaultItem);
      }
    });
    return merged;
  };

  const fetchServices = useCallback(async () => {
    try {
      const response = await axios.get("/spa/services");
      setSpaServices(mergeSpaServices(response.data));
    } catch (error) {
      console.error("Error fetching services:", error);
      setSpaServices(defaultSpaServices);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const timeSlots = [
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "04:00 - 05:00",
    "05:00 - 06:00"
  ];

  const openModal = (service) => {
    setModalService(service);
  };

  const closeModal = () => {
    setModalService(null);
    setDate("");
    setTime("");
  };

 const confirmBooking = async () => {

  if (!date || !time) {
    Swal.fire("Select Date & Time", "", "warning");
    return;
  }

  try {

    await axios.post("/spa/book", {
      name: modalService.name,
      price: modalService.price,
      date,
      time
    });

    Swal.fire({
      title: "Booking Confirmed 💆‍♀️",
      text: `${modalService.name} booked successfully`,
      icon: "success"
    });

    closeModal();

  } catch (err) {
    console.error(err);
    Swal.fire("Error ❌", "Booking failed", "error");
  }
};

  if (loading) {
    return (
      <div className="spa-page">
        <div className="container mt-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading spa services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="spa-page">

      {/* HERO */}
      <div className="hero-img">
        <div className="overlay">

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Relax. Refresh. Rejuvenate.
          </motion.h1>

          <p className="hero-subtitle">
            Experience luxury spa therapy like never before
          </p>

        </div>
      </div>

      {/* TITLE */}
      <div className="text-center mt-5">
        <h2 className="section-title">Luxury Spa Services</h2>
      </div>

      {/* SERVICES */}
      <div className="container mt-5">
        <div className="row">

          {spaServices.map((service, i) => (
            <motion.div
              className="col-md-4 mb-4"
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >

              <div className="spa-card text-center">

                <img src={service.img || "https://images.unsplash.com/photo-1544161515-4ab6ce6db874"} alt={service.name} style={{width: '80px', height: '80px', borderRadius: '50%', marginBottom: '15px'}} />
                <h5>{service.name}</h5>
                <div className="spa-category mb-1">
                  <span className="badge badge-info">{service.category}</span>
                </div>
                <p className="spa-description small text-muted mb-2">{service.description}</p>
                <p className="duration">{service.duration}</p>
                <h6>₹{service.price}</h6>
                <div 
                  className="rating"
                  style={{cursor: 'pointer'}}
                  onClick={() => handleOpenReviews(service)}
                  title="Click to view or add reviews"
                >
                  {"★".repeat(Math.floor(service.average_rating || service.rating || 4))}
                  <span className="rating-text ml-1">
                    ({service.average_rating ? Number(service.average_rating).toFixed(1) : service.rating || 4})
                    {service.review_count > 0 && (
                      <small className="ms-1 text-muted">
                        ({service.review_count} {service.review_count === 1 ? "review" : "reviews"})
                      </small>
                    )}
                  </span>
                </div>

                <button
                  className="book-btn"
                  onClick={() => openModal(service)}
                >
                  Book Now
                </button>

              </div>

            </motion.div>
          ))}

        </div>
      </div>

      {/* MODAL */}
      {modalService && (
        <div className="modal-bg">

          <div className="modal-box">

            <h4>Book {modalService.name}</h4>

            <input
              type="date"
              className="form-control mt-2"
              onChange={(e) => setDate(e.target.value)}
            />

            <div className="slots mt-3">
              {timeSlots.map((slot, i) => (
                <button
                  key={i}
                  className={`slot-btn ${time === slot ? "active-slot" : ""}`}
                  onClick={() => setTime(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>

            <div className="actions mt-3">
              <button className="cancel-btn" onClick={closeModal}>
                Cancel
              </button>

              <button className="confirm-btn" onClick={confirmBooking}>
                Confirm
              </button>
            </div>

          </div>

        </div>
      )}

      {/* REVIEWS MODAL */}
      {reviewsModalService && (
        <SpaReviews
          serviceId={reviewsModalService.id}
          serviceName={reviewsModalService.name}
          onClose={handleCloseReviews}
          onReviewAdded={fetchServices}
        />
      )}

      {/* FOOTER */}
      <footer className="footer">
        © 2026 Taj Spa ✨
      </footer>

    </div>
  );
}

export default Spa;