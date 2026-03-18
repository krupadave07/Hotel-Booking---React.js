// Home.js
import React from "react";
import "./Home.css";


function Home() {
  return (
    <div>
      {/* HERO SECTION */}
      <section className="bg-light py-5">
        <div className="container">

          {/* TOP HEADER ROW */}
          <div className="row align-items-center mb-4">
            <div className="col-md-6">
              <h1 className="fw-bold">
                Welcome to{" "}
                <span className="text-primary">Luxury Hotel</span>
              </h1>
            </div>
          </div>

          {/* HERO CONTENT */}
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="text-muted mt-3">
                Experience unmatched comfort, refined luxury, and world-class
                hospitality at our hotel. Every detail is thoughtfully designed
                to make your stay memorable, from beautifully crafted rooms to
                personalized service. Book your stay with us today and enjoy a
                truly exceptional getaway.
              </p>
              <a href="/rooms" className="btn btn-primary mt-3">
                View Rooms
              </a>
            </div>

            <div className="col-md-6 text-center">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
                alt="Hotel"
                className="img-fluid rounded shadow hover-img"
              />
            </div>
          </div>

        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="mb-4 fw-semibold">Why Choose Us?</h2>
          <div className="row">

            {/* Luxury Rooms */}
            <div className="col-md-4 mb-3">
              <div className="card shadow h-100">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                  className="card-img-top hover-img"
                  alt="Luxury Rooms"
                />
                <div className="card-body">
                  <h5 className="card-title">Luxury Rooms</h5>
                  <p className="card-text text-muted">
                    Spacious rooms with premium interiors and comfort.
                  </p>
                </div>
              </div>
            </div>

            {/* Fine Dining */}
            <div className="col-md-4 mb-3">
              <div className="card shadow h-100">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
                  className="card-img-top hover-img"
                  alt="Fine Dining"
                />
                <div className="card-body">
                  <h5 className="card-title">Fine Dining</h5>
                  <p className="card-text text-muted">
                    Delicious food prepared by top-class chefs.
                  </p>
                </div>
              </div>
            </div>

            {/* Best Location */}
            <div className="col-md-4 mb-3">
              <div className="card shadow h-100">
                <img
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
                  className="card-img-top hover-img"
                  alt="Best Location"
                />
                <div className="card-body">
                  <h5 className="card-title">Best Location</h5>
                  <p className="card-text text-muted">
                    Located in the heart of the city with easy access.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ROOMS PREVIEW */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h2 className="mb-4 fw-semibold">Our Rooms</h2>
          <div className="row">

            <div className="col-md-4 mb-3">
              <div className="card shadow h-100">
                <img
                  src="https://hotelroyalsignature.com/wp-content/uploads/2023/08/deluxe-room-deluxe-queen-with-sofa-bed-1.jpg"
                  className="card-img-top hover-img"
                  alt="Deluxe Room"
                />
                <div className="card-body">
                  <h5 className="card-title">Deluxe Room</h5>
                  <p className="card-text text-muted">
                    Comfortable room with city view.
                  </p>
                  <a href="/rooms" className="btn btn-primary">
                    Book Now
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card shadow h-100">
                <img
                  src="https://www.swissgarden.com/beach-resort-kuantan/wp-content/uploads/sites/3/2020/02/Executive-Suite-Bedrm.jpg"
                  className="card-img-top hover-img"
                  alt="Luxury Room"
                />
                <div className="card-body">
                  <h5 className="card-title">Luxury Room</h5>
                  <p className="card-text text-muted">
                    Premium amenities and spacious layout.
                  </p>
                  <a href="/rooms" className="btn btn-primary">
                    Book Now
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card shadow h-100">
                <img
                  src="https://www.chicagomag.com/wp-content/uploads/2023/10/C202311-312-Ritziest-Suite-preview.jpg"
                  className="card-img-top hover-img"
                  alt="Suite"
                />
                <div className="card-body">
                  <h5 className="card-title">Suite</h5>
                  <p className="card-text text-muted">
                    Luxury suite with premium facilities.
                  </p>
                  <a href="/rooms" className="btn btn-primary">
                    Book Now
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SPA & RESTAURANT */}
      <section className="py-5">
        <div className="container">

          <div className="row align-items-center mb-5">
            <div className="col-md-6">
              <img
                src="https://wallpaperaccess.com/full/1251812.jpg"
                alt="Spa"
                className="img-fluid rounded shadow hover-img"
              />
            </div>
            <div className="col-md-6">
              <h2>Spa & Wellness</h2>
              <p className="text-muted">
                Relax and rejuvenate with our professional spa services,
                massages, and wellness treatments.
              </p>
              <a href="/spa" className="btn btn-warning mt-3">
                Explore Spa
              </a>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-md-6 order-md-2">
              <img
                src="https://assets.architecturaldigest.in/photos/6255e22894a997637a908b66/16:9/w_2560%2Cc_limit/Bharat%2520Bhavan%2520feature.jpg"
                alt="Restaurant"
                className="img-fluid rounded shadow hover-img"
              />
            </div>
            <div className="col-md-6 order-md-1">
              <h2>Restaurant</h2>
              <p className="text-muted">
                Indulge in gourmet dishes prepared by our top chefs.
              </p>
              <a href="/restaurant" className="btn btn-success mt-3">
                Explore Restaurant
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h2 className="mb-4 fw-semibold">What Our Guests Say</h2>
          <div className="row">

            <div className="col-md-4 mb-3">
              <div className="card shadow h-100 p-3 testimonial-card">
                <p className="text-muted">
                  "Amazing stay! The rooms were luxurious and the
                  service was exceptional."
                </p>
                <h6 className="mt-3">- Krupa Dave</h6>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card shadow h-100 p-3 testimonial-card">
                <p className="text-muted">
                  "The spa and restaurant made our weekend unforgettable."
                </p>
                <h6 className="mt-3">- Snehal Suryavanshi</h6>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card shadow h-100 p-3 testimonial-card">
                <p className="text-muted">
                  "Perfect location and friendly and good staff.Deep cleansing and hydration to rejuvenate your skin."
                </p>
                <h6 className="mt-3">- Bijal Shah</h6>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="py-5 text-center">
        <div className="container">
          <h2>Ready to Book Your Stay?</h2>
          <p className="text-muted mb-3">
            Contact us today or book online to secure your room!
          </p>
          <a href="/contact" className="btn btn-info btn-lg">
            Contact Us
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark text-white text-center p-4">
        &copy; 2026 The Taj Hotel. 
      </footer>
    </div>
  );
}

export default Home;