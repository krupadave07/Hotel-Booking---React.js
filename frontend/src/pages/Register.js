// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Register() {
//   const [form, setForm] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [serverMsg, setServerMsg] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });

//     // remove error while typing
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   /* ================= VALIDATION ================= */
//   const validate = () => {
//     let newErrors = {};

//     if (!form.username) {
//       newErrors.username = "Username is required";
//     } else if (form.username.length < 3) {
//       newErrors.username = "Minimum 3 characters";
//     }

//     if (!form.email) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(form.email)) {
//       newErrors.email = "Invalid email format";
//     }

//     if (!form.password) {
//       newErrors.password = "Password is required";
//     } else if (form.password.length < 6) {
//       newErrors.password = "Minimum 6 characters";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   /* ================= SUBMIT ================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setServerMsg("");

//     if (!validate()) return;

//     try {
//       setLoading(true);

//       await axios.post(
//         "http://localhost:5000/api/auth/register",
//         form
//       );

//       setServerMsg("✅ Registration successful!");

//       setTimeout(() => {
//         navigate("/login");
//       }, 1500);

//     } catch (err) {
//       setServerMsg(
//         err.response?.data?.message || "❌ Registration failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg,#667eea,#764ba2)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <div className="card p-4 shadow" style={{ width: 400 }}>
//         <h3 className="text-center mb-3">Create Account</h3>

//         {serverMsg && (
//           <div className="alert alert-info">{serverMsg}</div>
//         )}

//         <form onSubmit={handleSubmit} noValidate>

//           {/* USERNAME */}
//           <input
//             type="text"
//             name="username"
//             className={`form-control mb-1 ${
//               errors.username ? "border-danger" : ""
//             }`}
//             placeholder="Username"
//             value={form.username}
//             onChange={handleChange}
//           />
//           {errors.username && (
//             <small className="text-danger">{errors.username}</small>
//           )}

//           {/* EMAIL */}
//           <input
//             type="text"
//             name="email"
//             className={`form-control mt-3 mb-1 ${
//               errors.email ? "border-danger" : ""
//             }`}
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//           />
//           {errors.email && (
//             <small className="text-danger">{errors.email}</small>
//           )}

//           {/* PASSWORD */}
//           <input
//             type="password"
//             name="password"
//             className={`form-control mt-3 mb-1 ${
//               errors.password ? "border-danger" : ""
//             }`}
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//           />
//           {errors.password && (
//             <small className="text-danger">{errors.password}</small>
//           )}

//           <button
//             className="btn btn-primary w-100 mt-3"
//             disabled={loading}
//           >
//             {loading ? "Creating Account..." : "Register"}
//           </button>

//         </form>
//       </div>
//     </div>
//   );
// }

// export default Register;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

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

  /* ================= VALIDATION ================= */
  const validate = () => {
    let newErrors = {};

    if (!form.username) {
      newErrors.username = "Username is required";
    } else if (form.username.length < 3) {
      newErrors.username = "Minimum 3 characters";
    }

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Minimum 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMsg("");

    if (!validate()) return;

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );

      setServerMsg("✅ Registration successful!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setServerMsg(
        err.response?.data?.message || "❌ Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      <div className="register-card">

        <h2>Create Account</h2>

        {serverMsg && (
          <div className="alert alert-info">{serverMsg}</div>
        )}

        <form onSubmit={handleSubmit} noValidate>

          <div className="input-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className={errors.username ? "error" : ""}
            />
            {errors.username && <small>{errors.username}</small>}
          </div>

          <div className="input-group">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
            />
            {errors.email && <small>{errors.email}</small>}
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className={errors.password ? "error" : ""}
            />
            {errors.password && <small>{errors.password}</small>}
          </div>

          <button disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;