import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from 'date-fns';

const Bookings = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('userid');

    useEffect(() => {
        axios.post('http://localhost:3001/rental/fetchRentalItems', { userId })
            .then(response => {
                setVehicles(response.data.data[0].Vehicles);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            });
    }, [userId]);

    if (loading) {
        return <div className="text-center">Loading vehicles...</div>;
    }

    return (
        <>
            {vehicles.length > 0 ? (
                <div className="container-fluid bg-light pt-3">
                    <h1 className="text-center text-success mt-2">My Bookings</h1>
                    {vehicles.map((item, index) => (
                        <div key={index} className="container col-9 py-3">
                            <div className="card shadow border p-2">
                                <div className="row no-gutters">
                                    <div className="col-md-5 d-flex align-items-center">
                                        <img className="card-img" src={item.image} alt={item.model} />
                                    </div>
                                    <div className="col-md-7 d-flex align-items-center">
                                        <div className="card-body p-0">
                                            <h6 className="card-title m-1 fw-bolder">{item.brand}</h6>
                                            <h6 className="card-title m-1">{item.model}</h6>
                                            <h6 className="card-title m-1">{item.categoryname}</h6>
                                            <p className="card-text text-success fw-bold m-1">₹{item.rent}<small className="fw-lighter"> /hr</small></p>
                                            <p className="card-text m-1"><mark className="fw-bold m-0 p-0 py-2">{item.registration_number}</mark></p>
                                            <p className="card-text m-1">
                                                <img src="https://png.pngtree.com/png-clipart/20220429/original/pngtree-pin-location-icon-with-folded-map-png-image_7581594.png" height={40} alt="location" />
                                                <small className="text-muted">{item.RentalItems.work_place}</small>
                                            </p>
                                            <p className="card-text m-1"><small>Date Of Booking: </small>{format(new Date(item.RentalItems.date), 'dd-MM-yyyy h:mm a')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="d-flex justify-content-around align-items-center my-5">
                    <div className="container-fluid d-flex p-4 justify-content-center align-content-center" id="blackCart">
                        <div>
                            <img width="450px" height="300px" src="https://cdni.iconscout.com/illustration/premium/thumb/couple-booking-new-car-illustration-download-in-svg-png-gif-file-formats--communication-conversation-talking-chatting-showroom-pack-services-illustrations-2438532.png" alt="No bookings" />
                            <h6 className="text-center">Your Bookings are empty!</h6>
                            <p className="text-center m-2">Add items to it now</p>
                            <center><Link to="/"><button className="btn btn-success" style={{ width: '200px' }}>Book Now</button></Link></center>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Bookings;
