// import { NavLink, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import "./Admin.css";

// function AdminLayout({ children }) {
//   const navigate = useNavigate();
//   const [darkMode, setDarkMode] = useState(true);

//   const logout = () => {
//     localStorage.clear();
//     navigate("/admin/login");
//   };

//   const navStyle = ({ isActive }) =>
//     `admin-nav-link ${isActive ? "active-link" : ""}`;

//   return (
//     <div className="admin-container">

//       {/* SIDEBAR */}
//       <aside className="admin-sidebar">

//         <h2 className="admin-logo">👑 TAJ ADMIN</h2>

//         <button
//           onClick={() => setDarkMode(!darkMode)}
//           className="theme-toggle"
//         >
//           {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
//         </button>

//         <nav className="admin-nav">
//           <NavLink to="/admin/dashboard" className={navStyle}>
//             📊 Dashboard
//           </NavLink>

//           <NavLink to="/admin/users" className={navStyle}>
//             👤 Users
//           </NavLink>

//           <NavLink to="/admin/contact" className={navStyle}>
//             📩 Contact
//           </NavLink>

//           <NavLink to="/admin/bookings" className={navStyle}>
//             📅 Bookings
//           </NavLink>

//           <NavLink to="/admin/spa" className={navStyle}>
//             💆 Spa
//           </NavLink>

//           <NavLink to="/admin/restaurant" className={navStyle}>
//             🍽 Restaurant
//           </NavLink>
//         </nav>

//         <button onClick={logout} className="logout-btn">
//           🚪 Logout
//         </button>
//       </aside>

//       {/* MAIN */}
//       <main className="admin-main">

//         {/* TOPBAR */}
//         <div className="admin-topbar">
//           <h4>🏨 The Taj Hotel</h4>
//           <span>Welcome Admin 👋</span>
//         </div>

//         {/* CONTENT */}
//         <div className="admin-content">
//           {children}
//         </div>

//       </main>

//     </div>
//   );
// }

// export default AdminLayout;



import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Admin.css";

function AdminLayout({ children }) {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/admin/login");
  };

  const navStyle = ({ isActive }) =>
    `admin-nav-link ${isActive ? "active-link" : ""}`;

  return (
    <div className={`admin-container ${darkMode ? "dark" : "light"}`}>

      {/* SIDEBAR */}
      <aside className="admin-sidebar">

        <div className="logo-box">
          <h2>👑 TAJ ADMIN</h2>
          <p></p>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="theme-toggle"
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>

        <nav className="admin-nav">

          <NavLink to="/admin/dashboard" className={navStyle}>
            📊 Dashboard
          </NavLink>

          <NavLink to="/admin/users" className={navStyle}>
            👤 Users
          </NavLink>

          <NavLink to="/admin/contact" className={navStyle}>
            📩 Contact
          </NavLink>

          <NavLink to="/admin/bookings" className={navStyle}>
            📅 Bookings
          </NavLink>

          <NavLink to="/admin/spa" className={navStyle}>
            💆 Spa
          </NavLink>

          <NavLink to="/admin/restaurant" className={navStyle}>
            🍽 Restaurant
          </NavLink>

          <NavLink to="/admin/settings" className={navStyle}>
            ⚙️ Settings
          </NavLink>

        </nav>

        {/* USER PROFILE */}
        <div className="admin-user">
          <div className="avatar">👨‍💼</div>
          <div>
            <p>{user?.name || "Admin"}</p>
            <small>Administrator</small>
          </div>
        </div>

        <button onClick={logout} className="logout-btn">
          🚪 Logout
        </button>

      </aside>

      {/* MAIN */}
      <main className="admin-main">

        {/* TOPBAR */}
        <div className="admin-topbar">

          <div className="top-left">
            <h4>🏨 The Taj Hotel</h4>
            <p>Manage your luxury hotel ✨</p>
          </div>

          <div className="top-right">
            <span>Welcome {user?.name || "Admin"} 👋</span>
            <div className="avatar-small">👤</div>
          </div>

        </div>

        {/* CONTENT */}
        <div className="admin-content fade-in">
          {children}
        </div>

      </main>

    </div>
  );
}

export default AdminLayout;
