import { useEffect, useState } from "react";

function MyBookings() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {

    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/bookings/my-bookings", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setBookings(data));

  }, []);

  return (
    <div className="container mt-4">

      <h3>My Bookings</h3>

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

          {bookings.map(b => (

            <tr key={b.id}>
              <td>{b.room_type}</td>
              <td>{b.check_in}</td>
              <td>{b.check_out}</td>
              <td>{b.status}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default MyBookings;