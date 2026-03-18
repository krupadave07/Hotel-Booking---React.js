import express from "express";
import db from "../database/connection.js";
import jwt from "jsonwebtoken";
import { createBooking } from "../controllers/bookingController.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyUser, createBooking);


router.get("/my-bookings", verifyUser, async (req, res) => {

  const userId = req.user.id;

  const [rows] = await db.execute(
    "SELECT * FROM bookings WHERE user_id=? ORDER BY id DESC",
    [userId]
  );

  res.json(rows);

});
/* ================= AUTH ================= */

const auth = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) return res.status(401).json({ message: "No token" });

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "secret123");
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

/* ================= CREATE BOOKING ================= */


router.post("/", async (req, res) => {

  const { name, email, phone, checkIn, checkOut, room } = req.body;

  try {

    await db.execute(
      "INSERT INTO bookings (name,email,phone,check_in,check_out,room_type) VALUES (?,?,?,?,?,?)",
      [name, email, phone, checkIn, checkOut, room]
    );

    res.json({ message: "Booking successful" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

});


/* ================= USER BOOKINGS ================= */

router.get("/", auth, async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM bookings WHERE user_id=? ORDER BY id DESC",
      [req.userId]
    );

    res.json(rows);
  } catch {
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
