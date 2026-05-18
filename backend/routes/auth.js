// import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import db from "../database/connection.js";

// const router = express.Router();

// /* ===================== LOGIN ===================== */

// router.post("/login", async (req, res) => {
//   console.log("➡️ LOGIN HIT:", req.body);

//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({
//       message: "All fields required",
//     });
//   }

//   try {
//     const [rows] = await db.query(
//       "SELECT * FROM users WHERE email = ?",
//       [email]
//     );

//     if (rows.length === 0) {
//       return res.status(401).json({
//         message: "User not found",
//       });
//     }

//     const user = rows[0];

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({
//         message: "Invalid password",
//       });
//     }

//     const token = jwt.sign(
//       { id: user.id },
//       process.env.JWT_SECRET || "secret123",
//       { expiresIn: "1d" }
//     );

//     return res.status(200).json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user.id,
//         username: user.username,
//         email: user.email,
//       },
//     });
//   } catch (err) {
//     console.error("❌ LOGIN ERROR:", err);
//     return res.status(500).json({
//       message: "Server error",
//     });
//   }
// });

// /* ===================== REGISTER ===================== */

// router.post("/register", async (req, res) => {
//   console.log("➡️ REGISTER HIT:", req.body);

//   const { username, email, password } = req.body;

//   if (!username || !email || !password) {
//     return res.status(400).json({
//       message: "All fields required",
//     });
//   }

//   try {
//     const [exists] = await db.query(
//       "SELECT id FROM users WHERE email = ?",
//       [email]
//     );

//     if (exists.length > 0) {
//       return res.status(409).json({
//         message: "Email already registered",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await db.query(
//       "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
//       [username, email, hashedPassword]
//     );

//     return res.status(201).json({
//       message: "Registration successful",
//     });
//   } catch (err) {
//     console.error("❌ REGISTER ERROR:", err);
//     return res.status(500).json({
//       message: "Server error",
//     });
//   }
// });

// export default router;


import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import db from "../database/connection.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();

const passwordResetTableSql = `
CREATE TABLE IF NOT EXISTS password_resets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  otp VARCHAR(10) NOT NULL,
  expires_at DATETIME NOT NULL,
  used TINYINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
`;

await db.execute(passwordResetTableSql);

let transporter;
let etherealAccount;

const initTransporter = async () => {
  if (transporter) {
    return transporter;
  }

  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT, 10) || 465,
      secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    return transporter;
  }

  if (!etherealAccount) {
    etherealAccount = await nodemailer.createTestAccount();
    console.log("⚠️ SMTP not configured, using Ethereal test account");
    console.log("Ethereal user:", etherealAccount.user);
    console.log("Ethereal pass:", etherealAccount.pass);
  }

  transporter = nodemailer.createTransport({
    host: etherealAccount.smtp.host,
    port: etherealAccount.smtp.port,
    secure: etherealAccount.smtp.secure,
    auth: {
      user: etherealAccount.user,
      pass: etherealAccount.pass,
    },
  });

  return transporter;
};

const sendResetEmail = async (email, name, otp) => {
  const transport = await initTransporter();

  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER || `no-reply@${process.env.SMTP_HOST || "example.com"}`,
    to: email,
    subject: "Your Password Reset OTP",
    html: `
      <div style="font-family: Arial, sans-serif; color: #111;">
        <h2>Password Reset Request</h2>
        <p>Hi ${name || "Guest"},</p>
        <p>Your OTP for resetting your password is:</p>
        <p style="font-size: 28px; font-weight: 700; margin: 18px 0;">${otp}</p>
        <p>This code will expire in 10 minutes.</p>
        <p>If you did not request a password reset, please ignore this email.</p>
      </div>
    `,
  };

  const info = await transport.sendMail(mailOptions);
  const previewUrl = nodemailer.getTestMessageUrl(info);
  if (previewUrl) {
    console.log("Password reset OTP preview URL:", previewUrl);
  }

  return { info, previewUrl };
};

