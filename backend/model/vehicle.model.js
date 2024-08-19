import { DataTypes } from "sequelize";
import sequelize from "../db/dbconfig.js";

const Vehicle = sequelize.define('Vehicle', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    model: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    registration_number: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    image: {
        type: DataTypes.STRING(5000),
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users', // name of the Users table
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
}, {
    tableName: 'Vehicles',
    timestamps: true,
    underscored: true,
});

sequelize.sync()
    .then(() => {
        console.log("vehicle table created....")
    })
    .catch((err) => {
        console.log("something wrong....")
        console.log(err);
    });

export default Vehicle;