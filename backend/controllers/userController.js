import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createUser = asyncHandler(async (req, res) => {
  console.log("creating a user");

  let { email } = req.body;
  const userExists = await prisma.user.findUnique({ where: { email } });

  if (!userExists) {
    const user = await prisma.user.create({ data: req.body });
    res.send({
      message: "User registered successfully",
      user: user,
    });
  } else {
    res.status(201).send({ message: "User already exist" });
  }
});

export const bookViewing = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;

  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: { email },
      select: { bookedViewings: true },
    });

    if (alreadyBooked.bookedViewings.some((viewing) => viewing.id === id)) {
      res
        .status(400)
        .json({ message: "You already booked viewing for this property" });
    } else {
      await prisma.user.update({
        where: { email },
        data: {
          bookedViewings: {
            push: { id, date },
          },
        },
      });
    }
    res.send("Your viewing is booked successfully ");
  } catch (error) {
    throw new Error(error.message);
  }
});

export const getAllBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const bookings = await prisma.user.findUnique({
      where: { email },
      select: { bookedViewings: true },
    });
    res.status(200).send(bookings);
  } catch (error) {
    throw new Error(error.message);
  }
});

export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { bookedViewings: true },
    });

    const index = user.bookedViewings.findIndex((viewing) => viewing.id === id);
    if (index === -1) {
      res.status(404).json({ message: "Booking not found" });
    } else {
      user.bookedViewings.splice(index, 1);
      await prisma.user.update({
        where: { email },
        data: {
          bookedViewings: user.bookedViewings,
        },
      });
      res.send("Booking cancelled successfully.");
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

export const toFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (user.favResidenciesID.includes(rid)) {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            set: user.favResidenciesID.filter((id) => id !== rid),
          },
        },
      });
      res.send({ message: "Removed from favourites", user: updateUser });
    } else {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            push: rid,
          },
        },
      });
      res.send({ message: "Updated favourites", user: updateUser });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

export const getAllFav = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const favProperties = await prisma.user.findUnique({
      where: { email },
      select: { favResidenciesID: true },
    });

    res.status(200).send(favProperties);
  } catch (error) {
    throw new Error(error.message);
  }
});
