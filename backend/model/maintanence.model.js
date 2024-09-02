import { DataTypes } from "sequelize";
import sequelize from "../db/dbconfig.js";
import Vehicle from "./vehicle.model.js";

const Maintanence = sequelize.define("maintanence", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  maintanenceDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  maintanenceStatus: {
    type: DataTypes.ENUM('pending', 'success', 'cancel'),
    allowNull: false,
  },
  vehicleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Vehicle,
      key: "id",
    },
  },
});

Maintanence.sync()
  .then(() => {
    console.log("Maintanence table created successfully");
  })
  .catch((err) => {
    console.log("Error in creating Maintanence table", err);
  });

export default Maintanence;
