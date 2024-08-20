import Category from "./category.model.js";
import Vehicle from "./vehicle.model.js";
console.log("Association Executed.......");

//category
Category.hasMany(Vehicle, { foreignKey: "categoryname" });
Vehicle.belongsTo(Category, { foreignKey: "categoryname" });

// Category.hasMany(HomeRemedy, { foreignKey: "categoryname" });
// HomeRemedy.belongsTo(Category, { foreignKey: "categoryname", targetKey: "categoryName" });

// Category.hasMany(Yoga, { foreignKey: "categoryname" });
// Yoga.belongsTo(Category, { foreignKey: "categoryname", targetKey: "categoryName" });

// // order
// Order.hasMany(orderItem, { foreignKey: "id" });
// orderItem.belongsTo(Order, { foreignKey: "orderId", targetKey: "id" });

// // product

// // product
// Product.hasMany(orderItem, { foreignKey: "id" });
// orderItem.belongsTo(Product, { foreignKey: "productId", targetKey: "id", onDelete: 'CASCADE' });

// // user
// User.hasMany(Order, { foreignKey: 'userId'  }); // A user can have many orders
// Order.belongsTo(User, { foreignKey: 'userId' });

// // appointment
// Doctor.hasMany(Appointment, { foreignKey: 'doctorId', onDelete: 'CASCADE' })
// Appointment.belongsTo(Doctor, { foreignKey: 'doctorId', onDelete: 'CASCADE' })

// // consults
// Doctor.hasMany(Consult, { foreignKey: 'doctorId', onDelete: 'CASCADE' })
// Consult.belongsTo(Doctor, { foreignKey: 'doctorId', onDelete: 'CASCADE' })

// // User.hasMany(Appointment, { foreignKey: 'userId', onDelete: 'CASCADE' })
// // Appointment.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' })

// // doctordetails
// Doctor.hasOne(DoctorDetail, { foreignKey: "id" });
// DoctorDetail.belongsTo(Doctor, { foreignKey: "doctorId", targetKey: "id" });

// User.hasOne(Cart);
// Cart.belongsTo(User);

// Cart.belongsToMany(Product, { through: CartItems });
// Product.belongsToMany(Cart, { through: CartItems });

export { Category, Vehicle };
