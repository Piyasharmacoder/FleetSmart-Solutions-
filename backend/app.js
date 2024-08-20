import express from "express";
import bodyParser from "body-parser";
import UserRouter from "./routes/user.route.js";
import VehicleRouter from "./routes/vehicle.route.js";
import CategoryRouter from "./routes/category.route.js";
import "./model/association.js";
import cors from "cors";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/user", UserRouter);
app.use("/vehicle", VehicleRouter);
app.use("/category", CategoryRouter);

app.use((request, response) => {
  response.status(404).json({ message: "Page not found" });
});

app.listen(3001, () => {
  console.log("server started.....");
});
