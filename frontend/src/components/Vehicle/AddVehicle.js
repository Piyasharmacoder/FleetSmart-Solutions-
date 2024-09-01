import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function AddVehicle() {
  const [vehicle, setVehicle] = useState({ brand: "", model: "", rent: "", description: "", categoryname: "", year: "", registration_number: "", image: "", vendorId: localStorage.getItem('vendorid'), });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [categories, setCategory] = useState([]);

  useEffect(() => {
    axios.get(process.env.React_APP_SECRET_KEY_CategoryList)
      .then(response => {
        setCategory(response.data.categories)
      }).catch(err => {
        console.log(err);
      })
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle((prevVehicle) => ({
      ...prevVehicle,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { brand, model, rent, description, categoryname, year, registration_number, image, vendorId, } = vehicle;

    if (!brand || !model || !rent || !description || !categoryname || !year || !registration_number || !image || !vendorId) {
      setError("All fields must be filled.");
      setLoading(false);
      return;
    }

    try {
      setError(null);
      await axios.post("http://localhost:3001/vehicle/add", vehicle);
      toast.success("Vehicle added successfully!");
      setVehicle({ brand: "", model: "", rent: "", description: "", categoryname: "", year: "", registration_number: "", image: "", vendorId: "", });
    } catch (err) {
      toast.error("Failed to add vehicle. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <section className="bg-light py-2 py-md-3">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
              <h2 className="mb-2 display-5 text-center">Add New Vehicle</h2>
              <p className="text-secondary mb-3 text-center">  Fill out the form below to add a new vehicle to the fleet. Please provide all required details.</p>
              <hr className="w-50 mx-auto mb-3 mb-xl-9 border-dark-subtle" />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-lg-center">
            <div className="col-12 col-lg-9">
              <div className="bg-white border rounded shadow-sm overflow-hidden">
                <form onSubmit={handleSubmit}>
                  <div className="row gy-4 gy-xl-5 p-4 p-xl-5 shadow shadow-5">
                    {error && (
                      <div className="col-12">
                        <div className="alert alert-danger" role="alert">  {error}</div>
                      </div>
                    )}
                    <div className="col-12">
                      <label htmlFor="brand" className="form-label">  Brand <span className="text-danger">*</span></label>
                      <input type="text" className="form-control" id="brand" name="brand" value={vehicle.brand} onChange={handleChange} placeholder="Enter Vehicle Brand" required />
                    </div>
                    <div className="col-12">
                      <label htmlFor="model" className="form-label">  Model <span className="text-danger">*</span></label>
                      <input type="text" className="form-control" id="model" name="model" value={vehicle.model} onChange={handleChange} placeholder="Enter Vehicle Model" required />
                    </div>
                    <div className="col-12 col-md-6">
                      <label htmlFor="rent" className="form-label">  Rent (₹ per hour) <span className="text-danger">*</span></label>
                      <input type="number" className="form-control" id="rent" name="rent" value={vehicle.rent} onChange={handleChange} placeholder="Enter Rent" required />
                    </div>
                    <div className="col-12">
                      <label htmlFor="description" className="form-label">  Description <span className="text-danger">*</span></label>
                      <textarea className="form-control" id="description" name="description" rows="3" value={vehicle.description} onChange={handleChange} placeholder="Enter Vehicle Description" required></textarea>
                    </div>
                    <div className="col-12">
                      <label htmlFor="categoryname" className="form-label">  Category Name <span className="text-danger">*</span></label>
                      <select className="form-select" id="categoryname" name="categoryname" value={vehicle.categoryname} onChange={handleChange} required style={{ maxHeight: '150px', overflowY: 'auto' }}>
                        <option value="">Select a category</option>
                        {categories.map((category, index) => (
                          <option key={index} value={category.categoryName}>
                            {category.categoryName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12 col-md-6">
                      <label htmlFor="year" className="form-label">  Year <span className="text-danger">*</span></label>
                      <input type="number" className="form-control" id="year" name="year" value={vehicle.year} onChange={handleChange} placeholder="Enter Vehicle Year" required />
                    </div>
                    <div className="col-12 col-md-6">
                      <label htmlFor="registration_number" className="form-label">  Registration Number <span className="text-danger">*</span></label>
                      <input type="text" className="form-control" id="registration_number" name="registration_number" value={vehicle.registration_number} onChange={handleChange} placeholder="Enter Registration Number" required />
                    </div>
                    <div className="col-12">
                      <label htmlFor="image" className="form-label">Image URL <span className="text-danger">*</span></label>
                      <input type="text" className="form-control" id="image" name="image" value={vehicle.image} onChange={handleChange} placeholder="Enter Image URL" required />
                    </div>
                    <div className="col-12">
                      <div className="d-grid">
                        <button className="btn btn-dark btn-lg" type="submit" disabled={loading}>  {loading ? "Adding..." : "Add Vehicle"}</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddVehicle;
