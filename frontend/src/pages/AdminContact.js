import axios from "axios";
import { useEffect, useState } from "react";

function AdminContact() {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const fetchMessages = () => {
    axios
      .get("http://localhost:5000/api/contact")
      .then((res) => setMessages(Array.isArray(res.data) ? res.data : []))
      .catch(console.error);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const changeStatus = async (id, status) => {
    await axios.put(
      `http://localhost:5000/api/contact/${id}/status`,
      { status }
    );
    fetchMessages();
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Delete message?")) return;
    await axios.delete(`http://localhost:5000/api/contact/${id}`);
    fetchMessages();
  };

  const filtered = messages.filter((m) => {
    const matchSearch =
      m.name?.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      filter === "All" || m.status === filter;

    return matchSearch && matchStatus;
  });

  return (
    <div>
      <h2 className="mb-4">Contact Messages</h2>

      <div className="d-flex gap-2 mb-3">
        <input
          className="form-control"
          placeholder="Search name..."
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
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th style={{ width: "260px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((m) => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td>{m.email}</td>

                <td>
                  <span
                    className={`badge rounded-pill px-3 ${
                      m.status === "Confirmed"
                        ? "bg-success"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {m.status}
                  </span>
                </td>

                <td>
                  <button
                    className="btn btn-sm btn-success me-2 action-btn"
                    onClick={() => changeStatus(m.id, "Confirmed")}
                  >
                    Confirm
                  </button>

                  <button
                    className="btn btn-sm btn-secondary me-2 action-btn"
                    onClick={() => changeStatus(m.id, "Pending")}
                  >
                    Pending
                  </button>

                  <button
                    className="btn btn-sm btn-danger action-btn"
                    onClick={() => deleteMessage(m.id)}
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

export default AdminContact;
