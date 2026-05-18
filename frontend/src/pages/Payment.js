import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import axios from "../api/axios";
import { processPayment, generateReceipt } from "../utils/paymentGateway";
import "./Payment.css";

function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const booking = state?.booking;

  const [loading, setLoading] = useState(false);

  if (!booking) {
    return (
      <div className="payment-page">
        <div className="container mt-5 text-center">
          <h3>No booking found</h3>
          <button className="btn btn-primary mt-3" onClick={() => navigate("/rooms")}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const checkInDate = new Date(booking.checkIn);
  const checkOutDate = new Date(booking.checkOut);
  const nights = Math.max(1, Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)));
  const totalPrice = booking.totalPrice || booking.price * nights;

  const handlePayment = async () => {
    setLoading(true);
    const hasToken = !!localStorage.getItem("token");

    try {
      const paymentResult = await processPayment({
        amount: totalPrice,
        method: "wallet",
      });

      const paymentMethod = "Digital Wallet";
      const receipt = generateReceipt({
        amount: totalPrice,
        method: paymentMethod,
        email: booking.email,
        description: `Booking for ${booking.room}`,
        transactionId: paymentResult.transactionId,
      });

      const bookingData = {
        roomId: booking.roomId,
        name: booking.name,
        email: booking.email,
        guests: booking.guests || 1,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        paymentMethod: paymentMethod,
        transactionId: paymentResult.transactionId,
        receiptNumber: receipt.receiptNumber,
        totalPrice: totalPrice,
      };

      try {
        await axios.post("/bookings", bookingData);
      } catch (saveError) {
        console.warn("Booking save failed, storing offline:", saveError);
        const existingBookings = JSON.parse(localStorage.getItem("offlineBookings") || "[]");
        existingBookings.push(bookingData);
        localStorage.setItem("offlineBookings", JSON.stringify(existingBookings));
      }

      setLoading(false);

      Swal.fire({
        icon: "success",
        title: "Payment Successful! 🎉",
        html: `
          <div style="text-align: left;">
            <p><strong>Receipt Number:</strong> ${receipt.receiptNumber}</p>
            <p><strong>Transaction ID:</strong> ${paymentResult.transactionId}</p>
            <p><strong>Amount Paid:</strong> ₹${totalPrice}</p>
            <p><strong>Payment Method:</strong> ${paymentMethod}</p>
            <p><strong>Date & Time:</strong> ${receipt.date}</p>
            <hr />
            <p style="font-size: 0.9em; color: #666;">Your booking is confirmed. Thank you for using our digital wallet checkout.</p>
          </div>
        `,
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(() => {
        if (hasToken) {
          navigate("/my-bookings");
        } else {
          navigate("/rooms");
        }
      });
    } catch (err) {
      setLoading(false);
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: err?.message || "Payment could not be processed. Please try again.",
      });
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-header">
        <h1>Secure Checkout</h1>
        <p>Complete your hotel booking payment</p>
      </div>

      <div className="payment-container">
        <div className="payment-content">
          {/* PAYMENT FORM */}
          <div className="payment-card">
            <h3>Select Payment Method</h3>

            <div className="payment-method-container">
              <div className="payment-option active">
                <span>💼</span>
                <span>Digital Wallets</span>
              </div>

              <div className="payment-form-section">
                <h5>Secure Digital Wallet Checkout</h5>
                <p style={{ color: "#cbd5f5", marginBottom: "18px" }}>
                  Only digital wallet payments are supported now. Proceed with a fast and secure checkout.
                </p>
                <div className="wallet-options">
                  <button className="wallet-btn" type="button">Google Pay</button>
                  <button className="wallet-btn" type="button">PhonePe</button>
                  <button className="wallet-btn" type="button">Paytm</button>
                </div>
              </div>
            </div>

            <button
              className="pay-btn"
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? (
                <div className="pay-btn-loading">
                  <div className="spinner"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                `Pay ₹${totalPrice}`
              )}
            </button>
          </div>

          {/* BOOKING SUMMARY */}
          <div className="summary-card">
            <h4>Booking Summary</h4>

            <div className="summary-item">
              <span className="summary-item-label">Room Type</span>
              <span className="summary-item-value">{booking.room || booking.room_type}</span>
            </div>

            <div className="summary-item">
              <span className="summary-item-label">Guest Name</span>
              <span className="summary-item-value">{booking.name}</span>
            </div>

            <div className="summary-item">
              <span className="summary-item-label">Check-In</span>
              <span className="summary-item-value">{new Date(booking.checkIn).toLocaleDateString()}</span>
            </div>

            <div className="summary-item">
              <span className="summary-item-label">Check-Out</span>
              <span className="summary-item-value">{new Date(booking.checkOut).toLocaleDateString()}</span>
            </div>

            <div className="summary-item">
              <span className="summary-item-label">Number of Nights</span>
              <span className="summary-item-value">{nights}</span>
            </div>

            <div className="summary-subtotal">
              <span>Price per Night</span>
              <span>₹{booking.price}</span>
            </div>

            <div className="summary-subtotal">
              <span>Subtotal ({nights} nights)</span>
              <span>₹{(booking.price * nights).toLocaleString()}</span>
            </div>

            <div className="summary-subtotal">
              <span>Taxes & Fees</span>
              <span>₹0</span>
            </div>

            <div className="summary-total">
              <span>Total Amount</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>

            <div className="security-info">
              <span>🔒</span>
              <span>Your payment information is 100% secure and encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;