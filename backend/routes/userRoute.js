import express from "express";
import {
  bookViewing,
  cancelBooking,
  createUser,
  getAllBookings,
  getAllFav,
  toFav,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/bookViewing/:id", bookViewing);
router.post("/allBookings", getAllBookings);
router.post("/removeBooking/:id", cancelBooking);
router.post("/toFav/:rid", toFav);
router.post("/allFav", getAllFav);


export { router as userRoute };
