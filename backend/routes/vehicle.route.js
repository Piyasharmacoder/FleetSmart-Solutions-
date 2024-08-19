import express from 'express';
import { add, list, remove, update, view } from '../controller/vehicle.controller.js';
import { verifyToken } from '../middleware/auth.js';
import { body, check } from 'express-validator';

const router = express.Router();

router.post("/add",
    body("name", "name is require").notEmpty(),
    body("model", "model is require").notEmpty(),
    body("registration_number", "registration_number is require").notEmpty(),
    body("image", "image is require").notEmpty(),
    body("user_id", "user_id is require").notEmpty().isNumeric(),
    add);

router.put("/update",
    body("name", "name is require").notEmpty(),
    body("model", "model is require").notEmpty(),
    body("registration_number", "registration_number is require").notEmpty(),
    body("image", "image is require").notEmpty(),
    body("user_id", "user_id is require").notEmpty().isNumeric(),
    body("id", "id is require").notEmpty().isNumeric(),
    update);

router.post("/view",
    body("id", "id is require").notEmpty().isNumeric(),
    view);

router.get("/list", list);

router.delete("/remove",
    body("id", "id is require").notEmpty().isNumeric(),
    remove);


export default router;