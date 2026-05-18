import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Login.css";

const API_URL = "http://localhost:5000/api/auth";

function ForgotPassword() {
  const [step, setStep] = useState("request");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      Swal.fire("Email required", "Please enter your email.", "warning");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const text = await res.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = { message: text };
      }

      if (!res.ok) {
        Swal.fire("Error ❌", data.message || "Unable to send OTP.", "error");
        setLoading(false);
        return;
      }

      if (data.previewUrl) {
        Swal.fire({
          title: "OTP Sent ✅",
          html: `OTP sent to your email.<br/><a href="${data.previewUrl}" target="_blank">Open preview email</a>`,
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire("OTP Sent ✅", data.message, "success");
      }
      setStep("verify");
    } catch (err) {
      console.error("Forgot password error:", err);
      Swal.fire("Server error ❌", err.message || "Unable to send the reset OTP.", "error");
    }

    setLoading(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      Swal.fire("OTP required", "Please enter the OTP sent to your email.", "warning");
      return;
    }

    if (!newPassword.trim()) {
      Swal.fire("Password required", "Please enter your new password.", "warning");
      return;
    }

    if (newPassword.length < 5) {
      Swal.fire("Weak password", "Password must be at least 5 characters.", "warning");
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire("Mismatch", "New password and confirm password must match.", "warning");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          otp: otp.trim(),
          newPassword: newPassword.trim(),
        }),
      });

      const text = await res.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = { message: text };
      }

      if (!res.ok) {
        Swal.fire("Error ❌", data.message || "Unable to reset password.", "error");
        setLoading(false);
        return;
      }

      Swal.fire("Password Reset ✅", data.message, "success").then(() => {
        navigate("/login");
      });
    } catch (err) {
      console.error("Reset password error:", err);
      Swal.fire("Server error ❌", err.message || "Unable to reset the password.", "error");
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Forgot Password</h2>
        {step === "request" ? (
          <form onSubmit={handleSendOtp}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <p className="subtitle">
              Enter the OTP we sent to <strong>{email}</strong> and set a new password.
            </p>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
            <button
              type="button"
              className="secondary-button"
              onClick={() => setStep("request")}
            >
              Change email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;