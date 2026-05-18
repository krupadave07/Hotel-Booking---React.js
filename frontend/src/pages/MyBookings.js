import { useEffect, useState } from "react";

function MyBookings() {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBookings = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please log in to view your bookings.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/bookings/my-bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorBody = await res.json().catch(() => ({}));
          throw new Error(errorBody.message || `Server returned ${res.status}`);
        }

        const data = await res.json();
        setBookings(data);
      } catch (fetchError) {
        console.error("MyBookings fetch failed:", fetchError);
        setError("Unable to load bookings. Please check that the backend server is running at http://localhost:5000.");
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  return (
    <div className="container mt-4">

      <h3>My Bookings</h3>

      {loading ? (
        <p>Loading bookings...</p>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <table className="table">

        <thead>
          <tr>
            <th>Room</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.room_type}</td>
              <td>{b.check_in}</td>
              <td>{b.check_out}</td>
              <td>{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
}

export default MyBookings;