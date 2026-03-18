// import { useState } from "react";
// import "./Contact.css";

// function Contact() {

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [serverMsg, setServerMsg] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });

//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   /* ================= VALIDATION ================= */
//   const validate = () => {
//     let newErrors = {};

//     if (!formData.name) {
//       newErrors.name = "Name is required";
//     }

//     if (!formData.email) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Invalid email format";
//     }

//     if (!formData.subject) {
//       newErrors.subject = "Subject is required";
//     }

//     if (!formData.message) {
//       newErrors.message = "Message is required";
//     } else if (formData.message.length < 10) {
//       newErrors.message = "Message must be at least 10 characters";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   /* ================= SUBMIT ================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validate()) return;

//     try {
//       const res = await fetch("http://localhost:5000/api/contact", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (data.success) {
//         setServerMsg("✅ Message sent successfully!");

//         setFormData({
//           name: "",
//           email: "",
//           subject: "",
//           message: "",
//         });
//       } else {
//         setServerMsg("❌ Failed to send message");
//       }

//     } catch (err) {
//       console.error(err);
//       setServerMsg("❌ Server error");
//     }
//   };

//   return (
//     <>
//       {/* HERO */}
//       <div className="contact-hero">
//         <h1>Contact Us</h1>
//         <p>
//           We are here to assist you with bookings, inquiries, and special
//           requests.
//         </p>
//       </div>

//       <div className="container my-5">
//         <div className="row g-5 align-items-center">

//           {/* FORM */}
//           <div className="col-md-6">
//             <div className="contact-card">
//               <h3>Send Us a Message</h3>

//               {serverMsg && (
//                 <div className="alert alert-info">{serverMsg}</div>
//               )}

//               <form onSubmit={handleSubmit} noValidate>

//                 {/* NAME */}
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className={`form-control mb-1 ${
//                     errors.name ? "border-danger" : ""
//                   }`}
//                   placeholder="Your Name"
//                 />
//                 {errors.name && (
//                   <small className="text-danger">{errors.name}</small>
//                 )}

//                 {/* EMAIL */}
//                 <input
//                   type="text"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className={`form-control mt-3 mb-1 ${
//                     errors.email ? "border-danger" : ""
//                   }`}
//                   placeholder="Your Email"
//                 />
//                 {errors.email && (
//                   <small className="text-danger">{errors.email}</small>
//                 )}

//                 {/* SUBJECT */}
//                 <input
//                   type="text"
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   className={`form-control mt-3 mb-1 ${
//                     errors.subject ? "border-danger" : ""
//                   }`}
//                   placeholder="Subject"
//                 />
//                 {errors.subject && (
//                   <small className="text-danger">{errors.subject}</small>
//                 )}

//                 {/* MESSAGE */}
//                 <textarea
//                   rows="4"
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   className={`form-control mt-3 mb-1 ${
//                     errors.message ? "border-danger" : ""
//                   }`}
//                   placeholder="Your Message"
//                 ></textarea>
//                 {errors.message && (
//                   <small className="text-danger">{errors.message}</small>
//                 )}

//                 <button className="btn btn-dark w-100 mt-3">
//                   Send Message
//                 </button>

//               </form>
//             </div>
//           </div>

//           {/* DETAILS */}
//           <div className="col-md-6">
//             <div className="contact-info">
//               <h3>Get in Touch</h3>

//               <p>📍 <strong>Address:</strong> Rajkot, Gujarat, India</p>

//               <p>
//                 📞 <strong>Phone:</strong>{" "}
//                 <a href="tel:+919876543210" className="contact-link">
//                   +91 98765 43210
//                 </a>
//               </p>

//               <p>
//                 ✉️ <strong>Email:</strong>{" "}
//                 <a
//                   href="mailto:TheTaj@gmail.com?subject=Hotel Inquiry&body=Hello, I want to know about rooms"
//                   className="contact-link"
//                 >
//                   TheTaj@gmail.com
//                 </a>
//               </p>

//               <div className="map-box mt-4">
//                 <iframe
//                   title="map"
//                   src="https://maps.google.com/maps?q=rajkot&t=&z=13&ie=UTF8&iwloc=&output=embed"
//                   width="100%"
//                   height="250"
//                   style={{ border: 0 }}
//                 ></iframe>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* FOOTER */}
//       <footer className="bg-dark text-white text-center p-4">
//         &copy; 2026 Luxury Hotel
//       </footer>
//     </>
//   );
// }

