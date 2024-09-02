import { DataTypes } from "sequelize";
import sequelize from "../db/dbconfig.js";

const Category = sequelize.define("category", {
    categoryName: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    use: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING(1000),
        allowNull: false
    }
});

Category.sync()
    .then(() => {
        console.log("category table created...")
    }).catch(err => {
        console.log(err)
    })

export default Category; 