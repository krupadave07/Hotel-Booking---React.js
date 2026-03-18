import express from "express";
import db from "../database/connection.js";

const router = express.Router();

/* ================= USER SPA BOOKING ================= */

router.post("/book", async (req, res) => {
  try {
    const { name, price, date, time } = req.body;

    await db.execute(
      `INSERT INTO spa_bookings
      (service_name, price, booking_date, booking_time, status)
      VALUES (?, ?, ?, ?, ?)`,
      [name, price, date, time, "Pending"]
    );

    res.json({ success: true });

  } catch (err) {
    console.error("SPA INSERT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= ADMIN GET ALL SPA BOOKINGS ================= */

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM spa_bookings ORDER BY id DESC"
    );

    res.json(rows);
  } catch (err) {
    console.error("SPA FETCH ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= UPDATE STATUS ================= */

router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    await db.execute(
      "UPDATE spa_bookings SET status=? WHERE id=?",
      [status, req.params.id]
    );

    res.json({ message: "Status updated" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= DELETE SPA BOOKING ================= */

router.delete("/:id", async (req, res) => {
  try {
    await db.execute(
      "DELETE FROM spa_bookings WHERE id=?",
      [req.params.id]
    );

    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
