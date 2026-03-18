import express from "express";
import { verifyAdmin } from "../middleware/authMiddleware.js";
import {
  getRooms,
  addRoom,
  updateRoom,
  deleteRoom,
} from "../controllers/roomController.js";



const router = express.Router();

router.get("/", getRooms);

router.post("/", verifyAdmin, addRoom);
router.put("/:id", verifyAdmin, updateRoom);
router.delete("/:id", verifyAdmin, deleteRoom);

export default router;
