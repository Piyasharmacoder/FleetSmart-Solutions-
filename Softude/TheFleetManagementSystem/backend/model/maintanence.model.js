import { DataTypes } from "sequelize";
import sequelize from "../db/dbconfig.js";
import Vehicle from "./vehicle.model.js";

// Define the Maintanence model with its attributes
const Maintanence = sequelize.define("maintanence", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, // Set as primary key
    autoIncrement: true, // Auto-incrementing ID
  },
  maintanenceDate: {
    type: DataTypes.DATE,
    allowNull: false, // Field cannot be null
  },
  maintanenceStatus: {
    type: DataTypes.ENUM('pending', 'success', 'cancel'), // Enum for status
    allowNull: false, // Field cannot be null
  },
  vehicleId: {
    type: DataTypes.INTEGER,
    allowNull: false, // Field cannot be null
    references: {
      model: Vehicle, // Reference to the Vehicle model
      key: "id", // Reference to the ID field in Vehicle
    },
  },
});

// Sync the Maintanence model with the database to create the table
Maintanence.sync()
  .then(() => {
    console.log("Maintanence table created successfully");
  })
  .catch((err) => {
    console.log("Error in creating Maintanence table", err);
  });

// Export the Maintanence model
export default Maintanence;
