import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import "./Payment.css";

function Payment() {

  const { state } = useLocation();
  const navigate = useNavigate();
  const booking = state?.booking;

  const [method, setMethod] = useState("");

  if (!booking) {
    return (
      <div className="container mt-5 text-center">
        <h3>No booking found</h3>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/rooms")}
        >
          Go Back
        </button>
      </div>
    );
  }

  /* ================= PRICE CALCULATION ================= */

  const checkInDate = new Date(booking.checkIn);
  const checkOutDate = new Date(booking.checkOut);

  const nights = Math.ceil(
    (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
  );

  const totalPrice = booking.price * nights;

  /* ================= PAYMENT ================= */

  const handlePayment = () => {

    if (!method) {
      Swal.fire({
        icon: "warning",
        title: "Select Payment Method",
        text: "Please choose a payment method."
      });
      return;
    }

    Swal.fire({
      title: "Payment Successful 🎉",
      html: `
        <h4>Your booking is confirmed!</h4>
        <p><strong>Total Paid:</strong> ₹${totalPrice}</p>
        <p>Enjoy your stay 🏨</p>
      `,
      icon: "success",
      confirmButtonColor: "#16a34a",
      showClass: {
        popup: "animate__animated animate__zoomIn"
      }
    }).then(() => {
      navigate("/rooms");
    });

  };

  return (

    <div className="payment-page">

      <div className="container py-5">

        <div className="row g-4">

          {/* ================= PAYMENT METHODS ================= */}

          <div className="col-md-8">

            <div className="payment-card">

              <h3 className="mb-4">Choose Payment Method</h3>

              <div
                className={`payment-option ${method === "upi" ? "active" : ""}`}
                onClick={() => setMethod("upi")}
              >
                📱 UPI (Google Pay / PhonePe / Paytm)
              </div>

              <div
                className={`payment-option ${method === "card" ? "active" : ""}`}
                onClick={() => setMethod("card")}
              >
                💳 Credit / Debit Card
              </div>

              <div
                className={`payment-option ${method === "bank" ? "active" : ""}`}
                onClick={() => setMethod("bank")}
              >
                🏦 Net Banking
              </div>

              <button
                className="pay-btn mt-4"
                onClick={handlePayment}
              >
                Pay ₹{totalPrice}
              </button>

            </div>

          </div>


          {/* ================= BOOKING SUMMARY ================= */}

          <div className="col-md-4">

            <div className="summary-card">

              <h4 className="mb-3">Booking Summary</h4>

              <hr />

              <p><strong>Room:</strong> {booking.room}</p>

              <p><strong>Check In:</strong> {booking.checkIn}</p>

              <p><strong>Check Out:</strong> {booking.checkOut}</p>

              <p><strong>Price per Night:</strong> ₹{booking.price}</p>

              <p><strong>Total Nights:</strong> {nights}</p>

              <hr />

              <h3 className="total">
                Total ₹{totalPrice}
              </h3>

              <p className="secure">
                🔒 Secure Payment
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Payment;