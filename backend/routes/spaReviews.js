import express from "express";
import db from "../database/connection.js";

const router = express.Router();

/* ================= GET REVIEWS FOR A SPA SERVICE ================= */
router.get("/:serviceId", async (req, res) => {
  try {
    const { serviceId } = req.params;
    const [rows] = await db.execute(
      "SELECT * FROM spa_reviews WHERE service_id = ? ORDER BY created_at DESC",
      [serviceId]
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching spa reviews:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= ADD A REVIEW ================= */
router.post("/", async (req, res) => {
  try {
    const { serviceId, userName, rating, reviewText } = req.body;

    if (!serviceId || !userName || !rating) {
      return res.status(400).json({ message: "serviceId, userName, and rating are required." });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5." });
    }

    await db.execute(
      `INSERT INTO spa_reviews (service_id, user_name, rating, review_text) VALUES (?, ?, ?, ?)`,
      [serviceId, userName, rating, reviewText || null]
    );

    res.status(201).json({ message: "Review added successfully." });
  } catch (error) {
    console.error("Error adding spa review:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
