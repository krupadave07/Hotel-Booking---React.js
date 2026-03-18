import express from "express";
import db from "../database/connection.js";

const router = express.Router();

/* ===== GET ALL CONTACT ===== */
router.get("/contact", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM contact_messages ORDER BY id DESC"
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});

/* ===== UPDATE STATUS ===== */
router.put("/contact/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    await db.execute(
      "UPDATE contact_messages SET status=? WHERE id=?",
      [status, req.params.id]
    );

    res.json({ message: "Updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ===== DELETE ===== */
router.delete("/contact/:id", async (req, res) => {
  try {
    await db.execute(
      "DELETE FROM contact_messages WHERE id=?",
      [req.params.id]
    );

    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
