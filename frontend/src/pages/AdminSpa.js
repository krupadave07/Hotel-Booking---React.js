import axios from "axios";
import { useEffect, useState } from "react";

function AdminSpa() {
  const [spa, setSpa] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const fetchSpa = () => {
    axios
      .get("http://localhost:5000/api/spa")
      .then((res) => setSpa(Array.isArray(res.data) ? res.data : []))
      .catch(console.error);
  };

  useEffect(() => {
    fetchSpa();
  }, []);

  const changeStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/spa/${id}/status`, { status });
    fetchSpa();
  };

  const deleteSpa = async (id) => {
    if (!window.confirm("Delete spa booking?")) return;
    await axios.delete(`http://localhost:5000/api/spa/${id}`);
    fetchSpa();
  };

  const filtered = spa.filter((s) => {
    const matchSearch =
      s.service_name?.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      filter === "All" || s.status === filter;

    return matchSearch && matchStatus;
  });

  return (
    <div>
      <h2 className="mb-4">Spa Bookings</h2>

      <div className="d-flex gap-2 mb-3">
        <input
          className="form-control"
          placeholder="Search service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="form-select"
          style={{ width: 180 }}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Pending</option>
          <option>Confirmed</option>
        </select>
      </div>

      <div style={{ maxHeight: "500px", overflowY: "auto" }}>
        <table className="table bg-white shadow-sm">
          <thead className="table-dark sticky-top">
            <tr>
              <th>Service</th>
              <th>Date</th>
              <th>Status</th>
              <th style={{ width: "260px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((s) => (
              <tr key={s.id}>
                <td>{s.service_name}</td>
                <td>{s.booking_date}</td>

                <td>
                  <span
                    className={`badge rounded-pill px-3 ${
                      s.status === "Confirmed"
                        ? "bg-success"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>

                <td>
                  <button
                    className="btn btn-sm btn-success me-2 action-btn"
                    onClick={() => changeStatus(s.id, "Confirmed")}
                  >
                    Confirm
                  </button>

                  <button
                    className="btn btn-sm btn-secondary me-2 action-btn"
                    onClick={() => changeStatus(s.id, "Pending")}
                  >
                    Pending
                  </button>

                  <button
                    className="btn btn-sm btn-danger action-btn"
                    onClick={() => deleteSpa(s.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .action-btn { transition:0.2s; }
        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow:0 4px 10px rgba(0,0,0,.2);
        }
      `}</style>
    </div>
  );
}

export default AdminSpa;
