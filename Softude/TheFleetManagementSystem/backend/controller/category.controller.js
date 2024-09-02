import { validationResult } from "express-validator";
import Category from "../model/category.model.js";
import Vehicle from "../model/vehicle.model.js";
import { Op } from "sequelize";

// Save a new category
export const save = async (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty())
    return response.status(401).json({ error: errors.array() });

  const category = await Category.findOne({ where: { categoryName: request.body.categoryName } });

  if (!category) {
    Category.create({
      categoryName: request.body.categoryName,
      use: request.body.use,
      description: request.body.description,
      imageUrl: request.body.imageUrl,
    })
      .then((result) => {
        return response.status(200).json({ data: result.dataValues, message: "Category created..." });
      })
      .catch((err) => {
        return response.status(500).json({ error: "Internal server error...", err });
      });
  } else {
    return response.status(400).json({ message: "Category already exists..." });
  }
};

// Save multiple categories in bulk
export const saveInBulk = async (request, response, next) => {
  try {
    let categoryList = request.body;

    for (let category of categoryList) {
      let { categoryName, imageUrl, use, description } = category;

      let existingCategory = await Category.findOne({ where: { categoryName } });
      if (!existingCategory)
        await Category.create({ categoryName, use, description, imageUrl });
    }
    return response.status(200).json({ message: "All categories saved.." });
  } catch (err) {
    return response.status(500).json({ error: "Internal Server Error", err });
  }
};

// List all categories
export const Categorylist = (request, response, next) => {
  Category.findAll()
    .then((result) => {
      return response.status(200).json({ categories: result });
    })
    .catch((err) => {
      return response.status(500).json({ error: "Internal server error", err });
    });
};

// Get category data including associated vehicles
export const Categorydata = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty())
    return response.status(401).json({ error: errors.array() });

  Category.findAll({
    where: { categoryName: request.body.categoryName },
    include: [{ model: Vehicle, required: true }],
  })
    .then((result) => {
      if (result) return response.status(200).json({ categories: result });
      return response.status(401).json({ message: "Unauthorized request" });
    })
    .catch((err) => {
      return response.status(500).json({ error: "Internal server error", err });
    });
};

// Search categories by keywords
export const search = async (request, response, next) => {
  try {
    const query = request.body.category;
    const keywords = query
      .toLowerCase()
      .split(" ")
      .filter((word) => word.length > 0);

    const searchResults = await Category.findAll({
      where: {
        categoryName: {
          [Op.or]: keywords.map((keyword) => ({ [Op.like]: `%${keyword}%` })),
        },
      },
    });
    return response.status(200).json(searchResults);
  } catch (error) {
    console.error("Error during search:", error);
    return response.status(500).json({ error: "An error occurred during search.", error });
  }
};
