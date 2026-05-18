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

// Ensure admin rooms table exists for current schema
try {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS rooms (
      id INT AUTO_INCREMENT PRIMARY KEY,
      room_type VARCHAR(50),
      price INT,
      img VARCHAR(500),
      total_rooms INT
    )
  `);
  await pool.execute(`ALTER TABLE rooms ADD COLUMN IF NOT EXISTS img VARCHAR(500)`);
  await pool.execute(`ALTER TABLE rooms ADD COLUMN IF NOT EXISTS offer INT DEFAULT 0`);
  console.log("✅ rooms table ensured");
} catch (err) {
  console.error("❌ Failed to ensure rooms table:", err);
}

// Ensure restaurant_menu table exists
try {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS restaurant_menu (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      price INT NOT NULL,
      img VARCHAR(500),
      rating DECIMAL(2,1),
      offer INT DEFAULT 0
    )
  `);
  console.log("✅ restaurant_menu table ensured");
} catch (err) {
  console.error("❌ Failed to ensure restaurant_menu table:", err);
}

// Ensure spa_services table exists
try {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS spa_services (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      price INT NOT NULL,
      duration VARCHAR(50),
      img VARCHAR(500),
      rating DECIMAL(2,1)
    )
  `);
  console.log("✅ spa_services table ensured");
} catch (err) {
  console.error("❌ Failed to ensure spa_services table:", err);
}

// Ensure spa_bookings table exists
try {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS spa_bookings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      service_name VARCHAR(255) NOT NULL,
      price INT NOT NULL,
      booking_date DATE NOT NULL,
      booking_time VARCHAR(50) NOT NULL,
      status VARCHAR(50) DEFAULT 'Pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log("✅ spa_bookings table ensured");
} catch (err) {
  console.error("❌ Failed to ensure spa_bookings table:", err);
}

// Ensure room_reviews table exists
try {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS room_reviews (
      id INT AUTO_INCREMENT PRIMARY KEY,
      room_id INT NOT NULL,
      user_name VARCHAR(100) NOT NULL,
      rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
      review_text TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log("✅ room_reviews table ensured");
} catch (err) {
  console.error("❌ Failed to ensure room_reviews table:", err);
}

// Ensure restaurant_reviews table exists
try {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS restaurant_reviews (
      id INT AUTO_INCREMENT PRIMARY KEY,
      restaurant_id INT NOT NULL,
      user_name VARCHAR(100) NOT NULL,
      rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
      review_text TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log("✅ restaurant_reviews table ensured");
} catch (err) {
  console.error("❌ Failed to ensure restaurant_reviews table:", err);
}

// Ensure spa_reviews table exists
try {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS spa_reviews (
      id INT AUTO_INCREMENT PRIMARY KEY,
      service_id INT NOT NULL,
      user_name VARCHAR(100) NOT NULL,
      rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
      review_text TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log("✅ spa_reviews table ensured");
} catch (err) {
  console.error("❌ Failed to ensure spa_reviews table:", err);
}

export default pool;
