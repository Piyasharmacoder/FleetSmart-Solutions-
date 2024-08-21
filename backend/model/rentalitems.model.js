import { DataTypes } from "sequelize";
import sequelize from "../db/dbconfig.js";

const RentalItems = sequelize.define("RentalItems", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
});

RentalItems.sync()
    .then((result) => {
        console.log("rental table created successfully");
    })
    .catch((err) => {
        console.log("error in created table", err);
    });

export default RentalItems;