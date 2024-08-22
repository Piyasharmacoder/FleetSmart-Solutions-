import express from "express";
import {
  addToRental,
  fetchRentalItems,
  removeFromRental,
  update,
} from "../controller/rental.controller.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/add",
  body("userId", "invalid userId").notEmpty(),
  body("VehicleId", "invalid vehicleId").notEmpty(),
  body("quantity", "invalid quantity").notEmpty(),
  addToRental
);

router.post(
  "/fetchRentalItems",
  body("userId", "invalid userId").notEmpty(),
  fetchRentalItems
);

router.delete(
  "/removeRentalItems",
  body("userId", "invalid userId").notEmpty(),
  body("VehicleId", "invalid vehicleId").notEmpty(),
  removeFromRental
);

router.put("/update", update);

export default router;
