import { DataTypes } from "sequelize";
import sequelize from "../db/dbconfig.js";
import Rental from "./rental.model.js";
import RentalItems from "./rentalitems.model.js";

const Vehicle = sequelize.define(
  "Vehicle",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    brand: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    rent: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    categoryname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    year: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    registration_number: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "Vehicles",
    timestamps: true,
    underscored: true,
  }
);

sequelize
  .sync()
  .then(() => {
    console.log("vehicle table created....");
  })
  .catch((err) => {
    console.log("something wrong....");
    console.log(err);
  });

Rental.belongsToMany(Vehicle, { through: RentalItems })
Vehicle.belongsToMany(Rental, { through: RentalItems })

export default Vehicle;
