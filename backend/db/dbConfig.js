import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  "FleetManagementSystem",
  process.env.ID,
  process.env.PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    timezone: "+05:30",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Datbase connected....");
  })
  .catch((err) => {
    console.log("Database Connection Failed..");
    console.log(err);
  });

export default sequelize;
