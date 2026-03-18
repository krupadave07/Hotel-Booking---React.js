import express from "express";
import db from "../database/connection.js";
import jwt from "jsonwebtoken";
import { getUsers } from "../controllers/adminController.js";

const router = express.Router();

/* ================= GET USERS ================= */

router.get("/users", getUsers);


/* ================= ADMIN LOGIN ================= */

router.post("/login", async (req, res) => {

  try {

    const { username, password } = req.body;

    const [rows] = await db.execute(
      "SELECT * FROM admins WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid username" });
    }

    const admin = rows[0];

    if (admin.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: admin.id, role: "admin" },
      "adminsecret123",
      { expiresIn: "1d" }
    );

    res.json({
      token,
      admin: {
        id: admin.id,
        username: admin.username
      }
    });

  } catch (err) {

    console.error("ADMIN LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });

  }

});


/* ================= DASHBOARD API ================= */

router.get("/dashboard", async (req, res) => {

  try {

    const [[{ totalUsers }]] = await db.query(
      "SELECT COUNT(*) as totalUsers FROM users"
    );

    const [[{ totalBookings }]] = await db.query(
      "SELECT COUNT(*) as totalBookings FROM bookings"
    );

    const [[{ spaBookings }]] = await db.query(
      "SELECT COUNT(*) as spaBookings FROM spa_bookings"
    );

    const [[{ restaurantOrders }]] = await db.query(
      "SELECT COUNT(*) as restaurantOrders FROM restaurant_orders"
    );

    const [[{ contacts }]] = await db.query(
      "SELECT COUNT(*) as contacts FROM contact_messages"
    );

    const [[{ todayCheckins }]] = await db.query(
      "SELECT COUNT(*) as todayCheckins FROM bookings WHERE DATE(check_in) = CURDATE()"
    );

    const [recentBookings] = await db.query(
      "SELECT room_type, check_in FROM bookings ORDER BY id DESC LIMIT 5"
    );

    res.json({
      totalUsers,
      totalBookings,
      spaBookings,
      restaurantOrders,
      contacts,
      todayCheckins,
      recentBookings
    });

  } catch (err) {

    console.error("DASHBOARD ERROR:", err);
    res.status(500).json({ message: "Server error" });

  }

});

export default router;