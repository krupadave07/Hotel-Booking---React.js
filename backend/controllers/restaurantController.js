// import db from "../database/connection.js"

// exports.confirmOrder = async (req, res) => {
//   const { id } = req.params;

//   try {
//     await db.execute(
//       "UPDATE restaurant_orders SET status = 'Confirmed' WHERE id = ?",
//       [id]
//     );

//     res.json({ message: "Order confirmed successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };