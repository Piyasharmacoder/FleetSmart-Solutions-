import express from "express";
import { addToRental, fetchRentalItems, removeFromRental, update } from "../controller/rental.controller.js";
import { body } from "express-validator";

const router = express.Router();

router.post("/add",
    body("userId", "invalid userId").notEmpty(),
    body("quantity", "invalid quantity").notEmpty(),
    body("vehicleId", "invalid vehicleId").notEmpty(),
    addToRental);

router.get("/fetchRentalItems", fetchRentalItems);

router.delete("/removeRentalItems", removeFromRental);

router.post("/update", update);

export default router;