import { DataTypes } from "sequelize";
import sequelize from "../db/dbconfig.js";

const Rental = sequelize.define("rental", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

export default Rental;
