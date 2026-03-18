import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [shake, setShake] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    // remove error while typing
    setErrors({ ...errors, [e.target.name]: "" });
  };

  /* ================= VALIDATION ================= */
  const validate = () => {
    let newErrors = {};

    if (!form.username) {
      newErrors.username = "Username is required";
    } else if (form.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 5) {
      newErrors.password = "Password must be at least 5 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    setServerError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        form
      );

      if (remember) {
        localStorage.setItem("adminToken", res.data.token);
        localStorage.setItem("admin", JSON.stringify(res.data.admin));
      } else {
        sessionStorage.setItem("adminToken", res.data.token);
      }

      navigate("/admin/dashboard");
    } catch (err) {
      setServerError(err.response?.data?.message || "Login failed");

      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="particles"></div>

      <div className={`login-card ${shake ? "shake" : ""}`}>
        <div className="logo">🏨</div>

        <h2 className="mb-2">Hotel Admin</h2>
        <p className="text-light mb-4">Login to manage your hotel</p>

        {serverError && (
          <div className="alert alert-danger py-2">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>

          {/* USERNAME */}
          <input
            type="text"
            name="username"
            className={`form-control mb-1 ${
              errors.username ? "border-danger" : ""
            }`}
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />
          {errors.username && (
            <small className="text-danger">{errors.username}</small>
          )}

          {/* PASSWORD */}
          <div className="position-relative mt-3 mb-1">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className={`form-control ${
                errors.password ? "border-danger" : ""
              }`}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </span>
          </div>
          {errors.password && (
            <small className="text-danger">{errors.password}</small>
          )}

          {/* REMEMBER */}
          <div className="form-check text-start mt-3 mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
              id="remember"
            />
            <label className="form-check-label text-light">
              Remember me
            </label>
          </div>

          <button
            className="btn login-btn w-100"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>

      {/* CSS */}
      <style>{`
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  /* Light gradient background */
  background: linear-gradient(135deg, #f8fafc, #e2e8f0, #cbd5f5);

  overflow: hidden;
  position: relative;
}

/* subtle pattern */
.particles::before {
  content: "";
  position: absolute;
  width: 200%;
  height: 200%;
  background-image:
    radial-gradient(circle, rgba(0,0,0,0.05) 2px, transparent 2px);
  background-size: 60px 60px;
  animation: moveParticles 30s linear infinite;
}

@keyframes moveParticles {
  from { transform: translate(0,0); }
  to { transform: translate(-200px,-200px); }
}

/* CARD */
.login-card {
  width: 420px;
  padding: 35px;
  border-radius: 18px;

  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(10px);

  box-shadow: 0 10px 30px rgba(0,0,0,0.1);

  text-align: center;
  color: #1e293b;
  z-index: 2;
}

/* LOGO */
.logo {
  font-size: 50px;
  animation: float 3s ease-in-out infinite;
}

/* FLOAT ANIMATION */
@keyframes float {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* BUTTON */
.login-btn {
  background: linear-gradient(90deg, #2563eb, #3b82f6);
  color: #fff;
  font-weight: 600;
  border-radius: 10px;
  padding: 10px;
  border: none;
  transition: 0.3s;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(0,0,0,0.15);
}

/* INPUT */
.form-control {
  border-radius: 10px;
  border: 1px solid #d1d5db;
  padding: 10px;
  transition: 0.2s;
}

.form-control:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59,130,246,0.2);
}

/* ERROR BORDER */
.border-danger {
  border: 1px solid #ef4444 !important;
}

/* ERROR TEXT */
.text-danger {
  font-size: 13px;
}

/* EYE ICON */
.eye-icon {
  position: absolute;
  right: 12px;
  top: 8px;
  cursor: pointer;
  font-size: 18px;
}

/* SHAKE */
.shake {
  animation: shake 0.4s;
}

@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-6px); }
  50% { transform: translateX(6px); }
  75% { transform: translateX(-6px); }
  100% { transform: translateX(0); }
}
      `}</style>
    </div>
  );
}

export default AdminLogin;