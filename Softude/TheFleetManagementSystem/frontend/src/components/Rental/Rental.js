import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function Rental() {
  const { state } = useLocation();
  const [datetime, setDateTime] = useState(new Date());
  const maxBookingDate = new Date();
  maxBookingDate.setMonth(maxBookingDate.getMonth() + 1);
  const [duration, setDuration] = useState("");
  const [workDescription, setWorkDescription] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!datetime || !duration || !workDescription || !address || !localStorage.getItem("userid") || !state.id) {
      setError("All fields must be filled.");
      return;
    } else {
      setError(null);
      axios
        .post('http://localhost:3001/rental/add', {
          userId: localStorage.getItem("userid"),
          VehicleId: state.id,
          date: datetime,
          time: duration,
          work: workDescription,
          work_place: address,
        })
        .then((response) => {
          if (response.status === 200) {
            toast.success("Booking Successfuly....");
            setTimeout(() => { navigate('/') }, 2000)
          }
        })
        .catch((err) => {
          if (err.response.status === 400) {
            toast.info("vehicle already booked...");
          } else {
            toast.error("internal error...");
          }
        });
    }
  };

  return (
    <div className="container-fluid bg-light pt-3">
      <ToastContainer />
      <div className="container py-3">
        <div className="card shadow border p-3">
          <div className="row no-gutters">
            <div className="col-md-5 d-flex align-items-center">  <img className="card-img" src={state.image} alt={state.model} /></div>
            <div className="col-md-7 d-flex align-items-center">
              <div className="card-body p-0">
                <h5 className="card-title m-1 fw-bolder">{state.brand}</h5>
                <h5 className="card-title m-1">{state.model}</h5>
                <h5 className="card-title m-1">{state.categoryname}</h5>
                <p className="card-text text-success fw-bold m-1">  ₹{state.rent}  <small className="fw-lighter"> /hr</small> [Inclusive of all  Taxes]</p>
                <p className="card-text m-1">  <small className="text-muted">{state.description}</small></p>
                <p className="card-text m-1">  Manufacturing Year : {state.year}</p>
                <p className="card-text m-1">  <mark className="fw-bold m-0 p-0">    {state.registration_number}  </mark></p>
                <p className="card-text fw-bold m-1">  <small className="fw-lighter">Contact :</small> +91{" "}  {state.vendor.contactNumber}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card bg-transparent border-0 mt-3">
          <div className="p-0 w-100">
            <form className="container p-0" onSubmit={handleSubmit}>
              {error && (<div className="alert alert-danger" role="alert">  {error}</div>)}
              <div className="form-row d-flex flex-wrap justify-content-between">
                <div className="form-group col-md-6 my-2">
                  <label>Date and Time</label>
                  <br />
                  <DateTimePicker onChange={setDateTime} value={datetime} minDate={new Date()} maxDate={maxBookingDate} format="dd-MM-y h:mm a" />
                </div>
                <div className="form-group col-md-3 my-2">
                  <label>Time</label>
                  <select className="form-control form-control-sm bg-transparent border-dark w-auto" value={duration} onChange={(e) => setDuration(e.target.value)}>
                    <option value="">Select duration</option>
                    {Array.from({ length: 9 }, (_, i) => i + 1).map((hour) => (<option key={hour} value={`${hour}`}>  {hour} hour</option>))}
                  </select>
                </div>
                <div className="form-group col-md-3 my-2">
                  <label>Work</label>
                  <input type="text" placeholder="Describe the work" className="form-control form-control-sm bg-transparent border-dark w-auto" value={workDescription} onChange={(e) => setWorkDescription(e.target.value)} />
                </div>
              </div>
              <div className="form-group my-2">
                <label>Work Address</label>
                <input type="text" className="form-control bg-transparent border-dark" placeholder="1234 Main Street, Indore" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-success my-2">Book Now</button>
              <button type="button" className="btn btn-outline-success m-1" onClick={() => navigate(-1)}> Back </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rental;
