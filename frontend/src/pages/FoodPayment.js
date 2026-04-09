import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import "./FoodPayment.css";

function FoodPayment() {

  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order;

  const [method, setMethod] = useState("");

  if (!order) return <h3>No Order Found</h3>;

  const handlePayment = () => {

    if (!method) {
      Swal.fire("Select Payment Method", "", "warning");
      return;
    }

    Swal.fire({
      title: "Payment Successful 🎉",
      text: `${order.name} ordered successfully`,
      icon: "success"
    }).then(() => {
      navigate("/restaurant");
    });
  };

  return (
    <div className="payment-page">

      <div className="container py-5">
        <div className="row">

          <div className="col-md-6">
            <div className="payment-card">

              <h3>Select Payment</h3>

              <div className={`option ${method==="upi" && "active"}`} onClick={()=>setMethod("upi")}>
                📱 UPI
              </div>

              <div className={`option ${method==="card" && "active"}`} onClick={()=>setMethod("card")}>
                💳 Card
              </div>

              <button className="pay-btn" onClick={handlePayment}>
                Pay ₹{order.price}
              </button>

            </div>
          </div>

          <div className="col-md-6">
            <div className="summary-card">

              <h4>Order Summary</h4>
              <p>{order.name}</p>
              <p>₹{order.price}</p>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default FoodPayment;