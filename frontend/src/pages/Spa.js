// import React, { useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import "./spa.css";

// function Spa() {

//   const [modalService, setModalService] = useState(null);
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [errors, setErrors] = useState({});

//   const spaServices = [
//     {
//       name: "Full Body Massage",
//       price: 2500,
//       desc: "A relaxing massage for your entire body to relieve stress and improve circulation.",
//       icon: "💆‍♀️",
//     },
//     {
//       name: "Aromatherapy",
//       price: 1800,
//       desc: "Therapeutic use of essential oils to enhance physical and emotional well-being.",
//       icon: "🌸",
//     },
//     {
//       name: "Facial Treatment",
//       price: 1500,
//       desc: "Deep cleansing and hydration to rejuvenate your skin.",
//       icon: "✨",
//     },
//     {
//       name: "Hot Stone Therapy",
//       price: 3000,
//       desc: "Heated stones placed on the body to relieve tension and improve circulation.",
//       icon: "🔥",
//     },
//     {
//       name: "Steam Bath",
//       price: 1200,
//       desc: "Detoxify your body and relax with a soothing steam bath.",
//       icon: "🧖‍♂️",
//     },
//     {
//       name: "Reflexology",
//       price: 2000,
//       desc: "Foot therapy focusing on reflex points to improve health.",
//       icon: "🦶",
//     },
//     {
//       name: "Body Scrub",
//       price: 1800,
//       desc: "Exfoliate dead skin cells for glowing skin.",
//       icon: "🛁",
//     },
//     {
//       name: "Mud Therapy",
//       price: 2200,
//       desc: "Detoxifying mud wraps that hydrate skin and relieve muscle pain.",
//       icon: "🟤",
//     },
//     {
//       name: "Yoga Session",
//       price: 1200,
//       desc: "Guided yoga session for flexibility and stress relief.",
//       icon: "🧘‍♀️",
//     },
//   ];

//   /* ================= MODAL ================= */

//   const openModal = (service) => {
//     setModalService(service);
//     setErrors({});
//   };

//   const closeModal = () => {
//     setModalService(null);
//     setDate("");
//     setTime("");
//     setErrors({});
//   };

//   /* ================= BOOKING ================= */

//   const confirmBooking = async () => {

//     let newErrors = {};

