import express from "express";
import { add, byCategory, byVendorId, fetchVehicleMaintanence, fetchVehicleMaintanenceStatus, fetchVehicleUser, list, remove, saveInBulk, update } from "../controller/vehicle.controller.js";
import { body } from "express-validator";

const router = express.Router();

router.post("/add",
  body("brand", "brand is require").notEmpty(),
  body("model", "model is require").notEmpty(),
  body("rent", "rent is require").notEmpty(),
  body("description", "description is require").notEmpty(),
  body("categoryname", "categoryname is require").notEmpty(),
  body("year", "year is require").notEmpty(),
  body("registration_number", "registration_number is require").notEmpty(),
  body("image", "image is require").notEmpty(),
  body("vendorId", "vendorId is require").notEmpty(),
  add
);

router.post("/addinbulk", saveInBulk);

router.put("/update",
  body("brand", "brand is require").notEmpty(),
  body("model", "model is require").notEmpty(),
  body("rent", "rent is require").notEmpty(),
  body("description", "description is require").notEmpty(),
  body("categoryname", "categoryname is require").notEmpty(),
  body("year", "year is require").notEmpty(),
  body("registration_number", "registration_number is require").notEmpty(),
  body("image", "image is require").notEmpty(),
  body("vendorId", "require vendorId").notEmpty(),
  body("id", "id is require").notEmpty().isNumeric(),
  update
);

router.post("/byCategory", body("id", "id is require").notEmpty(), byCategory);

router.get("/list", list);

router.post("/byvendorid", byVendorId);

router.post("/fetchVehicleUser", fetchVehicleUser);

router.post("/fetchVehicleMaintanence", body("vendorId", "require vendorId").notEmpty(), fetchVehicleMaintanence);

router.post("/fetchVehicleMaintanenceStatus",
  body("vendorId", "require vendorId").notEmpty(),
  body("maintanenceStatus", "require maintanenceStatus").notEmpty(),
  fetchVehicleMaintanenceStatus);

router.delete("/remove", body("id", "id is require").notEmpty().isNumeric(), remove);

export default router;
