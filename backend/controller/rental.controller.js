import { validationResult } from "express-validator"
import Rental from "../model/rental.model.js";
import RentalItems from "../model/rentalitems.model.js";
import sequelize from "../db/dbconfig.js";
import Vehicle from "../model/vehicle.model.js";

export const addToRental = async (request, response, next) => {
    let transaction = await sequelize.transaction();
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty())
            return response.status(401).json({ error: "Bad request...", errors });

        let { userId, VehicleId, quantity } = request.body;
        let rental = await Rental.findOne({ where: { userId: userId } });

        if (rental) {
            let isExists = !! await RentalItems.findOne({ raw: true, where: { rentalId: rental.id, VehicleId } });
            if (isExists)
                return response.status(401).json({ message: "Vehicle is already added in rental" });

            await RentalItems.create({ rentalId: rental.id, VehicleId, quantity }, { transaction });
            await transaction.commit();
            return response.status(200).json({ message: 'Vehicle successfully added into rental' });
        }
        else {
            rental = await Rental.create({ userId: userId * 1 }, { transaction })
                .then(result => { return result.dataValues });

            await RentalItems.create({ rentalId: rental.id, VehicleId, quantity }, { transaction });
            await transaction.commit();
            return response.status(200).json({ message: 'Vehicle successfully added into rental' });
        }
    }
    catch (err) {
        await transaction.rollback();
        return response.status(500).json({ error: 'Internal Server Error...', err });
    }
}

export const fetchRentalItems = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    Rental.findAll({
        where: { userId: request.body.userId },
        include: [{ model: Vehicle, required: true }]
    })
        .then(result => {
            if (result[0])
                return response.status(200).json({ data: result });
            return response.status(401).json({ error: "data are not abelevel........" });
        }).catch(err => {
            return response.status(500).json({ error: "Internal Server Error", err });
        });
}

export const removeFromRental = async (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    let rental = await Rental.findOne({ where: { userId: request.body.userId } });
    if (rental) {
        RentalItems.destroy({ where: { rentalId: rental.id, VehicleId: request.body.VehicleId } })
            .then(result => {
                if (result)
                    return response.status(200).json({ message: "Item removed", removedItem: result });
                return response.status(401).json({ message: "unautherized request......", });
            }).catch(err => {
                return response.status(500).json({ error: "Internal Server Error", err });
            });
    } else {
        return response.status(401).json({ message: "unautherized request......", });
    }
}

export const update = async (req, res, next) => {
    let { VehicleId, quantity, userId } = req.body;
    try {
        const rental = await Rental.findOne({ where: { userId } });
        console.log(rental.id, VehicleId * 1);

        if (!rental) {
            return res.status(404).json({ message: "Rental not found" });
        }
        const updatedItems = await RentalItems.update(
            { quantity: quantity },
            { where: { rentalId: rental.id, VehicleId: VehicleId * 1 } }
        );
        return res.status(200).json({ message: "Quantity updated successfully", updatedItems });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
};