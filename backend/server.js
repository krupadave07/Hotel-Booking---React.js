import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

import roomsRoutes from "./routes/rooms.js";
import authRoutes from "./routes/auth.js";
import spaRoutes from "./routes/spa.js";
import bookingsRoutes from "./routes/bookings.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import reviewsRoutes from "./routes/reviews.js";
import restaurantReviewsRoutes from "./routes/restaurantReviews.js";
import spaReviewsRoutes from "./routes/spaReviews.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ---------------- ROUTES ----------------

app.use("/api/bookings", bookingsRoutes);
app.use("/api/rooms", roomsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/spa", spaRoutes);
app.use("/api/restaurant", restaurantRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/restaurant-reviews", restaurantReviewsRoutes);
app.use("/api/spa-reviews", spaReviewsRoutes);
app.use("/api", contactRoutes);

// ADMIN ROUTES
app.use("/api/admin", adminRoutes);

// JSON parse error handler
app.use((err, req, res, next) => {
  if (err && err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Invalid JSON payload" });
  }
  console.error(err);
  return res.status(500).json({ message: "Server error" });
});

// ---------------- START SERVER ----------------

app.listen(5000, () => {
  console.log("🚀 Server running http://localhost:5000");
});