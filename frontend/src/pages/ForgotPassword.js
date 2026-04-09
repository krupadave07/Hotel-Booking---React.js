import React, { useState } from "react";
import Swal from "sweetalert2";
import "./Login.css";

function ForgotPassword() {

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire(
      "Reset Link Sent 📩",
      "Check your email for reset password",
      "success"
    );
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h2>Forgot Password</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button>Send Reset Link</button>

        </form>

      </div>

    </div>
  );
}

export default ForgotPassword;