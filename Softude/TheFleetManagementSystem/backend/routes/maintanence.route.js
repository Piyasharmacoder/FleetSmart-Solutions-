import express from "express";
import { body } from "express-validator";
import { add, update } from "../controller/maintanence.controller.js";

const router = express.Router();

// Add a new maintenance record
router.post(
  "/add",
  [
    body("maintanenceDate", "Maintenance date is required").notEmpty(),
    body("vehicleId", "Vehicle ID is required and must be numeric").notEmpty().isNumeric(),
  ],
  add
);

// Update an existing maintenance record
router.put(
  "/update",
  [
    body("maintanenceDate", "Maintenance date is required").notEmpty(),
    body("maintanenceStatus", "Maintenance status is required").notEmpty(),
    body("vehicleId", "Vehicle ID is required and must be numeric").notEmpty().isNumeric(),
  ],
  update
);

export default router;
