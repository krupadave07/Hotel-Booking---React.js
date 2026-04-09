// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { motion } from "framer-motion";
// import "./Login.css";

// function Login() {

//   const [form, setForm] = useState({ email: "", password: "" });
//   const [errors, setErrors] = useState({});
//   const [serverError, setServerError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   const validate = () => {
//     let newErrors = {};

//     if (!form.email) newErrors.email = "Email required";
//     else if (!/\S+@\S+\.\S+/.test(form.email))
//       newErrors.email = "Invalid email";

//     if (!form.password) newErrors.password = "Password required";
//     else if (form.password.length < 5)
//       newErrors.password = "Min 5 characters";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     Swal.fire("Welcome 🎉", "Login Successful", "success")
//       .then(() => navigate("/rooms"));
//   };

//   return (

//     <div className="login-page">

//       {/* CENTER CARD */}
//       <motion.div
//         className="login-card"
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//       >

//         <h2>Welcome Back </h2>
//         <p className="subtitle">Login to continue your luxury journey</p>

//         {serverError && <div className="error-box">{serverError}</div>}

//         <form onSubmit={handleSubmit}>

//           <input
//             type="text"
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//           />
//           {errors.email && <small>{errors.email}</small>}

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//           />
//           {errors.password && <small>{errors.password}</small>}

//           <button disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>

//         </form>

//       </motion.div>

//       {/* FOOTER */}
//       <footer className="login-footer">
//         © 2026 The Taj Hotel
//       </footer>

//     </div>

//   );
// }

// export default Login;


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { motion } from "framer-motion";
// import "./Login.css";

// function Login() {

//   const [form, setForm] = useState({ email: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const [remember, setRemember] = useState(false);
//   const [errors, setErrors] = useState({});

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const validate = () => {
//     let err = {};
//     if (!form.email) err.email = "Email required";
//     if (!form.password) err.password = "Password required";
//     setErrors(err);
//     return Object.keys(err).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     if (remember) {
//       localStorage.setItem("userEmail", form.email);
//     }

//     Swal.fire("Welcome 🎉", "Login Successful", "success")
//       .then(() => navigate("/rooms"));
//   };

//   return (

//     <div className="login-page">

//       <motion.div
//         className="login-card"
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//       >

//         <h2>Welcome Back 👋</h2>

//         <form onSubmit={handleSubmit}>

//           {/* EMAIL */}
//           <input
//             type="text"
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//           />
//           {errors.email && <small>{errors.email}</small>}

//           {/* PASSWORD */}
//           <div className="password-box">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={handleChange}
//             />
//             <span onClick={() => setShowPassword(!showPassword)}>
//               {showPassword ? "🙈" : "👁"}
//             </span>
//           </div>
//           {errors.password && <small>{errors.password}</small>}

//           {/* REMEMBER + FORGOT */}
//           <div className="login-options">
//             <label>
//               <input
//                 type="checkbox"
//                 onChange={(e) => setRemember(e.target.checked)}
//               />
//               Remember Me
//             </label>

//             <span onClick={() => navigate("/forgot-password")}>
//               Forgot?
//             </span>
//           </div>

//           {/* LOGIN BUTTON */}
//           <button>Login</button>

//           {/* GOOGLE LOGIN */}
//           <button
//             type="button"
//             className="google-btn"
//             onClick={() => Swal.fire("Google Login Coming Soon 🚀")}
//           >
//             Continue with Google 🌐
//           </button>

//         </form>

//       </motion.div>

//     </div>
//   );
// }

// export default Login;



import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  /* ================= AUTO FILL EMAIL ================= */
  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
  
  }, []);

  /* ================= AUTO REDIRECT ================= */


  /* ================= INPUT ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  /* ================= VALIDATION ================= */
  const validate = () => {
    let err = {};

    if (!form.email) {
      err.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      err.email = "Invalid email";
    }

    if (!form.password) {
      err.password = "Password is required";
    } else if (form.password.length < 5) {
      err.password = "Minimum 5 characters";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  /* ================= LOGIN ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    /* FORMAT NAME */
    const userName = form.email.split("@")[0];
    const formattedName =
      userName.charAt(0).toUpperCase() + userName.slice(1);

    /* SAVE DATA */
    localStorage.setItem("token", "userLoggedIn");

    localStorage.setItem(
      "user",
      JSON.stringify({
        name: formattedName,
        email: form.email
      })
    );

    if (remember) {
      localStorage.setItem("userEmail", form.email);
    } else {
      localStorage.removeItem("userEmail");
    }

    /* SUCCESS */
    Swal.fire({
      title: `Welcome ${formattedName} 👋`,
      html: `
        <h4>Login Successful</h4>
        <p>Enjoy your stay at Taj Hotel 🏨</p>
      `,
      icon: "success",
      confirmButtonColor: "#16a34a",
      showClass: {
        popup: "animate__animated animate__zoomIn"
      }
    }).then(() => {
      navigate("/rooms"); // 🔥 FIXED REDIRECT
    });
  };

  return (

    <div className="login-page">

      <div className="login-card">

        <h2>Welcome Back 👋</h2>

        <p className="subtitle">Login to continue your luxury journey</p>

        <form onSubmit={handleSubmit}>

          {/* EMAIL */}
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? "error" : ""}
          />
          {errors.email && <small>{errors.email}</small>}

          {/* PASSWORD */}
          <div className="password-box">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className={errors.password ? "error" : ""}
            />

            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "🙈" : "👁"}
            </span>

          </div>

          {errors.password && <small>{errors.password}</small>}

          {/* REMEMBER + FORGOT */}
          <div className="login-options">

            <label>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span>Remember Me</span>
            </label>

            <span onClick={() => navigate("/forgot-password")}>
              Forgot?
            </span>

          </div>

          {/* LOGIN BUTTON */}
          <button type="submit">
            Login
          </button>

          {/* GOOGLE BUTTON */}
          <button
            type="button"
            className="google-btn"
            onClick={() =>
              Swal.fire("Google Login Coming Soon 🚀")
            }
          >
            Continue with Google 🌐
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;