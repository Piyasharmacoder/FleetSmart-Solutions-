import express from "express";
import { body } from "express-validator";
import { add, update } from "../controller/maintanence.controller.js";

const router = express.Router();

router.post("/add",
  body("maintanenceDate", "require maintanenceDate").notEmpty(),
  body("vehicleId", "require vehicleId").notEmpty().isNumeric(),
  add
);

router.put("/update",
  body("maintanenceDate", "require maintanenceDate").notEmpty(),
  body("maintanenceStatus", "require maintanenceStatus").notEmpty(),
  body("vehicleId", "require vehicleId").notEmpty().isNumeric(),
  update
);

export default router;