/* ===================== LOGIN ===================== */
router.post("/login", async (req, res) => {
  console.log("➡️ LOGIN HIT:", req.body);

  const { email, password } = req.body;

  // ✅ VALIDATION
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  try {
    // ✅ CHECK USER
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = rows[0];

    // ✅ PASSWORD MATCH
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    // ✅ TOKEN
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1d" }
    );

    // ✅ RESPONSE (IMPORTANT FORMAT)
    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.username, // ✅ match frontend
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

  // ✅ VALIDATION
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    // ✅ CHECK EXISTING USER
    const [exists] = await db.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (exists.length > 0) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    // ✅ HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ INSERT USER
    await db.execute(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    return res.status(201).json({
      success: true,
      message: "Registration successful",
    });

  } catch (err) {
    console.error("❌ REGISTER ERROR:", err);
    return res.status(500).json({
      message: "Server error",
    });
  }
});

/* ===================== FORGOT PASSWORD (SEND OTP) ===================== */
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Please provide your email." });
  }

  try {
    const [rows] = await db.execute(
      "SELECT id, username, email FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(200).json({
        success: true,
        message: "If this email exists, an OTP has been sent.",
      });
    }

    const user = rows[0];
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await db.execute(
      "INSERT INTO password_resets (user_id, otp, expires_at, used) VALUES (?, ?, ?, 0)",
      [user.id, otp, expiresAt]
    );

    const result = await sendResetEmail(user.email, user.username, otp);
    const previewUrl = result?.previewUrl || null;

    return res.status(200).json({
      success: true,
      message: "OTP sent to your email.",
      previewUrl,
    });
  } catch (err) {
    console.error("❌ FORGOT PASSWORD ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

/* ===================== RESET PASSWORD (VERIFY OTP) ===================== */
router.post("/reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: "Email, OTP, and new password are required." });
  }

  if (newPassword.length < 5) {
    return res.status(400).json({ message: "New password must be at least 5 characters." });
  }

  try {
    const [users] = await db.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(400).json({ message: "Invalid email or OTP." });
    }

    const user = users[0];
    const [tokens] = await db.execute(
      "SELECT * FROM password_resets WHERE user_id = ? AND otp = ? AND used = 0 ORDER BY created_at DESC LIMIT 1",
      [user.id, otp]
    );

    if (tokens.length === 0) {
      return res.status(400).json({ message: "Invalid OTP or the OTP has already been used." });
    }

    const token = tokens[0];
    const now = new Date();
    const expires = new Date(token.expires_at);

    if (now > expires) {
      return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.execute("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, user.id]);
    await db.execute("UPDATE password_resets SET used = 1 WHERE id = ?", [token.id]);

    return res.status(200).json({
      success: true,
      message: "Password reset was successful. You can now log in with your new password.",
    });
  } catch (err) {
    console.error("❌ RESET PASSWORD ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

/* ===================== GET PROFILE ===================== */
router.get("/profile", verifyUser, async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT id, username, email FROM users WHERE id = ?",
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];
    return res.status(200).json({
      user: {
        id: user.id,
        name: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("❌ PROFILE FETCH ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

/* ===================== UPDATE PROFILE ===================== */
router.put("/profile", verifyUser, async (req, res) => {
  const { username, currentPassword, newPassword } = req.body;

  if (!username && !newPassword) {
    return res.status(400).json({ message: "No update fields provided" });
  }

  try {
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE id = ?",
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];
    const updates = [];
    const values = [];

    if (username && username.trim() && username !== user.username) {
      updates.push("username = ?");
      values.push(username.trim());
    }

    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({
          message: "Current password is required to change password",
        });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Current password is incorrect" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updates.push("password = ?");
      values.push(hashedPassword);
    }

    if (updates.length === 0) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    values.push(req.user.id);
    await db.execute(
      `UPDATE users SET ${updates.join(", ")} WHERE id = ?`,
      values
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user.id,
        name: username?.trim() || user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("❌ PROFILE UPDATE ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;