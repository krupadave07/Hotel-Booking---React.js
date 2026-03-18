import { NavLink, useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/admin/login");
  };

  const navStyle = ({ isActive }) =>
    `nav-link px-3 fw-semibold ${
      isActive ? "text-danger border-bottom border-danger" : "text-light"
    }`;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black shadow-sm"
      style={{ padding: "14px 40px" }}
    >
      <span className="navbar-brand text-danger fw-bold fs-4">
        Admin Panel
      </span>

      <div className="navbar-nav mx-auto">
        <NavLink to="/admin/dashboard" className={navStyle}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/rooms" className={navStyle}>
          Rooms
        </NavLink>
        <NavLink to="/admin/bookings" className={navStyle}>
          Bookings
        </NavLink>
        <NavLink to="/admin/spa" className={navStyle}>
          Spa
        </NavLink>
        <NavLink to="/admin/restaurant" className={navStyle}>
          Restaurant
        </NavLink>
      </div>

      <button
        className="btn btn-outline-danger btn-sm px-3"
        onClick={logout}
      >
        Logout
      </button>
    </nav>
  );
}

export default AdminNavbar;
