import express from "express";
import {
  createProperty,
  getAllProperties,
  getProperty,
} from "../controllers/propertyController.js";
import jwtCheck from "../config/auth0Config.js";

const router = express.Router();

router.post("/create", jwtCheck, createProperty);
router.get("/allProperties", getAllProperties);
router.get("/:id", getProperty)

export { router as propertyRoute };
