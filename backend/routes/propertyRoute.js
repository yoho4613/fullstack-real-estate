import express from "express";
import {
  createProperty,
  getAllProperties,
  getProperty,
} from "../controllers/propertyController.js";

const router = express.Router();

router.post("/create", createProperty);
router.get("/allProperties", getAllProperties);
router.get("/:id", getProperty)

export { router as propertyRoute };
