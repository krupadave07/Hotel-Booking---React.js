import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, [location.pathname]);

  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/");
  };

  const navStyle = ({ isActive }) =>
    `nav-link px-3 fw-semibold ${
      isActive ? "text-warning border-bottom border-warning" : "text-light"
    }`;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow-sm"
      style={{
        background: "linear-gradient(90deg, #111827, #1f2937)",
        padding: "14px 40px"
      }}
    >
      <NavLink className="navbar-brand fw-bold fs-4 text-warning" to="/">
        The TAJ
      </NavLink>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarContent">
        
        {/* CENTER MENU */}
        <div className="navbar-nav mx-auto">
          <NavLink to="/" className={navStyle}>Home</NavLink>
          <NavLink to="/rooms" className={navStyle}>Rooms</NavLink>
          <NavLink to="/restaurant" className={navStyle}>Restaurant</NavLink>
          <NavLink to="/spa" className={navStyle}>Spa</NavLink>
          <NavLink to="/contact" className={navStyle}>Contact</NavLink>
        </div>

        {/* RIGHT SIDE */}
        <div className="d-flex align-items-center gap-3">
          {user && (
            <span className="text-light fw-semibold">
              Hello, {user.name || "User"} 👋
            </span>
          )}

          {user ? (
            <button
              className="btn btn-outline-warning btn-sm px-3"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/login" className="btn btn-outline-light btn-sm px-3">
                Login
              </NavLink>
              <NavLink to="/register" className="btn btn-warning btn-sm px-3">
                Register
              </NavLink>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
