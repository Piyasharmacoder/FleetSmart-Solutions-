import { DataTypes } from "sequelize";
import sequelize from "../db/dbconfig.js";

const RentalItems = sequelize.define("RentalItems", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    contactNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

RentalItems.sync()
    .then((result) => {
        console.log("RentalItems table created successfully");
    })
    .catch((err) => {
        console.log("Error in creating table", err);
    });

export default RentalItems;
