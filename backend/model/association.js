import Category from "./category.model.js";
import Maintanence from "./maintanence.model.js";
import Rental from "./rental.model.js";
import RentalItems from "./rentalitems.model.js";
import User from "./user.model.js";
import Vehicle from "./vehicle.model.js";
import Vendor from "./vendor.model.js";
console.log("Association Executed.......");

Category.hasMany(Vehicle, { foreignKey: "categoryname" });
Vehicle.belongsTo(Category, { foreignKey: "categoryname" });

Vendor.hasMany(Vehicle, { foreignKey: "vendorId", as: "vehicles" });
Vehicle.belongsTo(Vendor, { foreignKey: "vendorId", as: "vendor" })

User.hasOne(Rental);
Rental.belongsTo(User);

Rental.belongsToMany(Vehicle, { through: RentalItems });
Vehicle.belongsToMany(Rental, { through: RentalItems });

Vehicle.hasMany(Maintanence);
Maintanence.belongsTo(Vehicle);

export { Category, Vehicle, User, Rental, RentalItems, Maintanence };
