import db from "../database/connection.js";

export const createBooking = (req, res) => {

  const { name, email, phone, checkIn, checkOut, room, price } = req.body;

  const user_id = req.user.id;

  const start = new Date(checkIn);
  const end = new Date(checkOut);

  const nights = Math.ceil(
    (end - start) / (1000 * 60 * 60 * 24)
  );

  const total = nights * price;

  const sql = `
    INSERT INTO bookings
    (user_id, name, email, phone, room_type, price, check_in, check_out, nights, total, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')
  `;

  db.query(
    sql,
    [
      user_id,
      name,
      email,
      phone,
      room,
      price,
      checkIn,
      checkOut,
      nights,
      total
    ],
    (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Booking failed" });
      }

      res.json({
        message: "Booking created successfully",
        nights,
        total
      });

    }
  );

};