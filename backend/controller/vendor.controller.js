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
      return response.status(200).json({ message: "Sign In Success", vender, token: token });
    } else {
      return response.status(401).json({ error: "Unauthorized user" });
    }
  } else return response.status(401).json({ error: "Unauthorized user" });
};

export const update = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty())
    return response.status(401).json({ error: errors.array() });

  Vendor.update(
    {
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
      contactNumber: request.body.contactNumber,
    },
    {
      where: { id: request.body.id },
      raw: true,
    }
  )
    .then((result) => {
      if (result[0])
        return response.status(200).json({ message: "user updated...." });
      return response.status(401).json({ message: "unauthorized request...." });
    })
    .catch((err) => {
      return response
        .status(500)
        .json({ error: "internal server error....", err });
    });
};

export const view = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty())
    return response.status(401).json({ error: errors.array() });

  Vendor.findOne({ where: { email: request.body.email }, raw: true, })
    .then((result) => {
      if (result) return response.status(200).json({ data: result });
      return response.status(401).json({ message: "unauthorized request" });
    })
    .catch((err) => {
      return response.status(500).json({ error: "internal server err....." });
    });
};

export const list = (request, response, next) => {
    Vendor.findAll({ raw: true })
    .then((result) => {
      return response.status(200).json({ data: result });
    })
    .catch((err) => {
      return response.status(500).json({ error: "Internal server error...", err });
    });
};

export const remove = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty())
    return response.status(401).json({ error: errors.array() });

  Vendor.destroy({
    where: { email: request.body.email },
    raw: true,
  })
    .then((result) => {
      if (result)
        return response.status(200).json({ message: "user deleted...." });
      return response.status(401).json({ message: "unauthorized request...." });
    })
    .catch((err) => {
      return response.status(500).json({ error: "Internal server error.....", err });
    });
};