// export default Contact;


import { useState } from "react";
import Swal from "sweetalert2";
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

  /* ================= VALIDATION ================= */

  const validate = () => {

    let newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.subject) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message) {
      newErrors.message = "Message is required";
    }
    else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    try {

      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {

        Swal.fire({
          title: "Message Sent 📩",
          text: "Our team will contact you shortly.",
          icon: "success",
          confirmButtonColor: "#28a745"
        });

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

      }
      else {

        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Unable to send message"
        });

      }

    }
    catch {

      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Please try again later"
      });

    }

  };

  return (

    <>
      {/* HERO */}

      <div className="contact-hero text-center">

        <h1>Contact Luxury Hotel</h1>

        <p>
          We are delighted to assist you with room reservations,
          spa bookings, restaurant reservations, and special
          requests to make your stay unforgettable.
        </p>

      </div>

      {/* MAIN SECTION */}

      <div className="container my-5">

        <div className="row g-5 align-items-start">

          {/* CONTACT FORM */}

          <div className="col-md-6">

            <div className="contact-card">

              <h3 className="mb-3">Send Us a Message</h3>

              <p className="text-muted mb-4">
                If you have any questions regarding bookings,
                services, or special arrangements, feel free to
                contact us using the form below.
              </p>

              <form onSubmit={handleSubmit} noValidate>

                {/* NAME */}

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-control mb-1 ${errors.name ? "border-danger" : ""}`}
                  placeholder="Your Name"
                />

                {errors.name && (
                  <small className="text-danger">{errors.name}</small>
                )}

                {/* EMAIL */}

                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-control mt-3 mb-1 ${errors.email ? "border-danger" : ""}`}
                  placeholder="Your Email"
                />

                {errors.email && (
                  <small className="text-danger">{errors.email}</small>
                )}

                {/* SUBJECT */}

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`form-control mt-3 mb-1 ${errors.subject ? "border-danger" : ""}`}
                  placeholder="Subject"
                />

                {errors.subject && (
                  <small className="text-danger">{errors.subject}</small>
                )}

                {/* MESSAGE */}

                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`form-control mt-3 mb-1 ${errors.message ? "border-danger" : ""}`}
                  placeholder="Your Message"
                ></textarea>

                {errors.message && (
                  <small className="text-danger">{errors.message}</small>
                )}

                <button className="btn btn-dark w-100 mt-3">
                  Send Message
                </button>

              </form>

            </div>

          </div>

          {/* CONTACT DETAILS */}

          <div className="col-md-6">

            <div className="contact-info">

              <h3>Hotel Information</h3>

              <p className="text-muted">
                Our dedicated customer support team is available
                to assist you with reservations, inquiries,
                feedback, or special travel arrangements.
              </p>

              <hr />

              <p>
                📍 <strong>Address:</strong><br/>
                Luxury Hotel, Rajkot,<br/>
                Gujarat, India
              </p>

              <p>
                📞 <strong>Phone:</strong><br/>
                <a href="tel:+919876543210" className="contact-link">
                  +91 98765 43210
                </a>
              </p>

              <p>
                ✉️ <strong>Email:</strong><br/>
                <a
                  href="mailto:TheTaj@gmail.com"
                  className="contact-link"
                >
                  TheTaj@gmail.com
                </a>
              </p>

              <p>
                🕒 <strong>Support Hours:</strong><br/>
                Monday – Sunday<br/>
                9:00 AM – 10:00 PM
              </p>

              <hr />

              <h5>Find Us on Map</h5>

              <div className="map-box mt-3">

                <iframe
                  title="map"
                  src="https://maps.google.com/maps?q=rajkot&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                ></iframe>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* FOOTER */}

      <footer className="bg-dark text-white text-center p-4">

        <p className="mb-1">
          Experience luxury, comfort, and exceptional hospitality
          at The Taj Luxury Hotel.
        </p>

        &copy; 2026 Luxury Hotel | All Rights Reserved

      </footer>

    </>
  );

}

export default Contact;
