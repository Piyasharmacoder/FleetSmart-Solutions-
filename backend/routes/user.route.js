import express from "express";
import {
  list,
  view,
  remove,
  signUp,
  signIn,
  update,
} from "../controller/user.controller.js";
import { verifyToken } from "../middleware/auth.js";
import { body, check } from "express-validator";

const router = express.Router();

router.post(
  "/signUp",
  body("email", "invalid email").isEmail(),
  body("email", "email is require").notEmpty(),
  body("password", "password is require").notEmpty(),
  body("name", "name is require").notEmpty(),
  body("contactNumber", "contactNumber is require").notEmpty(),
  signUp
);

router.post(
  "/signIn",
  body("email", "invalid email").isEmail(),
  body("email", "email is require").notEmpty(),
  body("password", "password is require").notEmpty(),
  signIn
);

router.put(
  "/update",
  body("id", "invalid id").isNumeric(),
  body("id", "id is require").notEmpty(),
  body("email", "invalid email").isEmail(),
  body("email", "email is require").notEmpty(),
  body("password", "password is require").notEmpty(),
  body("name", "name is require").notEmpty(),
  body("contactNumber", "contactNumber is require").notEmpty(),
  update
);

router.post(
  "/view",
  check("email", "invalid email").isEmail(),
  check("email", "email is require").notEmpty(),
  view
);

router.get("/list", list);

router.delete(
  "/remove",
  body("email", "invalid email").isEmail(),
  body("email", "email is require").notEmpty(),
  remove
);

export default router;
