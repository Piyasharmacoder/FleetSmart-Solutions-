import express from "express";
import { add, byCategory, list, remove, saveInBulk, update, view, } from "../controller/vehicle.controller.js";
import { verifyToken } from "../middleware/auth.js";
import { body, check } from "express-validator";

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
  body("id", "id is require").notEmpty().isNumeric(),
  update
);

router.post("/byCategory",
  body("id", "id is require").notEmpty(),
  byCategory
);

router.post("/view", body("id", "id is require").notEmpty().isNumeric(), view);

router.get("/list", list);

router.delete("/remove",
  body("id", "id is require").notEmpty().isNumeric(),
  remove
);

export default router;
