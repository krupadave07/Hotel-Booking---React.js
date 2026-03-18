import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "hotel_booking",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test connection once
try {
  const conn = await pool.getConnection();
  console.log("✅ MySQL connected");
  conn.release();
} catch (err) {
  console.error("❌ MySQL connection failed:", err);
}

export default pool;
