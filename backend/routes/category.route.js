import express from "express";
import {
  Categorydata,
  Categorylist,
  save,
  saveInBulk,
  search,
} from "../controller/category.controller.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/add",
  body("categoryName", "invalid categoryName").notEmpty(),
  body("imageUrl", "invalid imageUrl").notEmpty(),
  save
);

router.post("/addinbulk", saveInBulk);

router.get("/list", Categorylist);

router.post(
  "/data",
  body("categoryName", "categoryName is require").notEmpty(),
  Categorydata
);

router.post(
  "/search",
  body("categoryName", "categoryName is require").notEmpty(),
  search
);

export default router;
