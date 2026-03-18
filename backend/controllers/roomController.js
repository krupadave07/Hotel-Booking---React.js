import db from "../database/connection.js";

export const getRooms = (req, res) => {
  db.query("SELECT * FROM rooms", (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
};

export const addRoom = (req, res) => {
  const { room_name, price, status } = req.body;

  db.query(
    "INSERT INTO rooms(room_name,price,status) VALUES(?,?,?)",
    [room_name, price, status],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Room added" });
    }
  );
};

export const updateRoom = (req, res) => {
  const { id } = req.params;
  const { room_name, price, status } = req.body;

  db.query(
    "UPDATE rooms SET room_name=?,price=?,status=? WHERE id=?",
    [room_name, price, status, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Room updated" });
    }
  );
};

export const deleteRoom = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM rooms WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Room deleted" });
  });
};
