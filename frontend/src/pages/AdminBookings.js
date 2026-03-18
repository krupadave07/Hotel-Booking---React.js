import axios from "axios";
import { useEffect, useState } from "react";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const fetchBookings = () => {
    axios
      .get("http://localhost:5000/api/bookings/all")
      .then((res) => setBookings(Array.isArray(res.data) ? res.data : []))
      .catch(console.error);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  /* ---------- STATUS UPDATE ---------- */
  const changeStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/bookings/${id}/status`,
        { status }
      );
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------- DELETE ---------- */
  const deleteBooking = async (id) => {
    if (!window.confirm("Delete booking?")) return;

    await axios.delete(`http://localhost:5000/api/bookings/${id}`);
    fetchBookings();
  };

  /* ---------- FILTER ---------- */
  const filtered = bookings.filter((b) => {
    const matchesSearch =
      b.room_type?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filter === "All" || b.status === filter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <h2 className="mb-4">Room Bookings</h2>

      {/* SEARCH + FILTER */}
      <div className="d-flex gap-2 mb-3">
        <input
          className="form-control"
          placeholder="Search room..."
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

      {/* TABLE */}
      <div style={{ maxHeight: "500px", overflowY: "auto" }}>
        <table className="table bg-white shadow-sm">
          <thead className="table-dark sticky-top">
            <tr>
              <th>Room</th>
              <th>Total</th>
              <th>Status</th>
              <th style={{ width: "260px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((b) => (
              <tr key={b.id}>
                <td>{b.room_type}</td>
                <td>₹{b.total}</td>

                {/* COLORED STATUS PILLS */}
                <td>
                  <span
                    className={`badge rounded-pill px-3 ${
                      b.status === "Confirmed"
                        ? "bg-success"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>

                {/* CLICKABLE ANIMATED BUTTONS */}
                <td>
                  <button
                    className="btn btn-sm btn-success me-2 action-btn"
                    onClick={() =>
                      changeStatus(b.id, "Confirmed")
                    }
                  >
                    Confirm
                  </button>

                  <button
                    className="btn btn-sm btn-secondary me-2 action-btn"
                    onClick={() =>
                      changeStatus(b.id, "Pending")
                    }
                  >
                    Pending
                  </button>

                  <button
                    className="btn btn-sm btn-danger action-btn"
                    onClick={() => deleteBooking(b.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* BUTTON ANIMATION */}
      <style>
        {`
          .action-btn {
            transition: all 0.2s ease;
          }
          .action-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
          }
        `}
      </style>
    </div>
  );
}

export default AdminBookings;
