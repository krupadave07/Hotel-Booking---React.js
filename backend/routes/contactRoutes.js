import express from "express";
import db from "../database/connection.js";

const router = express.Router();

/* ================= GET ALL CONTACT ================= */

router.get("/contact", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM contact_messages ORDER BY id DESC"
    );

    res.json(rows);

  } catch (err) {
    console.error("GET ERROR:", err);
    res.status(500).json([]);
  }
});

/* ================= ADD CONTACT (IMPORTANT) ================= */

router.post("/contact", async (req, res) => {

  try {

    const { name, email, subject, message } = req.body;

    // VALIDATION
    if (!name || !email || !subject || !message) {
      return res.json({
        success: false,
        message: "All fields required"
      });
    }

    const sql = `
      INSERT INTO contact_messages (name, email, subject, message)
      VALUES (?, ?, ?, ?)
    `;

    await db.execute(sql, [name, email, subject, message]);

    res.json({
      success: true,
      message: "Message saved"
    });

  } catch (err) {

    console.error("POST ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Database error"
    });

  }

});

export default router;