import express from "express";
import db from "../database/connection.js";
import jwt from "jsonwebtoken";
import { getUsers } from "../controllers/adminController.js";

const router = express.Router();

/* ================= GET USERS ================= */

router.get("/users", getUsers);

/* ================= DELETE USER ================= */

router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await db.execute(
      "DELETE FROM users WHERE id = ?",
      [id]
    );

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= UPDATE USER ================= */

router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;

    await db.execute(
      "UPDATE users SET username = ?, email = ? WHERE id = ?",
      [username, email, id]
    );

    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= GET ROOMS ================= */

router.get("/rooms", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM rooms");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= ADD ROOM ================= */

router.post("/rooms/add", async (req, res) => {
  try {
    const { room_type, price, img, total_rooms, available_rooms } = req.body;

    await db.execute(
      "INSERT INTO rooms (room_type, price, img, total_rooms, available_rooms) VALUES (?, ?, ?, ?, ?)",
      [room_type, price, img || null, total_rooms, available_rooms]
    );

    res.json({ message: "Room added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= UPDATE ROOM ================= */

router.put("/rooms/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { room_type, price, img, total_rooms, available_rooms } = req.body;

    await db.execute(
      "UPDATE rooms SET room_type = ?, price = ?, img = ?, total_rooms = ?, available_rooms = ? WHERE id = ?",
      [room_type, price, img || null, total_rooms, available_rooms, id]
    );

    res.json({ message: "Room updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= DELETE ROOM ================= */

router.delete("/rooms/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await db.execute(
      "DELETE FROM rooms WHERE id = ?",
      [id]
    );

    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= HOTEL SETTINGS ================= */

router.post("/hotel/settings", async (req, res) => {
  try {
    const { name, description, email, phone, address, city, country } = req.body;

    // Store in a settings table or a config table
    // For now, we'll just return success
    // You can implement storage as needed

    res.json({ 
      message: "Hotel information updated successfully",
      data: { name, description, email, phone, address, city, country }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= RESTAURANT SETTINGS ================= */

router.post("/restaurant/settings", async (req, res) => {
  try {
    const { name, cuisine, hours, description, phone, email } = req.body;

    // Store restaurant settings
    res.json({ 
      message: "Restaurant information updated successfully",
      data: { name, cuisine, hours, description, phone, email }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= SPA SETTINGS ================= */

router.post("/spa/settings", async (req, res) => {
  try {
    const { name, description, services, hours, phone, email } = req.body;

    // Store spa settings
    res.json({ 
      message: "Spa information updated successfully",
      data: { name, description, services, hours, phone, email }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= RESTAURANT MENU MANAGEMENT ================= */

router.post("/restaurant/menu/add", async (req, res) => {
  try {
    const { name, price, img, rating, offer } = req.body;

    await db.execute(
      "INSERT INTO restaurant_menu (name, price, img, rating, offer) VALUES (?, ?, ?, ?, ?)",
      [name, price, img || null, rating || null, offer || 0]
    );

    res.json({ message: "Menu item added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/restaurant/menu/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, img, rating, offer } = req.body;

    await db.execute(
      "UPDATE restaurant_menu SET name = ?, price = ?, img = ?, rating = ?, offer = ? WHERE id = ?",
      [name, price, img || null, rating || null, offer || 0, id]
    );

    res.json({ message: "Menu item updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/restaurant/menu/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await db.execute(
      "DELETE FROM restaurant_menu WHERE id = ?",
      [id]
    );

    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= SPA SERVICES MANAGEMENT ================= */

router.post("/spa/services/add", async (req, res) => {
  try {
    const { name, price, duration, img, rating } = req.body;

    await db.execute(
      "INSERT INTO spa_services (name, price, duration, img, rating) VALUES (?, ?, ?, ?, ?)",
      [name, price, duration, img || null, rating || null]
    );

    res.json({ message: "Spa service added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/spa/services/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, duration, img, rating } = req.body;

    await db.execute(
      "UPDATE spa_services SET name = ?, price = ?, duration = ?, img = ?, rating = ? WHERE id = ?",
      [name, price, duration, img || null, rating || null, id]
    );

    res.json({ message: "Spa service updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/spa/services/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await db.execute(
      "DELETE FROM spa_services WHERE id = ?",
      [id]
    );

    res.json({ message: "Spa service deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

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