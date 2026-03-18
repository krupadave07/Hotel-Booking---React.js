import axios from "axios";
import { useEffect, useState } from "react";

function AdminRestaurant() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const fetchOrders = () => {
    axios
      .get("http://localhost:5000/api/restaurant")
      .then((res) => setOrders(Array.isArray(res.data) ? res.data : []))
      .catch(console.error);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const changeStatus = async (id, status) => {
    await axios.put(
      `http://localhost:5000/api/restaurant/${id}/status`,
      { status }
    );
    fetchOrders();
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Delete order?")) return;
    await axios.delete(`http://localhost:5000/api/restaurant/${id}`);
    fetchOrders();
  };

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.item_name?.toLowerCase().includes(search.toLowerCase());

    const matchStatus = filter === "All" || o.status === filter;

    return matchSearch && matchStatus;
  });

  return (
    <div>
      <h2 className="mb-4">Restaurant Orders</h2>

      <div className="d-flex gap-2 mb-3">
        <input
          className="form-control"
          placeholder="Search item..."
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
              <th>Item</th>
              <th>Date</th>
              <th>Status</th>
              <th style={{ width: "260px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((o) => (
              <tr key={o.id}>
                <td>{o.item_name}</td>
                <td>{o.order_date}</td>

                <td>
                  <span
                    className={`badge rounded-pill px-3 ${
                      o.status === "Confirmed"
                        ? "bg-success"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>

                <td>
                  <button
                    className="btn btn-sm btn-success me-2 action-btn"
                    onClick={() => changeStatus(o.id, "Confirmed")}
                  >
                    Confirm
                  </button>

                  <button
                    className="btn btn-sm btn-secondary me-2 action-btn"
                    onClick={() => changeStatus(o.id, "Pending")}
                  >
                    Pending
                  </button>

                  <button
                    className="btn btn-sm btn-danger action-btn"
                    onClick={() => deleteOrder(o.id)}
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

export default AdminRestaurant;