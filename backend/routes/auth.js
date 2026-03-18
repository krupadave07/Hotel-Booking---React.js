import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../database/connection.js";

const router = express.Router();

/* ===================== LOGIN ===================== */

router.post("/login", async (req, res) => {
  console.log("➡️ LOGIN HIT:", req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields required",
    });
  }

  try {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("❌ LOGIN ERROR:", err);
    return res.status(500).json({
      message: "Server error",
    });
  }
});

/* ===================== REGISTER ===================== */

router.post("/register", async (req, res) => {
  console.log("➡️ REGISTER HIT:", req.body);

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All fields required",
    });
  }

  try {
    const [exists] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (exists.length > 0) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    return res.status(201).json({
      message: "Registration successful",
    });
  } catch (err) {
    console.error("❌ REGISTER ERROR:", err);
    return res.status(500).json({
      message: "Server error",
    });
  }
});

export default router;
