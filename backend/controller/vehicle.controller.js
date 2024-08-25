import { validationResult } from "express-validator";
import Vehicle from "../model/vehicle.model.js";
import Category from "../model/category.model.js";

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
  })
    .then((result) => {
      return response.status(200).json({ message: "Vehicle Saved...." });
    })
    .catch((err) => {
      return response.status(500).json({ error: "Internal server error...", err });
    })
};

export const saveInBulk = async (request, response, next) => {

  try {
    let vehicleList = request.body;

    for (let vehicle of vehicleList) {
      let { id, brand, model, rent, description, categoryname, year, registration_number, image } = vehicle;

      let vehiclenumber = await Vehicle.findOne({ where: { registration_number } });
      let category = await Category.findOne({ where: { categoryName: categoryname } });
      if (!vehiclenumber && category)
        await Vehicle.create({
          id, brand, model, rent, description, categoryname, year, registration_number, image
        })
    }
    return response.status(200).json({ message: "All Vehicles Saved...." });
  } catch (err) {
    return response.status(500).json({ error: "Internal Server Error", err });
  }
}

export const update = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty())
    return response.status(401).json({ error: errors.array() });

  Vehicle.update(
    {
      brand: request.body.brand,
      model: request.body.model,
      rent: request.body.rent,
      description: request.body.description,
      categoryname: request.body.categoryname,
      year: request.body.year,
      registration_number: request.body.registration_number,
      image: request.body.image,
    },
    {
      where: { id: request.body.id },
      raw: true,
    }
  )
    .then((result) => {
      if (result[0])
        return response
          .status(200)
          .json({ message: "vehicle data updated...." });
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

  Vehicle.findOne({
    where: { id: request.body.id },
    raw: true,
  })
    .then((result) => {
      if (result) return response.status(200).json({ data: result });
      return response.status(401).json({ message: "unauthorized request" });
    })
    .catch((err) => {
      return response.status(500).json({ error: "internal server err....." });
    });
};

export const list = (request, response, next) => {
  Vehicle.findAll({ raw: true })
    .then((result) => {
      return response.status(200).json({ data: result });
    })
    .catch((err) => {
      return response.status(500).json({ error: "Internal server error...", err });
    });
};

export const byCategory = (request, response, next) => {
  Vehicle.findAll({ where: { categoryname: request.body.categoryName } })
    .then(result => {
      if (result[0])
        return response.status(200).json({ productList: result })
      return response.status(401).json({ error: "Unauthorized request" });
    }).catch(err => {
      return response.status(500).json({ error: "Internal Server Error", err });
    })
}

export const remove = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty())
    return response.status(401).json({ error: errors.array() });

  Vehicle.destroy({
    where: { id: request.body.id },
    raw: true,
  })
    .then((result) => {
      if (result)
        return response.status(200).json({ message: "vehicle deleted...." });
      return response.status(401).json({ message: "unauthorized request...." });
    })
    .catch((err) => {
      return response.status(500).json({ error: "Internal server error.....", err });
    });
};
