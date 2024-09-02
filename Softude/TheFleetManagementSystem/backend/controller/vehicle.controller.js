import { validationResult } from "express-validator";
import Vehicle from "../model/vehicle.model.js";
import Category from "../model/category.model.js";
import Vendor from "../model/vendor.model.js";
import Rental from "../model/rental.model.js";
import User from "../model/user.model.js";
import Maintanence from "../model/maintanence.model.js";

// Add a new vehicle
export const add = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty())
    return response.status(401).json({ error: errors.array() });

  Vehicle.create({
    brand: request.body.brand,
    model: request.body.model,
    rent: request.body.rent,
    description: request.body.description,
    categoryname: request.body.categoryname,
    year: request.body.year,
    registration_number: request.body.registration_number,
    image: request.body.image,
    vendorId: request.body.vendorId,
  })
    .then(() => response.status(200).json({ message: "Vehicle Saved...." }))
    .catch(err => response.status(500).json({ error: "Internal server error...", err }));
};

// Save multiple vehicles in bulk
export const saveInBulk = async (request, response, next) => {
  try {
    let vehicleList = request.body;
    for (let vehicle of vehicleList) {
      let { id, brand, model, rent, description, categoryname, year, registration_number, image, vendorId } = vehicle;
      let vehiclenumber = await Vehicle.findOne({ where: { registration_number } });
      let category = await Category.findOne({ where: { categoryName: categoryname } });
      if (!vehiclenumber && category)
        await Vehicle.create({ id, brand, model, rent, description, categoryname, year, registration_number, image, vendorId });
    }
    return response.status(200).json({ message: "All Vehicles Saved...." });
  } catch (err) {
    return response.status(500).json({ error: "Internal Server Error", err });
  }
};

// Update vehicle details
export const update = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty())
    return response.status(401).json({ error: errors.array() });

  Vehicle.update({
    brand: request.body.brand,
    model: request.body.model,
    rent: request.body.rent,
    description: request.body.description,
    categoryname: request.body.categoryname,
    year: request.body.year,
    registration_number: request.body.registration_number,
    image: request.body.image,
    vendorId: request.body.vendorId,
  }, {
    where: { id: request.body.id },
    raw: true,
  })
    .then(result => result[0] ? response.status(200).json({ message: "vehicle data updated...." }) : response.status(401).json({ message: "unauthorized request...." }))
    .catch(err => response.status(500).json({ error: "internal server error....", err }));
};

// List all vehicles
export const list = (request, response, next) => {
  Vehicle.findAll({ raw: true })
    .then(result => response.status(200).json({ data: result }))
    .catch(err => response.status(500).json({ error: "Internal server error...", err }));
};

// List vehicles by category
export const byCategory = (request, response, next) => {
  Vehicle.findAll({
    where: { categoryname: request.body.categoryName },
    include: [{ model: Vendor, as: "vendor" }] // Include associated Vendor
  })
    .then(result => result.length > 0 ? response.status(200).json({ vehicleList: result }) : response.status(404).json({ error: "No vehicles found for the specified category" }))
    .catch(err => response.status(500).json({ error: "Internal Server Error", err }));
};

// List vehicles by vendor ID
export const byVendorId = (request, response, next) => {
  Vehicle.findAll({
    where: { vendorId: request.body.vendorId },
    raw: true,
  })
    .then(result => result ? response.status(200).json({ data: result }) : response.status(401).json({ message: "unauthorized request" }))
    .catch(err => response.status(500).json({ error: "Internal server error...", err }));
};

// Fetch vehicles and associated users
export const fetchVehicleUser = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty())
    return response.status(401).json({ error: errors.array() });

  Vehicle.findAll({
    where: { vendorId: request.body.vendorId, active: 0 },
    include: [{ model: Rental, required: true, include: [{ model: User, required: true }] }],
  })
    .then(result => result[0] ? response.status(200).json({ data: result }) : response.status(401).json({ error: "data are not available........" }))
    .catch(err => response.status(500).json({ error: "Internal Server Error", err }));
};

// Fetch vehicles with maintenance records
export const fetchVehicleMaintanence = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty())
    return response.status(401).json({ error: errors.array() });

  Vehicle.findAll({
    where: { vendorId: request.body.vendorId },
    include: [{ model: Maintanence, required: true }],
  })
    .then(result => result[0] ? response.status(200).json({ data: result }) : response.status(401).json({ error: "data are not available........" }))
    .catch(err => response.status(500).json({ error: "Internal Server Error", err }));
};

// Fetch vehicles with specific maintenance status
export const fetchVehicleMaintanenceStatus = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty())
    return response.status(401).json({ error: errors.array() });

  Vehicle.findAll({
    where: { vendorId: request.body.vendorId },
    include: [{ model: Maintanence, required: true, where: { maintanenceStatus: request.body.maintanenceStatus } }],
  })
    .then(result => result[0] ? response.status(200).json({ data: result }) : response.status(401).json({ error: "data are not available........" }))
    .catch(err => response.status(500).json({ error: "Internal Server Error", err }));
};

// Remove a vehicle
export const remove = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty())
    return response.status(401).json({ error: errors.array() });

  Vehicle.destroy({
    where: { id: request.body.id },
    raw: true,
  })
    .then(result => result ? response.status(200).json({ message: "vehicle deleted...." }) : response.status(401).json({ message: "unauthorized request...." }))
    .catch(err => response.status(500).json({ error: "Internal server error.....", err }));
};
