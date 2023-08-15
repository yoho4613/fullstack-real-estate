import express from "express";
import {
  bookViewing,
  cancelBooking,
  createUser,
  getAllBookings,
  getAllFav,
  toFav,
} from "../controllers/userController.js";
import jwtCheck from "../config/auth0Config.js";

const router = express.Router();

router.post("/register", jwtCheck, createUser);
router.post("/bookViewing/:id", jwtCheck, bookViewing);
router.post("/allBookings", getAllBookings);
router.post("/removeBooking/:id", jwtCheck, cancelBooking);
router.post("/toFav/:rid", jwtCheck, toFav);
router.post("/allFav", jwtCheck, getAllFav);


export { router as userRoute };
