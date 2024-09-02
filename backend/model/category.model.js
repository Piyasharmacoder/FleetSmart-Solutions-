import { DataTypes } from "sequelize";
import sequelize from "../db/dbconfig.js";

// Define the Category model with its attributes
const Category = sequelize.define("category", {
    categoryName: {
        type: DataTypes.STRING,
        primaryKey: true // Set as primary key
    },
    use: {
        type: DataTypes.STRING,
        allowNull: false // Field cannot be null
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false // Field cannot be null
    },
    imageUrl: {
        type: DataTypes.STRING(1000),
        allowNull: false // Field cannot be null
    }
});

// Sync the Category model with the database to create the table
Category.sync()
    .then(() => {
        console.log("Category table created...");
    })
    .catch(err => {
        console.log(err);
    });

// Export the Category model
export default Category;
