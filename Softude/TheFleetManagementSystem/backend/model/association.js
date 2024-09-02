import Category from "./category.model.js";
import Maintanence from "./maintanence.model.js";
import Rental from "./rental.model.js";
import RentalItems from "./rentalitems.model.js";
import User from "./user.model.js";
import Vehicle from "./vehicle.model.js";
import Vendor from "./vendor.model.js";

// Log to confirm associations are executed
console.log("Association Executed.......");

// Define relationships between models

// Category has many Vehicles, and each Vehicle belongs to one Category
Category.hasMany(Vehicle, { foreignKey: "categoryname" });
Vehicle.belongsTo(Category, { foreignKey: "categoryname" });

// Vendor has many Vehicles, and each Vehicle belongs to one Vendor
Vendor.hasMany(Vehicle, { foreignKey: "vendorId", as: "vehicles" });
Vehicle.belongsTo(Vendor, { foreignKey: "vendorId", as: "vendor" });

// User has one Rental, and each Rental belongs to one User
User.hasOne(Rental);
Rental.belongsTo(User);

// Rental can have many Vehicles through RentalItems, and vice versa
Rental.belongsToMany(Vehicle, { through: RentalItems });
Vehicle.belongsToMany(Rental, { through: RentalItems });

// Vehicle has many Maintenances, and each Maintenance belongs to one Vehicle
Vehicle.hasMany(Maintanence);
Maintanence.belongsTo(Vehicle);

// Export models with associations
export { Category, Vehicle, User, Rental, RentalItems, Maintanence };
