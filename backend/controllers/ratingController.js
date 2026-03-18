// const db = require("../database/connection");

// /* SAVE OR UPDATE RATING */
// exports.saveRating = (req, res) => {
//   const { userId, roomId, rating } = req.body;

//   const checkQuery =
//     "SELECT * FROM ratings WHERE user_id = ? AND room_id = ?";

//   db.query(checkQuery, [userId, roomId], (err, result) => {
//     if (err) return res.status(500).json(err);

//     if (result.length > 0) {
//       const updateQuery =
//         "UPDATE ratings SET rating = ? WHERE user_id = ? AND room_id = ?";

//       db.query(updateQuery, [rating, userId, roomId], (err) => {
//         if (err) return res.status(500).json(err);
//         res.json({ message: "Rating updated" });
//       });
//     } else {
//       const insertQuery =
//         "INSERT INTO ratings (user_id, room_id, rating) VALUES (?, ?, ?)";

//       db.query(insertQuery, [userId, roomId, rating], (err) => {
//         if (err) return res.status(500).json(err);
//         res.json({ message: "Rating saved" });
//       });
//     }
//   });
// };

// /* GET ALL RATINGS */
// exports.getRatings = (req, res) => {
//   const query = "SELECT * FROM ratings";

//   db.query(query, (err, result) => {
//     if (err) return res.status(500).json(err);
//     res.json(result);
//   });
// };