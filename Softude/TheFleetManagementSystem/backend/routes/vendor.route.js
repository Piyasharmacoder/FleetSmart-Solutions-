import express from "express";
import { body } from "express-validator";
import { signIn, signUp } from "../controller/vendor.controller.js";

const router = express.Router();

router.post("/signUp",
  body("email", "invalid email").isEmail(),
  body("email", "email is require").notEmpty(),
  body("password", "password is require").notEmpty(),
  body("name", "name is require").notEmpty(),
  body("contactNumber", "contactNumber is require").notEmpty(),
  signUp
);

router.post("/signIn",
  body("email", "invalid email").isEmail(),
  body("email", "email is require").notEmpty(),
  body("password", "password is require").notEmpty(),
  signIn
);

export default router;
