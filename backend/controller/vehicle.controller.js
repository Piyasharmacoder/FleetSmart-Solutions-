import { validationResult } from "express-validator";
import Vehicle from "../model/vehicle.model.js";

export const add = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Vehicle.create({
        name: request.body.name,
        model: request.body.model,
        registration_number: request.body.registration_number,
        image: request.body.image,
        user_id: request.body.user_id,
    })
        .then((result) => {
            return response.status(200).json({ data: result.dataValues, message: "add vehicle..." });
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({ error: "Internal server error...", err });
        })
}

export const update = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Vehicle.update(
        {
            name: request.body.name,
            model: request.body.model,
            registration_number: request.body.registration_number,
            image: request.body.image,
            user_id: request.body.user_id,
        },
        {
            where: { id: request.body.id },
            raw: true
        }
    )
        .then((result) => {
            if (result[0])
                return response.status(200).json({ message: 'vehicle data updated....' })
            return response.status(401).json({ message: 'unauthorized request....' })
        })
        .catch((err) => {
            return response.status(500).json({ error: 'internal server error....', err })
        })
}

export const view = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Vehicle.findOne({
        where: { id: request.body.id }, raw: true
    })
        .then((result) => {
            if (result)
                return response.status(200).json({ data: result });
            return response.status(401).json({ message: 'unauthorized request' });
        })
        .catch((err) => {
            return response.status(500).json({ error: 'internal server err.....' })
        })
}

export const list = (request, response, next) => {
    Vehicle.findAll({ raw: true })
        .then((result) => {
            return response.status(200).json({ data: result });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error...", err });
        })
}

export const remove = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Vehicle.destroy({
        where: { id: request.body.id }, raw: true
    })
        .then((result) => {
            if (result)
                return response.status(200).json({ message: 'vehicle deleted....' })
            return response.status(401).json({ message: 'unauthorized request....' })
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error.....", err })
        })
}