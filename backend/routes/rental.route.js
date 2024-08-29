import express from "express";
import { addToRental, fetchRentalItems, removeFromRental } from "../controller/rental.controller.js";
import { body } from "express-validator";

const router = express.Router();

router.post("/add",
  body("userId", "invalid userId").notEmpty(),
  body("VehicleId", "invalid vehicleId").notEmpty(),
  body("work", "invalid work").notEmpty(),
  body("work_place", "invalid  work_place").notEmpty(),
  body("date", "invalid date").notEmpty(),
  body("time", "invalid time").notEmpty(),
  addToRental
);

router.post("/fetchRentalItems",
  body("userId", "invalid userId").notEmpty(),
  fetchRentalItems
);

router.delete("/removeRentalItems",
  body("userId", "invalid userId").notEmpty(),
  body("VehicleId", "invalid vehicleId").notEmpty(),
  removeFromRental
);

export default router;
