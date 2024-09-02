import { DataTypes } from "sequelize";
import sequelize from "../db/dbconfig.js";
import bcyrpt from "bcryptjs";

// Define the Vendor model
const Vendor = sequelize.define("Vendor", {
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
      let saltkey = bcyrpt.genSaltSync(10);
      let encryptedPassword = bcyrpt.hashSync(value, saltkey);
      this.setDataValue("password", encryptedPassword);
    },
  },
  contactNumber: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  }
});

Vendor.checkPassword = (originalPassword, encryptedPassword) => {
  console.log("check Password called....");
  return bcyrpt.compareSync(originalPassword, encryptedPassword);
};

// Sync the model with the database
sequelize.sync()
  .then(() => {
    console.log("Vender table created....");
  })
  .catch((err) => {
    console.log("something wrong....");
    console.log(err);
  });

export default Vendor;
