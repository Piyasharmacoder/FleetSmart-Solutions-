import express from "express";
import bodyParser from "body-parser";
import UserRouter from "./routes/user.route.js";
import RentalRouter from "./routes/rental.route.js";
import VehicleRouter from "./routes/vehicle.route.js";
import VendorRouter from "./routes/vendor.route.js";
import CategoryRouter from "./routes/category.route.js";
import MaintanenceRouter from "./routes/maintanence.route.js";
import "./model/association.js"; // Importing associations between models
import cors from "cors";

const app = express(); // Initializing the Express application

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); // Enabling CORS for cross-origin requests

// Setting up routes for different entities
app.use("/user", UserRouter);
app.use("/vendor", VendorRouter);
app.use("/category", CategoryRouter);
app.use("/vehicle", VehicleRouter);
app.use("/rental", RentalRouter);
app.use("/maintanence", MaintanenceRouter);

// Handling 404 errors for undefined routes
app.use((request, response) => {
  response.status(404).json({ message: "Page not found" });
});

// Starting the server on port 3001
app.listen(3001, () => {
  console.log("Server started on port 3001...");
});
