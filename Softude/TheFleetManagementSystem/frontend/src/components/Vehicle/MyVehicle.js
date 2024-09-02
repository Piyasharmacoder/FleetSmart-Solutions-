import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import { toast, ToastContainer } from "react-toastify";

const MyVehicle = () => {
  const vendorId = localStorage.getItem('vendorid');
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maintanenceactive, setmaintanenceactive] = useState(true);
  const [date, setDate] = useState(new Date());
  const [vehicleId, setVehicleId] = useState(null);

  useEffect(() => {
    axios.post("http://localhost:3001/vehicle/byvendorid", { vendorId: vendorId })
      .then(response => {
        setVehicles(response.data.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.error(err);
      });
  }, [vendorId]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3001/maintanence/add", {
        maintanenceDate: date,
        vehicleId: vehicleId
      });

      if (response.status === 200) {
        toast.success("Maintenance saved successfully.");
        setmaintanenceactive(true);
      }
    } catch (error) {
      if (error.response.status === 401)
        toast.warning("Vehicle is already added for Maintanence.");
      else
        toast.error("Error saving maintenance data. Please try again.");
      setmaintanenceactive(true);
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" />
        <p>Loading vehicles...</p>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className="container-fluid bg-light pt-3 position-relative">
        <div
          className="w-100 h-100 fixed-top justify-content-center position-absolute"
          style={{ display: maintanenceactive ? "none" : "flex", zIndex: "1", background: "rgba(0, 0, 0, .5)" }}
        >
          <div className="d-flex justify-content-center align-items-center vh-100 w-100">
            <div className="w-25 h-25 bg-light d-flex justify-content-center gap-3 align-items-center rounded rounded-3 flex-column position-relative">
              <button className="btn btn-outline-danger rounded-circle fw-bold position-absolute top-0 end-0 p-0 px-2 text-center m-1" style={{ cursor: "pointer" }} onClick={() => setmaintanenceactive(true)}>X</button>
              <h5 className="text-center text-success">Select Next Maintenance Date</h5>
              <DateTimePicker onChange={setDate} value={date} minDate={new Date()} format="dd-MM-y" />
              <button className="btn btn-success" onClick={handleSubmit}>Ok</button>
            </div>
          </div>
        </div>
        <h1 className="text-center text-success mt-2">My Vehicles</h1>
        {vehicles.length > 0 ? (
          <div className="row">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="col-sm-6 col-md-4 col-lg-3 mb-3">
                <div className="card h-100 d-flex flex-column shadow shadow-lg">
                  <img
                    src={vehicle.image || '/path/to/default/image.jpg'}
                    className="card-img-top"
                    height={200}
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
                  </div>
                  <button className="btn btn-success" onClick={() => { setmaintanenceactive(false); setVehicleId(vehicle.id); }}>
                    Set Maintenance
                  </button>
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
