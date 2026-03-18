import { useState, useEffect } from "react";
import "./Rooms.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Rooms() {

  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [ratings, setRatings] = useState({});

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [dateError, setDateError] = useState({});

  const navigate = useNavigate();

  /* ================= ROOMS ================= */

  const rooms = [
    {
      id: 1,
      type: "Deluxe Room",
      price: 4000,
      image:
        "https://hotelroyalsignature.com/wp-content/uploads/2023/08/deluxe-room-deluxe-queen-with-sofa-bed-1.jpg"
    },
    {
      id: 2,
      type: "Luxury Room",
      price: 6000,
      image:
        "https://www.swissgarden.com/beach-resort-kuantan/wp-content/uploads/sites/3/2020/02/Executive-Suite-Bedrm.jpg"
    },
    {
      id: 3,
      type: "Suite",
      price: 8000,
      image:
        "https://www.chicagomag.com/wp-content/uploads/2023/10/C202311-312-Ritziest-Suite-preview.jpg"
    },
    {
      id: 4,
      type: "Presidential Suite",
      price: 15000,
      image:
        "https://assets.sandsresortsmacao.cn/content/venetianmacao/hotel/suite/2020/presidential-suite/vm_presidential-suite_gallery_1500x1020_1.jpg"
    },
    {
      id: 5,
      type: "Executive Room",
      price: 5000,
      image:
        "https://images.unsplash.com/photo-1591088398332-8a7791972843"
    },
    {
      id: 6,
      type: "Family Room",
      price: 7000,
      image:
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461"
    },
    {
      id: 7,
      type: "Premium Suite",
      price: 9000,
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
    },
    {
      id: 8,
      type: "Honeymoon Suite",
      price: 10000,
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427"
    },
    {
      id: 9,
      type: "Single Room",
      price: 2500,
      image:
        "https://www.hotel-dubrovnik.hr/wp-content/uploads/2018/12/Hotel-Dubrovnik-Zagreb-standard-single-room1-min.jpg"
    },
    {
      id: 10,
      type: "Double Room",
      price: 3500,
      image:
        "https://images.unsplash.com/photo-1598928506311-c55ded91a20c"
    }
  ];

  /* ================= RATINGS ================= */

  useEffect(() => {

    const fetchRatings = async () => {

      try {

        const res = await fetch("http://localhost:5000/api/ratings");
        const data = await res.json();

        const map = {};

        data.forEach((r) => {
          map[r.room_id] = r.rating;
        });

        setRatings(map);

      } catch {

        console.log("ratings api error");

      }

    };

    fetchRatings();

  }, []);

  /* ================= BOOKING ================= */

  const handleConfirmBooking = () => {

    let errors = {};

    if (!customerName.trim()) errors.name = "Full name required";
    if (!email.trim()) errors.email = "Email required";
    if (!phone.trim()) errors.phone = "Phone required";
    if (!checkIn) errors.checkIn = "Check-in required";
    if (!checkOut) errors.checkOut = "Check-out required";

    setDateError(errors);

    if (Object.keys(errors).length > 0) return;

    Swal.fire({
      title: "Booking Confirmed 🎉",
      text: "Your room has been booked successfully!",
      icon: "success",
      confirmButtonText: "Continue"
    }).then(() => {

      setShowModal(false);

      navigate("/payment", {
        state: {
          booking: {
            room: selectedRoom.type,
            price: selectedRoom.price,
            checkIn,
            checkOut
          }
        }
      });

    });

  };

  /* ================= WISHLIST ================= */

  const toggleWishlist = (id) => {

    const isAdded = wishlist.includes(id);

    setWishlist((prev) =>
      isAdded ? prev.filter((x) => x !== id) : [...prev, id]
    );

    if (!isAdded) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Added to Wishlist ❤️",
        showConfirmButton: false,
        timer: 1500
      });
    }

  };

  return (

    <div className="container mt-4">

      <h2 className="text-center mb-4 fw-bold">Explore Our Rooms</h2>

      <div className="row g-4">

        {rooms.map((room) => (

          <div className="col-md-6 col-lg-4" key={room.id}>

            <div className="hotel-card">

              <div className="img-container">

                <img src={room.image} alt="" />

                <button
                  className={`wishlist-btn ${wishlist.includes(room.id) ? "active" : ""}`}
                  onClick={() => toggleWishlist(room.id)}
                >
                  {wishlist.includes(room.id) ? "❤️" : "🤍"}
                </button>

                <span className="rating-badge">
                  ⭐ {ratings[room.id] || 8.5}
                </span>

              </div>

              <div className="card-body">

                <h5>{room.type}</h5>

                <h4 className="price">₹{room.price}</h4>

                <button
                  className="view-btn"
                  onClick={() => {
                    setSelectedRoom(room);
                    setShowModal(true);
                  }}
                >
                  View Deal
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>


      {/* BOOKING MODAL */}

      {showModal && (

        <div className="modal show d-block modal-bg">

          <div className="modal-dialog">

            <div className="modal-content">

              <div className="modal-header">

                <h5>Book {selectedRoom?.type}</h5>

                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>

              </div>

              <div className="modal-body">

                <input
                  type="text"
                  placeholder="Full Name"
                  className="form-control mb-1"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
                <small className="text-danger">{dateError.name}</small>

                <input
                  type="email"
                  placeholder="Email"
                  className="form-control mb-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <small className="text-danger">{dateError.email}</small>

                <input
                  type="tel"
                  placeholder="Phone"
                  className="form-control mb-1"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <small className="text-danger">{dateError.phone}</small>

                <input
                  type="date"
                  className="form-control mb-1"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
                <small className="text-danger">{dateError.checkIn}</small>

                <input
                  type="date"
                  className="form-control"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
                <small className="text-danger">{dateError.checkOut}</small>

              </div>

              <div className="modal-footer">

                <button
                  className="btn btn-success"
                  onClick={handleConfirmBooking}
                >
                  Confirm Booking
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}

export default Rooms;





































// import { useState, useEffect } from "react";
// import "./Rooms.css";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import "animate.css";

// function Rooms() {

//   const [showModal, setShowModal] = useState(false);
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [wishlist, setWishlist] = useState([]);
//   const [ratings, setRatings] = useState({});

//   const [checkIn, setCheckIn] = useState("");
//   const [checkOut, setCheckOut] = useState("");

//   const [customerName, setCustomerName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");

//   const [dateError, setDateError] = useState({});

//   const navigate = useNavigate();

//   /* ================= ROOMS ================= */

//   const rooms = [
//     {
//       id: 1,
//       type: "Deluxe Room",
//       price: 4000,
//       image:
//         "https://hotelroyalsignature.com/wp-content/uploads/2023/08/deluxe-room-deluxe-queen-with-sofa-bed-1.jpg"
//     },
//     {
//       id: 2,
//       type: "Luxury Room",
//       price: 6000,
//       image:
//         "https://www.swissgarden.com/beach-resort-kuantan/wp-content/uploads/sites/3/2020/02/Executive-Suite-Bedrm.jpg"
//     },
//     {
//       id: 3,
//       type: "Suite",
//       price: 8000,
//       image:
//         "https://www.chicagomag.com/wp-content/uploads/2023/10/C202311-312-Ritziest-Suite-preview.jpg"
//     },
//     {
//       id: 4,
//       type: "Presidential Suite",
//       price: 15000,
//       image:
//         "https://tse1.mm.bing.net/th/id/OIP._h8906nCoRI44eTrYJ5lqAHaFC?w=1500&h=1020&rs=1&pid=ImgDetMain&o=7&rm=3"
//     },
//     {
//       id: 5,
//       type: "Executive Room",
//       price: 5000,
//       image:
//         "https://images.unsplash.com/photo-1591088398332-8a7791972843"
//     },
//     {
//       id: 6,
//       type: "Family Room",
//       price: 7000,
//       image:
//         "https://images.unsplash.com/photo-1578683010236-d716f9a3f461"
//     },
//     {
//       id: 7,
//       type: "Premium Suite",
//       price: 9000,
//       image:
//         "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
//     },
//     {
//       id: 8,
//       type: "Honeymoon Suite",
//       price: 10000,
//       image:
//         "https://images.unsplash.com/photo-1590490360182-c33d57733427"
//     },
//     {
//       id: 9,
//       type: "Single Room",
//       price: 2500,
//       image:
//         "https://www.hotel-dubrovnik.hr/wp-content/uploads/2018/12/Hotel-Dubrovnik-Zagreb-standard-single-room1-min.jpg"
//     },
//     {
//       id: 10,
//       type: "Double Room",
//       price: 3500,
//       image:
//         "https://images.unsplash.com/photo-1598928506311-c55ded91a20c"
//     },
//        {
//       id: 11,
//       type: "Sea View Room",
//       price: 3500,
//       image:
//         "https://assets.tivolihotels.com/image/upload/q_auto,f_auto,c_limit,w_1045/media/minor/tivoli/images/hotels/tmvi/rooms/premium-sea-view/tivoli_marina_vilamoura_algarve_resort_guest_room_premium_room_sea_view.jpg"
//     },
//        {
//       id: 12,
//       type: "Garden View Room",
//       price: 3500,
//       image:
//         "https://tse4.mm.bing.net/th/id/OIP.S2Q-SsIXXAZ_4vtC14mA7AHaEK?rs=1&pid=ImgDetMain&o=7&rm=3"
//     }
//   ];

//   /* ================= RATINGS ================= */

//   useEffect(() => {

//     const fetchRatings = async () => {

//       try {

//         const res = await fetch("http://localhost:5000/api/ratings");
//         const data = await res.json();

//         const map = {};

//         data.forEach((r) => {
//           map[r.room_id] = r.rating;
//         });

//         setRatings(map);

//       } catch {

//         console.log("ratings api error");

//       }

//     };

//     fetchRatings();

//   }, []);

//   /* ================= BOOKING ================= */

//   const handleConfirmBooking = () => {

//     let errors = {};

//     if (!customerName.trim()) errors.name = "Full name required";
//     if (!email.trim()) errors.email = "Email required";
//     if (!phone.trim()) errors.phone = "Phone required";
//     if (!checkIn) errors.checkIn = "Check-in required";
//     if (!checkOut) errors.checkOut = "Check-out required";

//     setDateError(errors);

//     if (Object.keys(errors).length > 0) return;

//     Swal.fire({
//       title: "🎉 Thank You for Booking!",
//       html: `
//       <h4>Your room has been successfully reserved.</h4>
//       <p>We look forward to hosting you! 🏨</p>
//       `,
//       icon: "success",
//       confirmButtonText: "Proceed to Payment",
//       confirmButtonColor: "#16a34a",
//       background: "#ffffff",
//       showClass: {
//         popup: "animate__animated animate__zoomIn"
//       }
//     }).then(() => {

//       setShowModal(false);

//       navigate("/payment", {
//         state: {
//           booking: {
//             room: selectedRoom.type,
//             price: selectedRoom.price,
//             checkIn,
//             checkOut
//           }
//         }
//       });

//     });

//   };

//   /* ================= WISHLIST ================= */

//   const toggleWishlist = (id) => {

//     const isAdded = wishlist.includes(id);

//     setWishlist((prev) =>
//       isAdded ? prev.filter((x) => x !== id) : [...prev, id]
//     );

//     if (!isAdded) {

//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "success",
//         title: "Added to Wishlist ❤️",
//         showConfirmButton: false,
//         timer: 1500
//       });

//     }

//   };

//   return (

//     <div className="container mt-4">

//       <h2 className="text-center mb-4 fw-bold">
//         Explore Our Luxury Rooms
//       </h2>

//       <div className="row g-4">

//         {rooms.map((room) => (

//           <div className="col-md-6 col-lg-4" key={room.id}>

//             <div className="hotel-card">

//               <div className="img-container">

//                 <img src={room.image} alt="room" />

//                 <button
//                   className={`wishlist-btn ${
//                     wishlist.includes(room.id) ? "active" : ""
//                   }`}
//                   onClick={() => toggleWishlist(room.id)}
//                 >
//                   {wishlist.includes(room.id) ? "❤️" : "🤍"}
//                 </button>

//                 <span className="rating-badge">
//                   ⭐ {ratings[room.id] || 8.5}
//                 </span>

//               </div>

//               <div className="card-body">

//                 <h5>{room.type}</h5>

//                 <h4 className="price">₹{room.price}</h4>

//                 <button
//                   className="view-btn"
//                   onClick={() => {
//                     setSelectedRoom(room);
//                     setShowModal(true);
//                   }}
//                 >
//                   View Deal
//                 </button>

//               </div>

//             </div>

//           </div>

//         ))}

//       </div>


//       {/* ================= BOOKING MODAL ================= */}

//       {showModal && (

//         <div className="modal show d-block modal-bg">

//           <div className="modal-dialog">

//             <div className="modal-content">

//               <div className="modal-header">

//                 <h5>Book {selectedRoom?.type}</h5>

//                 <button
//                   className="btn-close"
//                   onClick={() => setShowModal(false)}
//                 ></button>

//               </div>

//               <div className="modal-body">

//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   className="form-control mb-1"
//                   value={customerName}
//                   onChange={(e) => setCustomerName(e.target.value)}
//                 />
//                 <small className="text-danger">{dateError.name}</small>

//                 <input
//                   type="email"
//                   placeholder="Email"
//                   className="form-control mb-1"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <small className="text-danger">{dateError.email}</small>

//                 <input
//                   type="tel"
//                   placeholder="Phone"
//                   className="form-control mb-1"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                 />
//                 <small className="text-danger">{dateError.phone}</small>

//                 <input
//                   type="date"
//                   className="form-control mb-1"
//                   value={checkIn}
//                   onChange={(e) => setCheckIn(e.target.value)}
//                 />
//                 <small className="text-danger">{dateError.checkIn}</small>

//                 <input
//                   type="date"
//                   className="form-control"
//                   value={checkOut}
//                   onChange={(e) => setCheckOut(e.target.value)}
//                 />
//                 <small className="text-danger">{dateError.checkOut}</small>

//               </div>

//               <div className="modal-footer">

//                 <button
//                   className="btn btn-success"
//                   onClick={handleConfirmBooking}
//                 >
//                   Confirm Booking
//                 </button>

//               </div>

//             </div>

//           </div>

//         </div>

//       )}

//     </div>

//   );

// }

// export default Rooms;