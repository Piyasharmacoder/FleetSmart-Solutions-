import { DataTypes } from "sequelize";
import sequelize from "../db/dbconfig.js";

// Define the Rental model
const Rental = sequelize.define("rental", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

// Export the Rental model
export default Rental;
