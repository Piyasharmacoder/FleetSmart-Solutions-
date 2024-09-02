import express from "express";
import { body } from "express-validator";
import { addToRental, fetchRentalItems, removeFromRental } from "../controller/rental.controller.js";

const router = express.Router();

// Add a vehicle to the rental
router.post(
  "/add",
  [
    body("userId", "User ID is required").notEmpty(),
    body("VehicleId", "Vehicle ID is required").notEmpty(),
    body("work", "Work description is required").notEmpty(),
    body("work_place", "Work place is required").notEmpty(),
    body("date", "Date is required").notEmpty(),
    body("time", "Time is required").notEmpty(),
  ],
  addToRental
);

// Fetch rental items for a user
router.get(
  "/fetchRentalItems",
  [
    body("userId", "User ID is required").notEmpty(),
  ],
  fetchRentalItems
);

// Remove a vehicle from the rental
router.delete(
  "/removeRentalItems",
  [
    body("userId", "User ID is required").notEmpty(),
    body("VehicleId", "Vehicle ID is required").notEmpty(),
  ],
  removeFromRental
);

export default router;
