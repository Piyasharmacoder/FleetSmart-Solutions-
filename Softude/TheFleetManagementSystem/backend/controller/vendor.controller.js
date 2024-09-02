import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import Vendor from "../model/vendor.model.js";

export const signUp = async (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty())
    return response.status(401).json({ error: errors.array() });

  const vender = await Vendor.findOne({ where: { email: request.body.email } });

  if (!vender) {
    Vendor.create({
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
      contactNumber: request.body.contactNumber,
    })
      .then((result) => {
        return response.status(200).json({ data: result.dataValues, message: "user created..." });
      })
      .catch((err) => {
        console.log(err);
        return response.status(500).json({ error: "Internal server error...", err });
      });
  } else {
    return response.status(400).json({ message: "user already exist..." });
  }
};

export const signIn = async (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty())
    return response.status(401).json({ error: errors.array() });

  let email = request.body.email;
  let password = request.body.password;

  let vender = await Vendor.findOne({ where: { email: email }, raw: true });
  if (vender) {
    if (Vendor.checkPassword(password, vender.password)) {
      let payload = { subject: email };
      let token = jwt.sign(payload, "fdfjfjrwieroerivxcnmvnnvrweiorddfsdfdlkfjlfjljlraj");
      return response.status(200).json({ message: "Sign In Success", user: { vender, token } });
    } else {
      return response.status(401).json({ error: "Unauthorized user" });
    }
  } else return response.status(401).json({ error: "Unauthorized user" });
};