//     if (!date) newErrors.date = "Please select a date";
//     if (!time) newErrors.time = "Please select time";

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     try {

//       await axios.post("http://localhost:5000/api/spa/book", {
//         name: modalService.name,
//         price: modalService.price,
//         date,
//         time,
//       });

//       Swal.fire({
//         title: "Spa Booking Confirmed 💆‍♀️",
//         text: `${modalService.name} booked for ${date} at ${time}`,
//         icon: "success",
//         confirmButtonColor: "#28a745"
//       });

//       closeModal();

//     } catch {

//       Swal.fire({
//         icon: "error",
//         title: "Booking Failed",
//         text: "Server error. Please try again."
//       });

//     }
//   };

//   return (
//     <>

//       {/* HERO */}

//       <div className="spa-hero">
//         <div className="overlay text-center">
//           <h1>15% Off for New Visitors</h1>
//           <p>Relax. Refresh. Rejuvenate your body & mind.</p>
//           <button className="btn btn-light mt-3">
//             BOOK AN APPOINTMENT
//           </button>
//         </div>
//       </div>

//       {/* TITLE */}

//       <div className="text-center my-5">
//         <h5 className="text-muted">Have a Look at Our</h5>
//         <h1 className="fw-bold">Massage Therapy Center</h1>
//         <p className="text-muted">
//           Experience true relaxation and wellness treatments.
//         </p>
//       </div>

//       {/* SERVICES */}

//       <div className="container">
//         <div className="row">

//           {spaServices.map((service, i) => (

//             <div className="col-md-4 mb-4" key={i}>

//               <div className="spa-card text-center">

//                 <h1>{service.icon}</h1>

//                 <h5>{service.name}</h5>

//                 <p>{service.desc}</p>

//                 <h6 className="text-success fw-bold">
//                   ₹{service.price}
//                 </h6>

//                 <button
//                   className="btn btn-dark w-100 mt-2"
//                   onClick={() => openModal(service)}
//                 >
//                   Book Now
//                 </button>

//               </div>

//             </div>

//           ))}

//         </div>
//       </div>

//       {/* MODAL */}

//       {modalService && (
//         <>
//           <div className="modal show d-block bg-dark bg-opacity-50">

//             <div className="modal-dialog">

//               <div className="modal-content p-3">

//                 <h5 className="mb-3">
//                   Book {modalService.name}
//                 </h5>

//                 {/* DATE */}

//                 <input
//                   type="date"
//                   className={`form-control ${errors.date ? "border-danger" : ""}`}
//                   value={date}
//                   onChange={(e) => setDate(e.target.value)}
//                 />

//                 {errors.date && (
//                   <small className="text-danger">
//                     {errors.date}
//                   </small>
//                 )}

//                 {/* TIME */}

//                 <input
//                   type="time"
//                   className={`form-control mt-2 ${errors.time ? "border-danger" : ""}`}
//                   value={time}
//                   onChange={(e) => setTime(e.target.value)}
//                 />

//                 {errors.time && (
//                   <small className="text-danger">
//                     {errors.time}
//                   </small>
//                 )}

//                 {/* BUTTONS */}

//                 <div className="mt-3 d-flex justify-content-between">

//                   <button
//                     className="btn btn-secondary"
//                     onClick={closeModal}
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     className="btn btn-success"
//                     onClick={confirmBooking}
//                   >
//                     Confirm Booking
//                   </button>

//                 </div>

//               </div>

//             </div>

//           </div>

//           <div className="modal-backdrop show"></div>
//         </>
//       )}

//       {/* FOOTER */}

//       <footer className="bg-dark text-white text-center p-3 mt-5">
//         © 2026 Luxury Spa
//       </footer>

//     </>
//   );
// }

// export default Spa;


import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./spa.css";

function Spa() {

  const [modalService, setModalService] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [errors, setErrors] = useState({});

  /* ================= TIME SLOTS ================= */

  const timeSlots = [
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "04:00 - 05:00",
    "05:00 - 06:00",
    "06:00 - 07:00",
    "07:00 - 08:00",
    "08:00 - 09:00",
  ];

  const spaServices = [
    {
      name: "Full Body Massage",
      price: 2500,
      desc: "A relaxing massage for your entire body to relieve stress and improve circulation.",
      icon: "💆‍♀️",
    },
    {
      name: "Aromatherapy",
      price: 1800,
      desc: "Therapeutic use of essential oils to enhance physical and emotional well-being.",
      icon: "🌸",
    },
    {
      name: "Facial Treatment",
      price: 1500,
      desc: "Deep cleansing and hydration to rejuvenate your skin.",
      icon: "✨",
    },
    {
      name: "Hot Stone Therapy",
      price: 3000,
      desc: "Heated stones placed on the body to relieve tension and improve circulation.",
      icon: "🔥",
    },
    {
      name: "Steam Bath",
      price: 1200,
      desc: "Detoxify your body and relax with a soothing steam bath.",
      icon: "🧖‍♂️",
    },
    {
      name: "Reflexology",
      price: 2000,
      desc: "Foot therapy focusing on reflex points to improve health.",
      icon: "🦶",
    },
    {
      name: "Body Scrub",
      price: 1800,
      desc: "Exfoliate dead skin cells for glowing skin.",
      icon: "🛁",
    },
    {
      name: "Mud Therapy",
      price: 2200,
      desc: "Detoxifying mud wraps that hydrate skin and relieve muscle pain.",
      icon: "🟤",
    },
    {
      name: "Yoga Session",
      price: 1200,
      desc: "Guided yoga session for flexibility and stress relief.",
      icon: "🧘‍♀️",
    },
  ];

  /* ================= MODAL ================= */

  const openModal = (service) => {
    setModalService(service);
    setErrors({});
  };

  const closeModal = () => {
    setModalService(null);
    setDate("");
    setTime("");
    setErrors({});
  };

  /* ================= BOOKING ================= */

  const confirmBooking = async () => {

    let newErrors = {};

    if (!date) newErrors.date = "Please select a date";
    if (!time) newErrors.time = "Please select time slot";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {

      await axios.post("http://localhost:5000/api/spa/book", {
        name: modalService.name,
        price: modalService.price,
        date,
        time,
      });

      Swal.fire({
        title: "Spa Booking Confirmed 💆‍♀️",
        text: `${modalService.name} booked for ${date} at ${time}`,
        icon: "success",
        confirmButtonColor: "#28a745"
      });

      closeModal();

    } catch {

      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: "Server error. Please try again."
      });

    }
  };

  return (
    <>

      {/* HERO */}

      <div className="spa-hero">
        <div className="overlay text-center">
          <h1>15% Off for New Visitors</h1>
          <p>Relax. Refresh. Rejuvenate your body & mind.</p>
        </div>
      </div>

      {/* TITLE */}

      <div className="text-center my-5">
        <h5 className="text-muted">Have a Look at Our</h5>
        <h1 className="fw-bold">Massage Therapy Center</h1>
        <p className="text-muted">
          Experience true relaxation and wellness treatments.
        </p>
      </div>

      {/* SERVICES */}

      <div className="container">
        <div className="row">

          {spaServices.map((service, i) => (

            <div className="col-md-4 mb-4" key={i}>

              <div className="spa-card text-center">

                <h1>{service.icon}</h1>

                <h5>{service.name}</h5>

                <p>{service.desc}</p>

                <h6 className="text-success fw-bold">
                  ₹{service.price}
                </h6>

                <button
                  className="btn btn-dark w-100 mt-2"
                  onClick={() => openModal(service)}
                >
                  Book Now
                </button>

              </div>

            </div>

          ))}

        </div>
      </div>

      {/* MODAL */}

      {modalService && (

        <>
          <div className="modal show d-block bg-dark bg-opacity-50">

            <div className="modal-dialog">

              <div className="modal-content p-3">

                <h5 className="mb-3">
                  Book {modalService.name}
                </h5>

                {/* DATE */}

                <input
                  type="date"
                  className={`form-control ${errors.date ? "border-danger" : ""}`}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />

                {errors.date && (
                  <small className="text-danger">
                    {errors.date}
                  </small>
                )}

                {/* TIME SLOTS */}

                <div className="mt-3">

                  <h6>Select Time Slot</h6>

                  <div className="time-slots">

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

                  {errors.time && (
                    <small className="text-danger">
                      {errors.time}
                    </small>
                  )}

                </div>

                {/* BUTTONS */}

                <div className="mt-3 d-flex justify-content-between">

                  <button
                    className="btn btn-secondary"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>

                  <button
                    className="btn btn-success"
                    onClick={confirmBooking}
                  >
                    Confirm Booking
                  </button>

                </div>

              </div>

            </div>

          </div>

          <div className="modal-backdrop show"></div>
        </>
      )}

      {/* FOOTER */}

      <footer className="bg-dark text-white text-center p-3 mt-5">
        © 2026 Luxury Spa
      </footer>

    </>
  );
}

export default Spa;