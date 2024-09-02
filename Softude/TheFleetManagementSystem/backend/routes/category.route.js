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

// Add a single category
router.post(
  "/add",
  [
    body("categoryName", "Category name is required").notEmpty(),
    body("use", "Use field is required").notEmpty(),
    body("description", "Description is required").notEmpty(),
    body("imageUrl", "Image URL is required").notEmpty(),
  ],
  save
);

// Add multiple categories in bulk
router.post("/addinbulk", saveInBulk);

// List all categories
router.get("/list", Categorylist);

// Get category data by category name
router.post(
  "/data",
  [body("categoryName", "Category name is required").notEmpty()],
  Categorydata
);

// Search for categories by name
router.post(
  "/search",
  [body("categoryName", "Category name is required").notEmpty()],
  search
);

export default router;
