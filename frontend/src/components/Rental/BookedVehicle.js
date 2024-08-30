import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookedVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const vendorId = localStorage.getItem("vendorid");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.post("http://localhost:3001/vehicle/fetchVehicleUser", { vendorId });
        setVehicles(response.data.data);
      } catch (err) {
        setError("Failed to load booked vehicles. Please try again later.");
        toast.error("Failed to load booked vehicles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, [vendorId]);

  if (loading) {
    return <div className="text-center">Loading vehicles...</div>;
  }

  return (
    <div className="container-fluid bg-light pt-3">
      <ToastContainer />
      <h1 className="text-center text-success mt-2">Booked Vehicles</h1>
      {error && (
        <div className="text-center text-danger">  <p>{error}</p></div>
      )}
      {vehicles.length > 0 ? (
        vehicles.map((vehicle, index) => (
          <div key={index} className="container col-9 py-3">
            <div className="card shadow border p-2">
              <div className="row no-gutters">
                <div className="col-md-5 d-flex align-items-center">  <img className="card-img" src={vehicle.image} alt={`${vehicle.brand} ${vehicle.model}`} /></div>
                <div className="col-md-7 d-flex align-items-center">
                  <div className="card-body p-0">
                    <h6 className="card-title m-1 fw-bolder">{vehicle.brand}</h6>
                    <h6 className="card-title m-1">{vehicle.model}</h6>
                    <h6 className="card-title m-1">{vehicle.categoryname}</h6>
                    <p className="card-text text-success fw-bold m-1">  ₹{vehicle.rent} <small className="fw-lighter">/hr</small></p>
                    <p className="card-text m-1">  <mark className="fw-bold m-0 p-0 py-1">    {vehicle.registration_number}  </mark></p>
                    {vehicle.rentals.map((rental, i) => (
                      <div key={i} className="mb-3">
                        <p className="card-text m-1">  <img src="https://png.pngtree.com/png-clipart/20220429/original/pngtree-pin-location-icon-with-folded-map-png-image_7581594.png" height={40} alt="location icon" />  <small className="text-muted">  {rental.RentalItems.work_place}</small></p>
                        <p className="card-text m-1">  <strong>Date Of Booking:</strong>{" "}  {new Date(rental.RentalItems.date).toLocaleString()}</p>
                        <p className="card-text m-1">  <strong>Booked by:</strong> {rental.user.name} -{" "}  {rental.user.contactNumber}</p>
                        <p className="card-text m-1">  <strong>Work:</strong>{" "}  {rental.RentalItems.work}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="container py-3">  <p className="text-center">No booked vehicles found.</p></div>
      )}
    </div>
  );
};

export default BookedVehicle;
