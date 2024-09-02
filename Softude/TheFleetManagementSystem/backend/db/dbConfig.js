import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Initialize Sequelize with database connection details
const sequelize = new Sequelize(
  "FleetManagementSystem", // Database name
  process.env.ID, // Username from environment variables
  process.env.PASSWORD, // Password from environment variables
  {
    host: "localhost",
    dialect: "mysql", // Database type
    timezone: "+05:30", // Set timezone
  }
);

// Authenticate the database connection
sequelize.authenticate()
  .then(() => {
    console.log("Database connected....");
  })
  .catch((err) => {
    console.log("Database connection failed...");
    console.log(err);
  });

// Export the sequelize instance
export default sequelize;
