import db from "../database/connection.js";

export const getUsers = async (req, res) => {

  try {

    const [rows] = await db.execute(
      "SELECT id, username, email FROM users ORDER BY id DESC"
    );

    res.json(rows);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server error" });

  }

};