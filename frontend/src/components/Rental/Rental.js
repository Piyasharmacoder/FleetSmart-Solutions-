import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

function Rental() {
  const { state } = useLocation();
  const [value, setValue] = useState(new Date());

  const onChange = (newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();
  return (
    <>
      <div className="container-fluid bg-light pt-3">
        <div className="container py-3">
          <div className="card shadow border">
            <div className="row no-gutters border border-danger">
              <div className="col-md-5">
                <img
                  className="card-img"
                  src={state.image}
                  alt="Suresh Dasari Card"
                />
              </div>
              <div className="col-md-7">
                <div className="card-body p-0">
                  <h5 className="card-title m-1">{state.model}</h5>
                  <h5 className="card-title m-1 fw-bolder">{state.brand}</h5>
                  <h5 className="card-title m-1">{state.categoryname}</h5>
                  <p className="card-text text-success fw-bold m-1">
                    ₹{state.rent}
                    <small className="fw-lighter"> /hr</small> [Inclusive of all
                    Taxes]
                  </p>
                  <p className="card-text m-1">
                    <small className="text-muted">{state.description}</small>
                  </p>
                  <p className="card-text m-1">
                    Manufacturing Year : {state.year}
                  </p>
                  <p className="card-text m-1">
                    <mark className="fw-bold m-0 p-0">
                      {state.registration_number}
                    </mark>
                  </p>
                  <p className="card-text fw-bold m-1">
                    <small className="fw-lighter">Contact :</small> +91{" "}
                    {state.vendor.contactNumber}
                  </p>
                  <button
                    className="btn btn-outline-success m-1"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="card bg-transparent border mt-3">
            <div className="p-3 w-100">
              <DateTimePicker
                onChange={onChange}
                value={value}
                minDate={new Date()}
                format="y-MM-dd h:mm:ss a"
              />
              <DateTimePicker
              value={value}
              format="1:00:00 Pm"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Rental;
