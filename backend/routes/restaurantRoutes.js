import express from "express";
import db from "../database/connection.js";

const router = express.Router();

/* ================= USER ORDER ================= */

router.post("/order", async (req, res) => {
  try {
    const { name, price, date, time } = req.body;

    await db.execute(
      `INSERT INTO restaurant_orders
      (item_name, price, order_date, order_time, status)
      VALUES (?, ?, ?, ?, ?)`,
      [name, price, date, time, "Pending"]
    );

    res.json({ success: true });

  } catch (err) {
    console.error("RESTAURANT INSERT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= ADMIN GET ALL ORDERS ================= */

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM restaurant_orders ORDER BY id DESC"
    );

    res.json(rows);

  } catch (err) {
    console.error("RESTAURANT FETCH ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= UPDATE ORDER STATUS ================= */

router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    await db.execute(
      "UPDATE restaurant_orders SET status = ? WHERE id = ?",
      [status, req.params.id]
    );

    res.json({ success: true });

  } catch (err) {
    console.error("RESTAURANT UPDATE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});


/* ================= DELETE ORDER ================= */

router.delete("/:id", async (req, res) => {
  try {
    await db.execute(
      "DELETE FROM restaurant_orders WHERE id = ?",
      [req.params.id]
    );

    res.json({ success: true });

  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});



export default router;