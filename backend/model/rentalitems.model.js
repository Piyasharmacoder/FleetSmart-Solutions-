import { DataTypes } from "sequelize";
import sequelize from "../db/dbconfig.js";

// Define the RentalItems model
const RentalItems = sequelize.define("RentalItems", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  work: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  work_place: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  time: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Sync the model with the database
RentalItems.sync()
  .then(() => {
    console.log("RentalItems table created successfully");
  })
  .catch((err) => {
    console.log("Error in creating table", err);
  });

export default RentalItems;
