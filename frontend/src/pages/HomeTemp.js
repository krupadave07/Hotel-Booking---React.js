import React from "react";
import "./Home.css";
import { motion } from "framer-motion";

function Home() {
  return (
    <div className="home-page">

      {/* HERO */}
      <div className="home-hero">
        <div className="home-overlay">

          <motion.h1
            className="home-title"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Welcome to Taj Luxury Experience
          </motion.h1>

          <p className="home-subtitle">
            Where elegance meets comfort and every stay becomes unforgettable ✨
          </p>

          <a href="/rooms" className="home-btn">
            Explore Rooms
          </a>

        </div>
      </div>

      {/* FEATURES */}
      <div className="container py-5 text-center">
        <h2 className="section-title">Why Choose Us?</h2>

        <div className="row mt-4">

          {[
            { title: "Luxury Rooms", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
            { title: "Fine Dining", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5" },
            { title: "Best Location", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb" }
          ].map((item, i) => (
            <motion.div
              className="col-md-4 mb-4"
              key={i}
              whileHover={{ scale: 1.05 }}
            >
              <div className="home-card">
                <img src={item.img} alt="" />
                <h5>{item.title}</h5>
              </div>
            </motion.div>
          ))}

        </div>
      </div>

      {/* 🧘 SPA SECTION */}
      <div className="container py-5">
        <div className="row align-items-center">

          <div className="col-md-6">
            <img
              src="https://th.bing.com/th/id/R.9be9d837fa38d578dbed4f6f7b9dfeea?rik=Loa7UUw6KAgpmg&riu=http%3a%2f%2fwww.hotelkralj.rs%2fwp-content%2fuploads%2f2016%2f10%2fspa-wellness-kamenje.png&ehk=nbI%2fk9Vgobd%2bd%2f2OEAcsL9noDFqg3xwZqJiQ26IHfRA%3d&risl=&pid=ImgRaw&r=0"
              className="img-fluid rounded home-img"
            />
          </div>

          <div className="col-md-6">
            <h2>Relax & Rejuvenate</h2>
            <p className="home-text">
              Escape into a world of calm and serenity. Our luxury spa treatments
              are designed to refresh your mind, relax your body, and awaken your
              senses 💆‍♀️✨
            </p>
            <a href="/spa" className="home-btn">Explore Spa</a>
          </div>

        </div>
      </div>

      {/* 🍽 RESTAURANT */}
      <div className="container py-5">
        <div className="row align-items-center">

          <div className="col-md-6 order-md-2">
            <img
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9"
              className="img-fluid rounded home-img"
            />
          </div>

          <div className="col-md-6 order-md-1">
            <h2>Fine Dining Experience </h2>
            <p className="home-text">
              Taste the art of perfection. From gourmet dishes to exotic flavors,
              every meal is crafted to deliver a world-class dining experience
              that delights your soul ❤️
            </p>
            <a href="/restaurant" className="home-btn">Explore Restaurant</a>
          </div>

        </div>
      </div>

{/* CTA SECTION */}
<div className="cta-section">

  <div className="cta-overlay">

    <h2 className="cta-title">
      Ready for Your Dream Stay?
    </h2>

    <p className="cta-subtitle">
      Experience luxury, comfort, and unforgettable moments at The Taj Hotel.
    </p>

    <a href="/contact" className="cta-btn">
      Contact Us
    </a>

  </div>

</div>

      {/* FOOTER */}
      <footer className="home-footer">

        <div className="container">
          <div className="row">

            <div className="col-md-4">
              <h5>Taj Hotel</h5>
              <p>Luxury, comfort & unforgettable experience ✨</p>
            </div>

            <div className="col-md-4">
              <h5>Quick Links</h5>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/rooms">Rooms</a></li>
                <li><a href="/restaurant">Restaurant</a></li>
                <li><a href="/spa">Spa</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>

            <div className="col-md-4">
              <h5>Contact</h5>
              <p>📍 Rajkot, Gujarat</p>
              <p>📞 +91 98765 43210</p>
              <p>✉️ TheTaj@gmail.com</p>
            </div>

          </div>
        </div>

        <hr />

        <p className="text-center">
          © 2026 Taj Luxury Hotel
        </p>

      </footer>

    </div>
  );
}

export default Home;