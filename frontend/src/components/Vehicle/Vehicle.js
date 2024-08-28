import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify';

function Vehicle() {
    const [vehicles, setVehicles] = useState([]);
    const { state } = useLocation();

    useEffect(() => {
        axios.post(process.env.React_APP_SECRET_KEY_VehicleByCategory, { categoryName: state })
            .then(response => {
                setVehicles(response.data.vehicleList)
            }).catch(err => {
                console.log(err);
            })
    }, [state]);

    const navigate = useNavigate();
    return (
        <>
            <ToastContainer />
            <div className="container-fluid bg-light pt-3">
                <h1 className="text-center text-success mt-2">{state}</h1>
                {vehicles.map((item, index) => <div key={index} className='container py-3'>
                    <div className="card shadow border">
                        <div className="row no-gutters">
                            <div className="col-md-5">
                                <img className="card-img" src={item.image} alt="Suresh Dasari Card" />
                            </div>
                            <div className="col-md-7">
                                <div className="card-body p-0">
                                    <h5 className="card-title m-1">{item.model}</h5>
                                    <h5 className="card-title m-1 fw-bolder">{item.brand}</h5>
                                    <h5 className="card-title m-1">{item.categoryname}</h5>
                                    <p className="card-text text-success fw-bold m-1">₹{item.rent}<small className="fw-lighter"> /hr</small> [Inclusive of all Taxes]</p>
                                    <p className="card-text m-1"><small className="text-muted">{item.description}</small></p>
                                    <p className="card-text m-1">Manufacturing Year : {item.year}</p>
                                    <p className="card-text m-1"><mark className='fw-bold m-0 p-0'>{item.registration_number}</mark></p>
                                    <button className="btn btn-primary m-1" onClick={() => { (item.active) ? navigate("/rental", { state: item }) : toast(`Not Avalable......`) }}>Book Now</button>
                                    <button className="btn btn-outline-success m-1" onClick={() => { navigate(-1) }}>Back</button>
                                    {item.active ? <p className="card-text text-success fw-bold m-1 text-decoration-underline">✅ Avalable</p> : <p className="card-text text-danger fw-bold m-1 text-decoration-underline">🚫 Not Avalable</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
            </div >
        </>
    );
}
export default Vehicle;

