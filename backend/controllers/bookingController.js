import db from "../database/connection.js";

export const createBooking = (req, res) => {

  const { roomId, name, email, guests, checkIn, checkOut } = req.body;
  const user_id = req.user?.id || null;

  if (!roomId || !checkIn || !checkOut || !name || !email) {
    return res.status(400).json({ message: "Missing booking details: roomId, name, email, checkIn, checkOut required" });
  }

  const start = new Date(checkIn);
  const end = new Date(checkOut);

  if (isNaN(start) || isNaN(end) || end <= start) {
    return res.status(400).json({ message: "Invalid booking dates" });
  }

  const sql = `
    INSERT INTO bookings
    (user_id, room_id, name, email, guests, check_in, check_out, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending')
  `;

  db.query(
    sql,
    [user_id, roomId, name, email, guests || 1, checkIn, checkOut],
    (err, result) => {

      if (err) {
        console.log("Booking DB Error:", err);
        return res.status(500).json({ message: "Booking failed: " + err.message });
      }

      res.json({
        message: "Booking created successfully",
        bookingId: result.insertId
      });

    }
  );

};