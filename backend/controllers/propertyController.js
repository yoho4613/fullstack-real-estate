import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createProperty = asyncHandler(async (req, res) => {
  console.log("endpoint created");
});

