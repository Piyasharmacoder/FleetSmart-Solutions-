import { DataTypes } from "sequelize";
import sequelize from "../db/dbconfig.js";
import bcrypt from "bcryptjs";

// Define the User model
const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      const saltkey = bcrypt.genSaltSync(10);
      const encryptedPassword = bcrypt.hashSync(value, saltkey);
      this.setDataValue("password", encryptedPassword);
    },
  },
  contactNumber: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  },
});

// Add a method to check the password
User.checkPassword = (originalPassword, encryptedPassword) => {
  return bcrypt.compareSync(originalPassword, encryptedPassword);
};

// Sync the model with the database
sequelize
  .sync()
  .then(() => {
    console.log("User table created....");
  })
  .catch((err) => {
    console.log("Something went wrong....");
    console.log(err);
  });

export default User;
