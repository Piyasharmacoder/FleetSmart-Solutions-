import { DataTypes } from "sequelize";
import sequelize from "../db/dbconfig.js";
import Vendor from "./vendor.model.js";

// Define the Vehicle model
const Vehicle = sequelize.define("Vehicle", {
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
  vendorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Vendor,
      key: "id",
    },
  },
}, {
  tableName: "Vehicles",
  timestamps: true,
  underscored: true,
});

// Sync the model with the database
sequelize.sync()
  .then(() => {
    console.log("Vehicle table created....");
  })
  .catch((err) => {
    console.log("Something went wrong....");
    console.log(err);
  });

export default Vehicle;
