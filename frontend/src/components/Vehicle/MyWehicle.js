import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./MyVehicle.css";  // Import the CSS file

const MyVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const vendorId = localStorage.getItem('vendorid');

  useEffect(() => {
    axios.post("http://localhost:3001/vehicle/byvendorid", { vendorId: vendorId })
      .then(response => {
        setVehicles(response.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to load vehicles. Please try again later.");
        setLoading(false);
      });
  }, [vendorId]);

  if (loading) {
    return <div className="text-center">Loading vehicles...</div>;
  }

  return (
    <>
      <ToastContainer />
      <div className="container-fluid bg-light pt-3">
        <h1 className="text-center text-success mt-2">My Vehicles</h1>
        {vehicles.length > 0 ? (
          <div className="row">
            {vehicles.map((vehicle, index) => (
              <div key={index} className="col-sm-6 col-md-4 col-lg-3 mb-3">
                <div className="card h-100 d-flex flex-column">
                  <img
                    src={vehicle.image}
                    className="card-img-top"
                    alt={`${vehicle.brand} ${vehicle.model}`}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{vehicle.brand}</h5>
                    <p className="card-text">{vehicle.model}</p>
                    <p className="card-text">Rent: ₹{vehicle.rent}/hr</p>
                    <p className="card-text">
                      <small className="text-muted">{vehicle.description}</small>
                    </p>
                    <p className="card-text">
                      <strong>Year:</strong> {vehicle.year}
                    </p>
                    <p className="card-text">
                      <strong>Reg No:</strong> {vehicle.registration_number}
                    </p>
                    <div className="mt-auto">
                      {/* This ensures that any additional content sticks to the bottom */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="container py-3">
            <p className="text-center">No vehicles found.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default MyVehicle;
