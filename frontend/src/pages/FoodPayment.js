import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { processPayment, generateReceipt } from "../utils/paymentGateway";
import "./FoodPayment.css";

function FoodPayment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order;

  const [loading, setLoading] = useState(false);

  if (!order) {
    return (
      <div className="payment-page">
        <div className="payment-header">
          <h1>Food Order Payment</h1>
        </div>
        <div className="payment-container">
          <div className="empty-state">
            <h3>No Order Found</h3>
            <p>Please add items to your cart and try again</p>
            <button className="btn btn-primary" onClick={() => navigate("/restaurant")}>
              Back to Restaurant
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    setLoading(true);

    try {
      const paymentResult = await processPayment({
        amount: order.price,
        method: "wallet",
      });

      const paymentMethod = "Digital Wallet";
      const receipt = generateReceipt({
        amount: order.price,
        method: paymentMethod,
        email: order.email || "customer@example.com",
        description: `Food Order: ${order.name}`,
        transactionId: paymentResult.transactionId,
      });

      setLoading(false);

      Swal.fire({
        icon: "success",
        title: "Payment Successful! 🎉",
        html: `
          <div style="text-align: left;">
            <p><strong>Order:</strong> ${order.name}</p>
            <p><strong>Receipt Number:</strong> ${receipt.receiptNumber}</p>
            <p><strong>Transaction ID:</strong> ${paymentResult.transactionId}</p>
            <p><strong>Amount Paid:</strong> ₹${order.price}</p>
            <p><strong>Payment Method:</strong> ${paymentMethod}</p>
            <hr />
            <p style="font-size: 0.9em; color: #666;">Your order has been confirmed and will be prepared shortly.</p>
          </div>
        `,
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(() => {
        navigate("/restaurant");
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
        <h1>Food Order Payment</h1>
        <p>Complete your order payment securely</p>
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
                <h5>Secure Wallet Payment</h5>
                <p style={{ color: "#666", marginBottom: "18px" }}>
                  Only digital wallets are supported now. Choose your preferred wallet and complete checkout.
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
                `Pay ₹${order.price}`
              )}
            </button>
          </div>

          {/* ORDER SUMMARY */}
          <div className="summary-card">
            <h4>Order Summary</h4>

            <div className="order-item">
              <span className="item-name">{order.name}</span>
              <span className="item-price">₹{order.price}</span>
            </div>

            {order.description && (
              <p style={{ color: "#666", fontSize: "0.9rem", marginTop: "10px", marginBottom: "15px" }}>
                {order.description}
              </p>
            )}

            <div className="summary-subtotal">
              <span>Subtotal</span>
              <span>₹{order.price}</span>
            </div>

            <div className="summary-subtotal">
              <span>Delivery Fee</span>
              <span>₹0</span>
            </div>

            <div className="summary-subtotal">
              <span>Taxes & Fees</span>
              <span>₹0</span>
            </div>

            <div className="summary-total">
              <span>Total Amount</span>
              <span>₹{order.price}</span>
            </div>

            <div className="security-info">
              <span>🔒</span>
              <span>Your payment information is 100% secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodPayment;