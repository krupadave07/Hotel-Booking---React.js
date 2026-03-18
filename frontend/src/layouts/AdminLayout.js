import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

function AdminLayout({ children }) {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);

  const logout = () => {
    localStorage.clear();
    navigate("/admin/login");
  };

  const navStyle = ({ isActive }) =>
    `nav-link px-3 py-2 rounded fw-semibold ${
      isActive
        ? "bg-danger text-white shadow"
        : darkMode
        ? "text-light"
        : "text-dark"
    }`;

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <aside
        className="p-4 d-flex flex-column shadow-lg"
        style={{
          width: "260px",
          background: darkMode ? "#0f172a" : "#fff",
          transition: "0.3s",
        }}
      >
        <h2> The Taj Hotel Admin</h2>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="btn btn-sm btn-outline-secondary mb-4"
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>

        <div className="nav flex-column gap-2">
         <NavLink to="/admin/dashboard" className={navStyle}>
           Dashboard
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
        </div>

        <div className="mt-auto">
          <button
            onClick={logout}
            className="btn btn-outline-danger w-100"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main
        className="flex-grow-1 p-4"
        style={{
          background: darkMode ? "#111827" : "#f4f6f9",
          color: darkMode ? "#fff" : "#111",
        }}
      >
        {/* TOP BAR */}
        <div
          className="p-3 mb-4 rounded shadow-sm d-flex justify-content-between align-items-center"
          style={{
            background: darkMode ? "#1e293b" : "#fff",
          }}
        >
          <h5 className="mb-0 fw-bold">The Taj Hotel</h5>
          <span className="text-muted">Welcome Admin 👋</span>
        </div>

        {children}
      </main>
    </div>
  );
}

export default AdminLayout;
