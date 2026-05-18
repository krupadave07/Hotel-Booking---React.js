import express from "express";
import db from "../database/connection.js";

const router = express.Router();

/* ================= GET REVIEWS FOR A ROOM ================= */
router.get("/:roomId", async (req, res) => {
  try {
    const { roomId } = req.params;
    const [rows] = await db.execute(
      "SELECT * FROM room_reviews WHERE room_id = ? ORDER BY created_at DESC",
      [roomId]
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= ADD A REVIEW ================= */
router.post("/", async (req, res) => {
  try {
    const { roomId, userName, rating, reviewText } = req.body;

    if (!roomId || !userName || !rating) {
      return res.status(400).json({ message: "roomId, userName, and rating are required." });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5." });
    }

    await db.execute(
      `INSERT INTO room_reviews (room_id, user_name, rating, review_text) VALUES (?, ?, ?, ?)`,
      [roomId, userName, rating, reviewText || null]
    );

    res.status(201).json({ message: "Review added successfully." });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
