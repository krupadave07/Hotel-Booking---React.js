import express from "express";
import cors from "cors";

import roomsRoutes from "./routes/rooms.js";
import authRoutes from "./routes/auth.js";
import spaRoutes from "./routes/spa.js";
import bookingsRoutes from "./routes/bookings.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

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
app.use("/api", contactRoutes);

// ADMIN ROUTES
app.use("/api/admin", adminRoutes);

// ---------------- START SERVER ----------------

app.listen(5000, () => {
  console.log("🚀 Server running http://localhost:5000");
});