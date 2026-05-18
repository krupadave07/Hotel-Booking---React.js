import { useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import "./Contact.css";

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email";

    if (!formData.subject) newErrors.subject = "Subject required";
    if (!formData.message) newErrors.message = "Message required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    Swal.fire({
      title: "Message Sent 📩",
      text: "We’ll contact you soon!",
      icon: "success",
    });

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">

      {/* HERO */}
      <div className="contact-hero">

        <div className="contact-overlay">

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Connect With Luxury ✨
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Let us assist you with bookings, queries & premium services
          </motion.p>

        </div>

      </div>

      {/* MAIN */}
      <div className="container my-5">
        <div className="row g-5">

          {/* FORM */}
          <div className="col-md-6">
            <div className="contact-card">

              <h3>Send Message</h3>

              <form onSubmit={handleSubmit}>

                <input name="name" placeholder="Your Name"
                  value={formData.name} onChange={handleChange} />
                {errors.name && <small>{errors.name}</small>}

                <input name="email" placeholder="Email"
                  value={formData.email} onChange={handleChange} />
                {errors.email && <small>{errors.email}</small>}

                <input name="subject" placeholder="Subject"
                  value={formData.subject} onChange={handleChange} />
                {errors.subject && <small>{errors.subject}</small>}

                <textarea rows="4" name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}></textarea>
                {errors.message && <small>{errors.message}</small>}

                <button className="send-btn">Send Message</button>

              </form>

            </div>
          </div>

          {/* INFO */}
          <div className="col-md-6">
            <div className="contact-info">

              <h3>Hotel Info</h3>

              <p>📍 Rajkot, Gujarat, India</p>
              <p>📞 +91 98765 43210</p>
              <p>✉️ thetaj@gmail.com</p>

              <iframe
                title="map"
                src="https://maps.google.com/maps?q=rajkot&output=embed"
                width="100%"
                height="250"
              ></iframe>

            </div>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        © 2026 Taj Luxury Hotel
      </footer>

    </div>
  );
}

export default Contact;