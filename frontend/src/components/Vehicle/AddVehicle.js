import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddVehicle = () => {
  const [vehicle, setVehicle] = useState({
    brand: "",
    model: "",
    rent: "",
    description: "",
    categoryname: "",
    year: "",
    registration_number: "",
    image: "",
    vendorId: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields before sending request
    const {
      brand,
      model,
      rent,
      description,
      categoryname,
      year,
      registration_number,
      image,
      vendorId,
    } = vehicle;

    if (
      !brand ||
      !model ||
      !rent ||
      !description ||
      !categoryname ||
      !year ||
      !registration_number ||
      !image ||
      !vendorId
    ) {
      setError("All fields must be filled.");
      return;
    }

    try {
      setError(null);
      const response = await axios.post(
        "http://localhost:3001/vehicle/add",
        vehicle
      );
      if (response.status === 200) {
        toast.success("Vehicle added successfully!");
        setVehicle({
          brand: "",
          model: "",
          rent: "",
          description: "",
          categoryname: "",
          year: "",
          registration_number: "",
          image: "",
          vendorId: "",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add vehicle. Please try again.");
    }
  };

  return (
    <div className="container shadow my-4">
      <ToastContainer />
      <h2 className="text-center">Add New Vehicle</h2>
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div className="form-row d-flex flex-wrap justify-content-sm-between justify-content-center">
          <div className="form-group my-2">
            <label>Brand</label>
            <input
              type="text"
              className="form-control"
              name="brand"
              value={vehicle.brand}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group my-2">
            <label>Model</label>
            <input
              type="text"
              className="form-control"
              name="model"
              value={vehicle.model}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group my-2">
            <label>Rent</label>
            <input
              type="number"
              className="form-control"
              name="rent"
              value={vehicle.rent}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group my-2">
            <label>Description</label>
            <textarea
              className="form-control"
              name="description"
              value={vehicle.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group my-2">
            <label>Category Name</label>
            <input
              type="text"
              className="form-control"
              name="categoryname"
              value={vehicle.categoryname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group my-2">
            <label>Year</label>
            <input
              type="number"
              className="form-control"
              name="year"
              value={vehicle.year}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group my-2">
            <label>Registration Number</label>
            <input
              type="text"
              className="form-control"
              name="registration_number"
              value={vehicle.registration_number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group my-2">
            <label>Image URL</label>
            <input
              type="text"
              className="form-control"
              name="image"
              value={vehicle.image}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group my-2">
            <label>Vendor ID</label>
            <input
              type="text"
              className="form-control"
              name="vendorId"
              value={vehicle.vendorId}
              onChange={handleChange}
              required
            />
          </div>
        </div>
          <button type="submit" className="w-100 btn btn-primary my-2">
            Add Vehicle
          </button>
      </form>
    </div>
  );
};

export default AddVehicle;
