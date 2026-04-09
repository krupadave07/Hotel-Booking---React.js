// import React, { useState } from "react";
// import Swal from "sweetalert2";
// import "./spa.css";
// import { motion } from "framer-motion";

// function Spa() {

//   const [modalService, setModalService] = useState(null);
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");

//   const timeSlots = [
//     "09:00 - 10:00",
//     "10:00 - 11:00",
//     "11:00 - 12:00",
//     "04:00 - 05:00",
//     "05:00 - 06:00"
//   ];

//   const spaServices = [
//     { name: "Full Body Massage", price: 2500, icon: "💆‍♀️" },
//     { name: "Aromatherapy", price: 1800, icon: "🌸" },
//     { name: "Facial Treatment", price: 1500, icon: "✨" },
//     { name: "Hot Stone Therapy", price: 3000, icon: "🔥" },
//     { name: "Steam Bath", price: 1200, icon: "🧖‍♂️" },
//     { name: "Yoga Session", price: 1200, icon: "🧘‍♀️" }
//   ];

//   const openModal = (s) => setModalService(s);
//   const closeModal = () => setModalService(null);

//   const confirmBooking = () => {
//     if (!date || !time) {
//       Swal.fire("Select date & time", "", "warning");
//       return;
//     }

//     Swal.fire({
//       title: "Booking Confirmed 💆‍♀️",
//       text: `${modalService.name} booked`,
//       icon: "success"
//     });

//     closeModal();
//   };

//   return (
//     <div className="spa-page">

//       {/* HERO */}
//       <div className="hero-img">
//         <div className="overlay">

//           <motion.h1
//             className="hero-title"
//             initial={{ opacity: 0, y: -40 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             Relax. Rejuvenate. Revive.
//           </motion.h1>

//           <p className="hero-subtitle">
//             Experience luxury spa therapy like never before
//           </p>

//         </div>
//       </div>

//       {/* TITLE */}
//       <div className="text-center mt-5">
//         <h2 className="section-title">Luxury Spa Services</h2>
//       </div>

//       {/* SERVICES */}
//       <div className="container mt-5">
//         <div className="row">

//           {spaServices.map((s, i) => (
//             <motion.div
//               className="col-md-4 mb-4"
//               key={i}
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//             >

//               <div className="spa-card text-center">

//                 <h1>{s.icon}</h1>
//                 <h5>{s.name}</h5>
//                 <h6>₹{s.price}</h6>

//                 <button
//                   className="book-btn"
//                   onClick={() => openModal(s)}
//                 >
//                   Book Now
//                 </button>

//               </div>

//             </motion.div>
//           ))}

//         </div>
//       </div>

//       {/* MODAL */}
//       {modalService && (
//         <div className="modal-bg">

//           <div className="modal-box">

//             <h4>Book {modalService.name}</h4>

//             <input
//               type="date"
//               onChange={(e) => setDate(e.target.value)}
//             />

//             <div className="slots">
//               {timeSlots.map((t, i) => (
//                 <button
//                   key={i}
//                   className={time === t ? "active-slot" : ""}
//                   onClick={() => setTime(t)}
//                 >
//                   {t}
//                 </button>
//               ))}
//             </div>

//             <div className="actions">
//               <button onClick={closeModal}>Cancel</button>
//               <button onClick={confirmBooking}>Confirm</button>
//             </div>

//           </div>

//         </div>
//       )}

//       {/* FOOTER */}
//       <footer className="footer">
//         © 2026 Taj Spa ✨
//       </footer>

//     </div>
//   );
// }

// export default Spa;


import React, { useState } from "react";
import Swal from "sweetalert2";
import "./spa.css";
import { motion } from "framer-motion";

function Spa() {

  const [modalService, setModalService] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const timeSlots = [
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "04:00 - 05:00",
    "05:00 - 06:00"
  ];

  const spaServices = [
    { name: "Full Body Massage", price: 2500, icon: "💆‍♀️" },
    { name: "Aromatherapy", price: 1800, icon: "🌸" },
    { name: "Facial Treatment", price: 1500, icon: "✨" },
    { name: "Hot Stone Therapy", price: 3000, icon: "🔥" },
    { name: "Steam Bath", price: 1200, icon: "🧖‍♂️" },
    { name: "Yoga Session", price: 1200, icon: "🧘‍♀️" }
  ];

  const openModal = (service) => {
    setModalService(service);
  };

  const closeModal = () => {
    setModalService(null);
    setDate("");
    setTime("");
  };

  const confirmBooking = () => {

    if (!date || !time) {
      Swal.fire("Select Date & Time", "", "warning");
      return;
    }

    Swal.fire({
      title: "Booking Confirmed 💆‍♀️",
      text: `${modalService.name} booked successfully`,
      icon: "success"
    });

    closeModal();
  };

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
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >

              <div className="spa-card text-center">

                <h1>{service.icon}</h1>
                <h5>{service.name}</h5>
                <h6>₹{service.price}</h6>

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

      {/* FOOTER */}
      <footer className="footer">
        © 2026 Taj Spa ✨
      </footer>

    </div>
  );
}

export default Spa;