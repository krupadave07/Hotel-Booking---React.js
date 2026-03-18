// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [errors, setErrors] = useState({});
//   const [serverError, setServerError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });

//     // remove error when typing
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   /* ================= VALIDATION ================= */
//   const validate = () => {
//     let newErrors = {};

//     // Email validation
//     if (!form.email) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(form.email)) {
//       newErrors.email = "Invalid email format";
//     }

//     // Password validation
//     if (!form.password) {
//       newErrors.password = "Password is required";
//     } else if (form.password.length < 5) {
//       newErrors.password = "Password must be at least 5 characters";
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   /* ================= SUBMIT ================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validate()) return; // ❌ stop if invalid

//     setLoading(true);
//     setServerError("");

//     try {
//       const res = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//      const data = await res.json();
// console.log("LOGIN RESPONSE:", data);

//       if (!res.ok) {
//         setServerError(data.message || "Login failed");
//         setLoading(false);
//         return;
//       }

//       // ✅ Save token
//       localStorage.setItem("token", data.token);

//       const displayUser = {
//         name:
//           data.user?.name ||
//           data.user?.username ||
//           data.user?.fullName ||
//           data.user?.email?.split("@")[0],
//         email: data.user?.email,
//         id: data.user?.id,
//       };

//       localStorage.setItem("user", JSON.stringify(displayUser));

//       navigate("/rooms");
//     } catch {
//       setServerError("Server error");
//     }

//     setLoading(false);
//   };

// return (
//   <div
//     style={{
//       minHeight: "100vh",
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "space-between",
//       background: "linear-gradient(135deg, #ffffff, #fff)",
//     }}
//   >
//     {/* CENTER CONTENT */}
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         flex: 1,
//       }}
//     >
//       <div className="card shadow-lg p-4 rounded-4" style={{ width: 400 }}>
//         <h3 className="text-center fw-bold">Welcome Back</h3>
//         <p className="text-center text-muted">Login to continue</p>

//         {serverError && (
//           <div className="alert alert-danger">{serverError}</div>
//         )}

//         <form onSubmit={handleSubmit} noValidate>
//           {/* EMAIL */}
//           <input
//             className={`form-control mb-1 ${
//               errors.email ? "border-danger" : ""
//             }`}
//             name="email"
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
//             className={`form-control mt-3 mb-1 ${
//               errors.password ? "border-danger" : ""
//             }`}
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//           />
//           {errors.password && (
//             <small className="text-danger">{errors.password}</small>
//           )}

//           <button
//             className="btn btn-dark w-100 rounded-pill mt-3"
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//       </div>
//     </div>

//     {/* FOOTER */}
//     <footer className="bg-dark text-white text-center p-3">
//       &copy; 2026 The Taj Hotel.
//     </footer>
//   </div>
// );
// }

// export default Login;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Login.css";

function Login() {

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {

    setForm({ ...form, [e.target.name]: e.target.value });

    setErrors({ ...errors, [e.target.name]: "" });

  };

  /* ================= VALIDATION ================= */

  const validate = () => {

    let newErrors = {};

    if (!form.email) {
      newErrors.email = "Email is required";
    } 
    else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } 
    else if (form.password.length < 5) {
      newErrors.password = "Password must be at least 5 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setServerError("");

    try {

      const res = await fetch("http://localhost:5000/api/auth/login", {

        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(form),

      });

      const data = await res.json();

      if (!res.ok) {

        setServerError(data.message || "Login failed");

        setLoading(false);

        return;

      }

      /* SAVE TOKEN */

      localStorage.setItem("token", data.token);

      const displayUser = {

        name:
          data.user?.name ||
          data.user?.username ||
          data.user?.email?.split("@")[0],

        email: data.user?.email,

        id: data.user?.id,

      };

      localStorage.setItem("user", JSON.stringify(displayUser));

      /* WELCOME MESSAGE */

      Swal.fire({

        title: `Welcome ${displayUser.name}! 🎉`,

        html: `
        <h3>Welcome to The Taj Hotel</h3>
        <p>Your luxury stay begins here 🏨</p>
        `,

        icon: "success",

        confirmButtonColor: "#16a34a",

        showClass: {
          popup: "animate__animated animate__zoomIn"
        }

      }).then(() => {

        navigate("/rooms");

      });

    } catch {

      setServerError("Server error");

    }

    setLoading(false);

  };

  return (

    <div className="login-page">

      {/* SLIDE WELCOME TEXT */}

      <div className="welcome-banner">

        <h1>Welcome To The Taj Hotel</h1>

        <p>Experience Luxury & Comfort</p>

      </div>


      {/* LOGIN CARD */}

      <div className="login-card">

        <h2>Welcome Back</h2>

        <p className="subtitle">Login to continue</p>

        {serverError && (

          <div className="alert alert-danger">

            {serverError}

          </div>

        )}

        <form onSubmit={handleSubmit}>

          <input

            type="text"

            name="email"

            placeholder="Email"

            value={form.email}

            onChange={handleChange}

            className={errors.email ? "error" : ""}

          />

          {errors.email && <small>{errors.email}</small>}


          <input

            type="password"

            name="password"

            placeholder="Password"

            value={form.password}

            onChange={handleChange}

            className={errors.password ? "error" : ""}

          />

          {errors.password && <small>{errors.password}</small>}


          <button disabled={loading}>

            {loading ? "Logging in..." : "Login"}

          </button>

        </form>

      </div>


      <footer>

        © 2026 The Taj Hotel

      </footer>

    </div>

  );

}

export default Login;