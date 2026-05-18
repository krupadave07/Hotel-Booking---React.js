import express from "express";
import db from "../database/connection.js";
import jwt from "jsonwebtoken";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ================= GET ALL ROOMS ================= */
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT r.*, 
             IFNULL(AVG(rr.rating), 0) as average_rating, 
             COUNT(rr.id) as review_count
      FROM rooms r
      LEFT JOIN room_reviews rr ON r.id = rr.room_id
      GROUP BY r.id
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= CREATE BOOKING ================= */
router.post("/", verifyUser, async (req, res) => {
  console.log("Booking Data:", req.body);

  const { name, email, phone, checkIn, checkOut, room, price } = req.body;

  try {

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    const nights = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    );

    const total = price * nights;

    await db.execute(
      `INSERT INTO bookings 
      (user_id, name, email, phone, room_type, price, check_in, check_out, nights, total, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        req.user.id,
        name,
        email,
        phone,
        room,
        price,
        checkIn,
        checkOut,
        nights,
        total,
        "Pending"
      ]
    );

    res.json({ message: "Booking successful" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }

});

/* ================= USER BOOKINGS ================= */
router.get("/my-bookings", verifyUser, async (req, res) => {

  try {
    const [rows] = await db.execute(
      "SELECT * FROM bookings WHERE user_id=? ORDER BY id DESC",
      [req.user.id]
    );

    res.json(rows);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }

});

/* ================= ADMIN ALL BOOKINGS ================= */
router.get("/all", async (req, res) => {

  try {
    const [rows] = await db.execute(
      "SELECT * FROM bookings ORDER BY id DESC"
    );

    res.json(rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }

});

/* ================= UPDATE STATUS ================= */
router.put("/:id/status", async (req, res) => {

  try {
    const { status } = req.body;

    await db.execute(
      "UPDATE bookings SET status=? WHERE id=?",
      [status, req.params.id]
    );

    res.json({ message: "Status updated" });

  } catch {
    res.status(500).json({ message: "Server error" });
  }

});

/* ================= DELETE BOOKING ================= */
router.delete("/:id", async (req, res) => {

  try {
    await db.execute(
      "DELETE FROM bookings WHERE id=?",
      [req.params.id]
    );

    res.json({ message: "Booking deleted" });

  } catch {
    res.status(500).json({ message: "Server error" });
  }

});

export default router;