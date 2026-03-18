import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import CountUp from "react-countup";

function AdminDashboard() {
  const [data, setData] = useState(null);

  const fetchDashboard = () => {
    axios
      .get("http://localhost:5000/api/admin/dashboard")
      .then((res) => setData(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchDashboard();
    const interval = setInterval(fetchDashboard, 15000);
    return () => clearInterval(interval);
  }, []);

  /* ================= LOADING UI ================= */
if (!data) {

  const loadingCards = [
    
    { title: "Rooms Booking", color: "primary", icon: "🏨" },
    { title: "Contacts", color: "danger", icon: "📩" },
    { title: "Restaurant", color: "warning", icon: "🍽" },
    { title: "Spa", color: "success", icon: "💆" },
  ];

  return (
    <div className="container-fluid p-4 bg-light min-vh-100">

      <h3 className="fw-bold mb-4">Loading Dashboard...</h3>

      <div className="row g-4">
        {loadingCards.map((card, i) => (
          <div className="col-lg-3 col-md-6" key={i}>
            <div className="p-4 bg-white rounded shadow-sm">

              <div className="d-flex justify-content-between align-items-center">
                <h6 className="text-muted mb-0">
                  {card.icon} {card.title}
                </h6>
              </div>

              <h3 className="fw-bold text-secondary mt-2">
                <CountUp end={Math.floor(Math.random() * 1000)} duration={1.5} />
              </h3>

              <div className="progress mt-3" style={{ height: "8px" }}>
                <div
                  className={`progress-bar bg-${card.color} progress-bar-striped progress-bar-animated`}
                  style={{ width: `${60 + Math.random() * 30}%` }}
                ></div>
              </div>

              <small className="text-muted">Fetching data...</small>

            </div>
          </div>
        ))}
      </div>

      {/* Analytics Loading */}
      <div className="mt-4 bg-white p-4 rounded shadow-sm">
        <h5 className="fw-bold">Loading Analytics...</h5>

        <div className="progress mt-3" style={{ height: "10px" }}>
          <div
            className="progress-bar progress-bar-striped progress-bar-animated bg-info"
            style={{ width: "85%" }}
          ></div>
        </div>

        <small className="text-muted">Preparing reports...</small>
      </div>

    </div>
  );
}

  /* ================= CARDS ================= */
 const cards = [
  {
    title: "Total Users",
    value: data?.totalUsers || 0,
    color: "#06b6d4",
    icon: "👤",
  },
  {
    title: "Total Bookings",
    value: data?.totalBookings || 0,
    color: "#4f46e5",
    icon: "📅",
  },
  {
    title: "Spa Bookings",
    value: data?.spaBookings || 0,
    color: "#10b981",
    icon: "💆",
  },
  {
    title: "Restaurant Orders",
    value: data?.restaurantOrders || 0,
    color: "#f59e0b",
    icon: "🍽",
  },
  {
    title: "Messages",
    value: data?.contacts || 0,
    color: "#ef4444",
    icon: "📩",
  },
];
  /* ================= CHART ================= */
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [1200, 1900, 800, 2400, 1800, 1500],
        backgroundColor: "#4f46e5",
        borderRadius: 10,
      },
    ],
  };

  return (
    <div className="container-fluid p-4 bg-light min-vh-100">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold">Welcome, Admin 👋</h3>
          <p className="text-muted mb-0">
            Manage your hotel bookings easily
          </p>
        </div>

        <button className="btn btn-primary">
          ⬇ Download Report
        </button>
      </div>

      {/* ===== CARDS ===== */}
      <div className="row g-4">
        {cards.map((card, i) => (
          <div className="col-lg-3 col-md-6" key={i}>
            <div
              className="p-4 bg-white rounded shadow-sm"
              style={{ borderLeft: `5px solid ${card.color}` }}
            >
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="text-muted">{card.title}</h6>

                  <h3 className="fw-bold">
                    <CountUp end={card.value} duration={1.5} />
                  </h3>

                  <small className="text-muted">Updated today</small>
                </div>

                <div style={{ fontSize: "28px" }}>
                  {card.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== CHART + CALENDAR ===== */}
      <div className="row mt-4">

        {/* CHART */}
        <div className="col-lg-8 mb-4">
          <div className="bg-white p-4 rounded shadow-sm">
            <h5 className="fw-bold mb-3">📊 Revenue Statistics</h5>
            <Bar data={chartData} />
          </div>
        </div>

        {/* CALENDAR */}
        <div className="col-lg-4 mb-4">
          <div className="bg-white p-4 rounded shadow-sm text-center">
            <h5 className="fw-bold mb-3">📅 Booking Schedule</h5>

            <input type="date" className="form-control mb-3" />

            <div className="alert alert-info">
              Today Check-ins: <strong>{data.todayCheckins || 0}</strong>
            </div>
          </div>
        </div>

      </div>

      {/* ===== BOOKINGS TABLE ===== */}
      <div className="bg-white p-4 rounded shadow-sm">
        <h5 className="fw-bold mb-3">📋 Recent Bookings</h5>

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Room</th>
                <th>Check In</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {data.recentBookings?.length > 0 ? (
                data.recentBookings.map((b, i) => (
                  <tr key={i}>
                    <td>{b.room_type}</td>
                    <td>{b.check_in}</td>
                    <td>
                      <span className="badge bg-success">
                        Completed
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    No bookings yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default AdminDashboard;