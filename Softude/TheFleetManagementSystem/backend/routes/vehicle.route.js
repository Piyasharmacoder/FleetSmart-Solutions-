import express from "express";
import {add, byCategory, byVendorId, fetchVehicleMaintanence, fetchVehicleMaintanenceStatus, fetchVehicleUser, list, remove, saveInBulk, update } from "../controller/vehicle.controller.js";
import { body } from "express-validator";

const router = express.Router();

// Add a new vehicle
router.post("/add",
  [
    body("brand", "Brand is required").notEmpty(),
    body("model", "Model is required").notEmpty(),
    body("rent", "Rent is required").notEmpty().isNumeric(),
    body("description", "Description is required").notEmpty(),
    body("categoryname", "Category name is required").notEmpty(),
    body("year", "Year is required").notEmpty().isNumeric(),
    body("registration_number", "Registration number is required").notEmpty(),
    body("image", "Image URL is required").notEmpty(),
    body("vendorId", "Vendor ID is required").notEmpty().isNumeric()
  ],
  add
);

// Save multiple vehicles in bulk
router.post("/addinbulk", saveInBulk);

// Update vehicle details
router.put("/update",
  [
    body("brand", "Brand is required").notEmpty(),
    body("model", "Model is required").notEmpty(),
    body("rent", "Rent is required").notEmpty().isNumeric(),
    body("description", "Description is required").notEmpty(),
    body("categoryname", "Category name is required").notEmpty(),
    body("year", "Year is required").notEmpty().isNumeric(),
    body("registration_number", "Registration number is required").notEmpty(),
    body("image", "Image URL is required").notEmpty(),
    body("vendorId", "Vendor ID is required").notEmpty().isNumeric(),
    body("id", "Vehicle ID is required").notEmpty().isNumeric()
  ],
  update
);

// Get vehicles by category
router.post("/byCategory",
  body("categoryName", "Category name is required").notEmpty(),
  byCategory
);

// List all vehicles
router.get("/list", list);

// Get vehicles by vendor ID
router.post("/byvendorid",
  body("vendorId", "Vendor ID is required").notEmpty().isNumeric(),
  byVendorId
);

// Fetch vehicles associated with users
router.post("/fetchVehicleUser",
  body("vendorId", "Vendor ID is required").notEmpty().isNumeric(),
  fetchVehicleUser
);

// Fetch vehicles maintenance records
router.post("/fetchVehicleMaintanence",
  body("vendorId", "Vendor ID is required").notEmpty().isNumeric(),
  fetchVehicleMaintanence
);

// Fetch vehicles maintenance records by status
router.post("/fetchVehicleMaintanenceStatus",
  [
    body("vendorId", "Vendor ID is required").notEmpty().isNumeric(),
    body("maintanenceStatus", "Maintenance status is required").notEmpty()
  ],
  fetchVehicleMaintanenceStatus
);

// Remove a vehicle
router.delete("/remove",
  body("id", "Vehicle ID is required").notEmpty().isNumeric(),
  remove
);

export default router;
