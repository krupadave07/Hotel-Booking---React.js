import express from "express";
import db from "../database/connection.js";

const router = express.Router();

/* ================= GET REVIEWS FOR A RESTAURANT ITEM ================= */
router.get("/:restaurantId", async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const [rows] = await db.execute(
      "SELECT * FROM restaurant_reviews WHERE restaurant_id = ? ORDER BY created_at DESC",
      [restaurantId]
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching restaurant reviews:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= ADD A REVIEW ================= */
router.post("/", async (req, res) => {
  try {
    const { restaurantId, userName, rating, reviewText } = req.body;

    if (!restaurantId || !userName || !rating) {
      return res.status(400).json({ message: "restaurantId, userName, and rating are required." });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5." });
    }

    await db.execute(
      `INSERT INTO restaurant_reviews (restaurant_id, user_name, rating, review_text) VALUES (?, ?, ?, ?)`,
      [restaurantId, userName, rating, reviewText || null]
    );

    res.status(201).json({ message: "Review added successfully." });
  } catch (error) {
    console.error("Error adding restaurant review:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
