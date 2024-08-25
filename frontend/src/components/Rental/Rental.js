import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import DateTimePicker from 'react-datetime-picker';
import 'react-clock/dist/Clock.css';

// type ValuePiece = Date | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];

function Rental() {
    const { state } = useLocation();

    const [startDate, setStartDate] = useState(dayjs('2024-01-01T12:00')); // Set initial date
    const [endDate, setEndDate] = useState(dayjs('2024-01-01T01:00')); // Set initial date

    const handleDateChange1 = (newValue) => {
        setStartDate(newValue);
        console.log(startDate)
    };

    const handleDateChange2 = (newValue) => {
        setEndDate(newValue);
        console.log(endDate)
    };
    const [value, onChange] = useState(new Date());
    console.log(value);


    const navigate = useNavigate();
    return (
        <>
            <ToastContainer />
            <div className="container-fluid bg-light pt-3">
                <div className='container py-3'>
                    <div class="card shadow border">
                        <div class="row no-gutters border border-danger">
                            <div class="col-md-5">
                                <img class="card-img" src={state.image} alt="Suresh Dasari Card" />
                            </div>
                            <div class="col-md-7">
                                <div class="card-body p-0">
                                    <h5 className="card-title m-1">{state.model}</h5>
                                    <h5 className="card-title m-1 fw-bolder">{state.brand}</h5>
                                    <h5 className="card-title m-1">{state.categoryname}</h5>
                                    <p className="card-text text-success fw-bold m-1">₹{state.rent}<small className="fw-lighter"> /hr</small> [Inclusive of all Taxes]</p>
                                    <p className="card-text m-1"><small className="text-muted">{state.description}</small></p>
                                    <p className="card-text m-1">Manufacturing Year : {state.year}</p>
                                    <p className="card-text m-1"><mark className='fw-bold m-0 p-0'>{state.registration_number}</mark></p>
                                    <button className="btn btn-outline-success m-1" onClick={() => { navigate(-1) }}>Back</button>
                                    {state.active ? <p className="card-text text-success fw-bold m-1 text-decoration-underline">✅ Avalable</p> : <p className="card-text text-danger fw-bold m-1 text-decoration-underline">🚫 Not Avalable</p>}
                                </div>
                            </div>
                        </div>
                        <div class="row no-gutters border border-danger">
                            <div class="col-12">
                                <div class="card-body p-5 d-flex justify-content-around">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <div>
                                            <MobileDateTimePicker
                                                value={startDate}
                                                onChange={handleDateChange1}
                                                label="Select Date and Time"
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </div>
                                    </LocalizationProvider>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <div>
                                            <MobileDateTimePicker
                                                value={endDate}
                                                onChange={handleDateChange2}
                                                label="Select Date and Time"
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </div>
                                    </LocalizationProvider>
                                    <div>
                                        <DateTimePicker onChange={onChange} value={value} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default Rental;