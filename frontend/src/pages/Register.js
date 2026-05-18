import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";   // ✅ ADD THIS
import "./Register.css";
import { motion } from "framer-motion";

function Register() {

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverMsg, setServerMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.username) newErrors.username = "Required";
    if (!form.email) newErrors.email = "Required";
    if (!form.password) newErrors.password = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validate()) return;

  //   Swal.fire("Success 🎉", "Account Created", "success");

  //   setTimeout(() => navigate("/login"), 1000);
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  setLoading(true);
  setServerMsg("");

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      form
    );

    Swal.fire({
      title: "Success 🎉",
      text: res.data.message || "Account Created Successfully",
      icon: "success",
      confirmButtonColor: "#16a34a"
    });

    // redirect after success
    setTimeout(() => {
      navigate("/login");
    }, 1200);

  } catch (err) {
    console.error(err);

    const msg =
      err.response?.data?.message || "Registration failed";

    setServerMsg(msg);

    Swal.fire("Error ❌", msg, "error");
  }

  setLoading(false);
};

  return (
    <div className="register-page">

      {/* LEFT CONTENT */}
      <div className="register-left">

        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Welcome to Taj Luxury Hotel
        </motion.h1>

        <p>
          Experience premium comfort, world-class service, and unforgettable
          hospitality. Create your account and begin your luxury journey today 
        </p>

      </div>

      {/* RIGHT FORM */}
      <motion.div
        className="register-card"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
      >

        <h2>Create Account</h2>

        {serverMsg && <p>{serverMsg}</p>}

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
          {errors.username && <small>{errors.username}</small>}

          <input
            type="text"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <small>{errors.email}</small>}

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <small>{errors.password}</small>}

          <button disabled={loading}>
            {loading ? "Loading..." : "Register"}
          </button>

        </form>

      </motion.div>

    </div>
  );
}

export default Register;