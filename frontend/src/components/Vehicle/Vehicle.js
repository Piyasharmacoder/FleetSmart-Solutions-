import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';

function Vehicle() {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        axios.post(process.env.React_APP_SECRET_KEY_VehicleByCategory, { categoryName: state })
            .then(response => {
                setVehicles(response.data.vehicleList);
                setLoading(false);
            })
            .catch(err => {
                toast.error("Failed to load vehicles. Please try again later.");
                setLoading(false);
            });
    }, [state]);

    if (loading) {
        return <div className="text-center">Loading vehicles...</div>;
    }

    return (
        <>
            <ToastContainer />
            <div className="container-fluid bg-light pt-3">
                <h1 className="text-center text-success mt-2">{state}</h1>
                {vehicles.length > 0 ? vehicles.map((item, index) => (
                    <div key={index} className='container py-3'>
                        <div className="card shadow border px-2">
                            <div className="row no-gutters">
                                <div className="col-md-5 d-flex align-items-center">
                                    <img className="card-img" src={item.image} alt={item.model} />
                                </div>
                                <div className="col-md-7 d-flex align-items-center">
                                    <div className="card-body p-0">
                                        <h5 className="card-title m-1 fw-bolder">{item.brand}</h5>
                                        <h5 className="card-title m-1">{item.model}</h5>
                                        <h5 className="card-title m-1">{item.categoryname}</h5>
                                        <p className="card-text text-success fw-bold m-1">₹{item.rent}<small className="fw-lighter"> /hr</small> [Inclusive of all Taxes]</p>
                                        <p className="card-text m-1"><small className="text-muted">{item.description}</small></p>
                                        <p className="card-text m-1">Manufacturing Year : {item.year}</p>
                                        <p className="card-text m-1"><mark className='fw-bold m-0 p-0'>{item.registration_number}</mark></p>
                                        <button className="btn btn-primary m-1" onClick={() => { !item.active ? toast.warning("Not Available...") : (localStorage.getItem("userid") * 1 === 0) ? toast.warning("Plese Sign In First...") : navigate("/rental", { state: item }) }}>    Book Now</button>
                                        <button className="btn btn-outline-success m-1" onClick={() => { navigate(-1) }}>    Back</button>
                                        {item.active ? (<p className="card-text text-success fw-bold m-1">✅ Available</p>) : (<p className="card-text text-danger fw-bold m-1">🚫 Not Available</p>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="container py-3">    <p className="text-center">No vehicles found for this category.</p></div>
                )}
            </div>
        </>
    );
}

export default Vehicle;
