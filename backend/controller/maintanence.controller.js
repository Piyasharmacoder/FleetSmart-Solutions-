import { validationResult } from "express-validator";
import Maintanence from "../model/maintanence.model.js";

export const add = async (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    const data = await Maintanence.findOne({ where: { vehicleId: request.body.vehicleId, maintanenceStatus: 'pending' } })
    console.log(data);

    if (data)
        return response.status(401).json({ message: "Vehicle is already added for Maintanence" });

    Maintanence.create({
        maintanenceDate: request.body.maintanenceDate,
        maintanenceStatus: 'pending',
        vehicleId: request.body.vehicleId,
    })
        .then((result) => {
            return response.status(200).json({ message: "Maintanence Saved...." });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error...", err });
        })

};

export const update = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Maintanence.update({
        maintanenceDate: request.body.maintanenceDate,
        maintanenceStatus: request.body.maintanenceStatus,
    }, {
        where: { vehicleId: request.body.vehicleId, maintanenceStatus: 'pending' },
        raw: true,
    })
        .then((result) => {
            if (result[0])
                return response.status(200).json({ message: "Maintanence updated...." });
            return response.status(401).json({ message: "unauthorized request...." });
        })
        .catch((err) => {
            return response.status(500).json({ error: "internal server error....", err });
        });
};