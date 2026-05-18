import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import CountUp from "react-countup";
import "./AdminDashboard.css";

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

  /* ================= LOADING ================= */
  if (!data) {
    return (
      <div className="admin-dashboard">
        <h3 className="text-center">Loading Dashboard...</h3>
      </div>
    );
  }

  /* ================= CARDS ================= */
  const cards = [
    { title: "Users", value: data.totalUsers, icon: "👤" },
    { title: "Bookings", value: data.totalBookings, icon: "📅" },
    { title: "Spa", value: data.spaBookings, icon: "💆" },
    { title: "Orders", value: data.restaurantOrders, icon: "🍽" },
    { title: "Messages", value: data.contacts, icon: "📩" },
  ];

  /* ================= CHART ================= */
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [1200, 1900, 800, 2400, 1800, 1500],
        backgroundColor: "#6366f1",
        borderRadius: 10,
      },
    ],
  };

  return (
    <div className="admin-dashboard">

      {/* HEADER */}
      <div className="admin-header">
        <div>
          <h3>Welcome Admin 👋</h3>
          <p>Manage your hotel with luxury control</p>
        </div>

        <button className="download-btn">
          ⬇ Download Report
        </button>
      </div>

      {/* CARDS */}
      <div className="row g-4 mt-3">
        {cards.map((card, i) => (
          <div className="col-md-4 col-lg-3" key={i}>
            <div className="admin-card">

              <div className="d-flex justify-content-between">
                <div>
                  <h6>{card.title}</h6>
                  <h3>
                    <CountUp end={card.value || 0} duration={1.5} />
                  </h3>
                </div>

                <div className="admin-icon">
                  {card.icon}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* CHART + CALENDAR */}
      <div className="row mt-4">

        <div className="col-lg-8 mb-4">
          <div className="chart-box">
            <h5>📊 Revenue Statistics</h5>
            <Bar data={chartData} />
          </div>
        </div>

        <div className="col-lg-4 mb-4">
          <div className="calendar-box text-center">

            <h5>📅 Booking Schedule</h5>

            <input type="date" className="form-control mt-3" />

            <div className="alert alert-info mt-3">
              Today Check-ins: <strong>{data.todayCheckins || 0}</strong>
            </div>

          </div>
        </div>

      </div>

      {/* TABLE */}
      <div className="table-box mt-4">

        <h5>📋 Recent Bookings</h5>

        <div className="table-responsive">
          <table className="table table-hover">

            <thead>
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
                      <span className="badge">Completed</span>
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