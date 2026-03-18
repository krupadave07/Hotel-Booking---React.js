CREATE DATABASE hotel_booking;
USE hotel_booking;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);



CREATE TABLE rooms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  room_type VARCHAR(50),
  price INT,
  total_rooms INT,
  available_rooms INT
);

CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  room_id INT,
  check_in DATE,
  check_out DATE,
  status VARCHAR(50),

  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (room_id) REFERENCES rooms(id)
);
