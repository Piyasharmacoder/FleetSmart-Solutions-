import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast, ToastContainer } from "react-toastify";

const Maintanence = () => {
    const [maintanenceData, setMaintanenceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [currentMaintenance, setCurrentMaintenance] = useState(null);
    const [updatedStatus, setUpdatedStatus] = useState("");
    const [updatedDate, setUpdatedDate] = useState("");
    const vendorId = localStorage.getItem("vendorid");

    useEffect(() => {
        fetchAllMaintenances();
    }, []);

    const fetchAllMaintenances = () => {
        setLoading(true);
        axios.post("http://localhost:3001/vehicle/fetchVehicleMaintanence", { vendorId: vendorId, })
            .then((response) => {
                setMaintanenceData(response.data.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.error("Error fetching maintenance data:", err);
                toast.error("Failed to fetch maintenance data. Please try again later.");
            });
    };

    const fetchMaintenancesByStatus = (status) => {
        setLoading(true);
        axios.post("http://localhost:3001/vehicle/fetchVehicleMaintanenceStatus", { vendorId: vendorId, maintanenceStatus: status, })
            .then((response) => {
                setMaintanenceData(response.data.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.error("Error fetching maintenance data by status:", err);
                toast.error("Failed to fetch filtered maintenance data. Please try again later.");
            });
    };

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
    };

    const handleUpdateClick = (maintenance) => {
        setCurrentMaintenance(maintenance);
        setUpdatedStatus(maintenance.maintanenceStatus);
        setUpdatedDate(maintenance.maintanenceDate ? new Date(maintenance.maintanenceDate).toISOString().split('T')[0] : "");
        setShowModal(true);
    };

    const handleUpdateSubmit = () => {
        axios.put("http://localhost:3001/maintanence/update", {
            vehicleId: currentMaintenance.vehicleId,
            maintanenceDate: updatedDate,
            maintanenceStatus: updatedStatus,
        })
            .then((response) => {
                setShowModal(false);
                toast.success("Maintenance updated successfully.");
                fetchAllMaintenances();
            })
            .catch((err) => {
                console.error("Error updating maintenance:", err);
                toast.error("Failed to update maintenance. Please try again later.");
            });
    };

    const filteredData = maintanenceData.filter((vehicle) =>
        vehicle.registration_number.toLowerCase().includes(searchQuery)
    );

    if (loading) {
        return (
            <div className="text-center">
                <Spinner animation="border" />
                <p>Loading maintenance data...</p>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <ToastContainer />
            <h1 className="text-center text-success mb-4">Vehicle Maintenance Records</h1>
            <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                <div className="d-flex justify-content-between flex-wrap">
                    <Button variant="secondary" className="my-2 me-2" onClick={fetchAllMaintenances}>
                        View All
                    </Button>
                    <Button variant="primary" className="m-2" onClick={() => fetchMaintenancesByStatus("pending")}>
                        Pending
                    </Button>
                    <Button variant="success" className="m-2" onClick={() => fetchMaintenancesByStatus("success")}>
                        Success
                    </Button>
                    <Button variant="danger" className="m-2" onClick={() => fetchMaintenancesByStatus("cancel")}>
                        Cancel
                    </Button>
                </div>
                <Form.Control className="form-control me-2" type="search" aria-label="Search" placeholder="Search by Registration Number" value={searchQuery} onChange={handleSearch} style={{ width: "250px" }} />
            </div>
            {filteredData.length > 0 ? (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Vehicle Image</th>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>Category</th>
                            <th>Registration Number</th>
                            <th>Maintenance Date</th>
                            <th>Maintenance Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((vehicle, index) =>
                            vehicle.maintanences.map((maintanence, mIndex) => (
                                <tr key={maintanence.id}>
                                    <td>{index + 1}</td>
                                    <td><img src={vehicle.image || "/path/to/default/image.jpg"} alt={`${vehicle.brand} ${vehicle.model}`} style={{ width: "100px", height: "auto" }} /></td>
                                    <td>{vehicle.brand}</td>
                                    <td>{vehicle.model}</td>
                                    <td>{vehicle.categoryname}</td>
                                    <td>{vehicle.registration_number}</td>
                                    <td>{new Date(maintanence.maintanenceDate).toLocaleDateString()}</td>
                                    {maintanence.maintanenceStatus === 'pending' ? <td className="text-info">{maintanence.maintanenceStatus}</td> : maintanence.maintanenceStatus === 'success' ? <td className="text-success">{maintanence.maintanenceStatus}</td> : <td className="text-danger">{maintanence.maintanenceStatus}</td>}
                                    <td>{maintanence.maintanenceStatus === "pending" && (<Button variant="primary" onClick={() => handleUpdateClick(maintanence)}>Update</Button>)}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            ) : (
                <div className="text-center">
                    <p>No maintenance records found.</p>
                </div>
            )}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Maintenance</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="maintanenceDate">
                            <Form.Label>Maintenance Date</Form.Label>
                            <Form.Control type="date" value={updatedDate} onChange={(e) => setUpdatedDate(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="maintanenceStatus" className="mt-3">
                            <Form.Label>Maintenance Status</Form.Label>
                            <Form.Control as="select" value={updatedStatus} onChange={(e) => setUpdatedStatus(e.target.value)}>
                                <option value="pending">Pending</option>
                                <option value="success">Success</option>
                                <option value="cancel">Cancel</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>    Close</Button>
                    <Button variant="primary" onClick={handleUpdateSubmit}>    Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Maintanence;
