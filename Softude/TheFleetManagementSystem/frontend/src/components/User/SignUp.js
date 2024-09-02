import React, { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const [nameerror, setNameerror] = useState(" ");
  const [emailerror, setEmailerror] = useState(" ");
  const [passworderror, setPassworderror] = useState("  ");
  const [contactNumbererror, setContactNumbererror] = useState("    ");

  const { state } = useLocation();

  const navigate = useNavigate();
  const Register = async () => {
    axios.post(`${process.env.REACT_APP_API_URL}${state}/signup`, { name, email, password, contactNumber })
      .then(response => {
        if (response.status === 200) {
          toast.success("Sign Up Success....");
          setTimeout(() => {
            navigate('/signIn', { state: state })
          }, 2000);
        }
      }).catch(err => {
        if (err.response.status === 400) {
          toast.info('User already exist...');
        } else
          toast.error("User internal error...");
      });
  };

  const handleSubmit = event => {
    event.preventDefault();
  }


  return (
    <>
      <ToastContainer />
      <section className="" style={{ backgroundColor: "#eee" }}>
        <div className="container p-3">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-10 col-xl-9">
              <div className="card text-black">
                <div className="card-body p-md-4">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1" style={{ backgroundColor: "#c6cbc9" }}>
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Register</p>
                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row align-items-center mb-3">
                          <div data-mdb-input-init className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="form3Example1c"> Your Name</label>
                            <input type="text" onChange={(event) => { (event.target.value === "") ? setNameerror("name is required") : (!event.target.value.match("^[a-z A-Z]+$")) ? setNameerror("name contains only charecters") : (!event.target.value.match("^[a-z A-Z]{2,20}$")) ? setNameerror("name must be at least 2-20 characters long.") : setNameerror(""); setName(event.target.value); }} id="form3Example1c" className="form-control" />
                            <small className="text-danger fs-7" >{nameerror}</small>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-3">
                          <div data-mdb-input-init className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="form3Example3c"> Your Email</label>
                            <input type="email" onChange={(event) => { (event.target.value === "") ? setEmailerror("email is required") : (!event.target.value.match(/^[^\s@]+@/)) ? setEmailerror("Email must start with valid characters.") : (!event.target.value.match(/@gmail\.com$/)) ? setEmailerror("Email must end with '@gmail.com'.") : setEmailerror(""); setEmail(event.target.value); }} id="form3Example3c" className="form-control" />
                            <small className="text-danger fs-7" >{emailerror}</small>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-3">
                          <div data-mdb-input-init className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="form3Example4c">Password</label>
                            <input type="password" onChange={(event) => { (event.target.value === "") ? setPassworderror("password is required") : (!event.target.value.match(/^(?=.*\d)/)) ? setPassworderror("Password must contain at least one digit.") : (!event.target.value.match(/^(?=.*[a-zA-Z])/)) ? setPassworderror("Password must contain at least one letter.") : (!event.target.value.match(/^.{5,}$/)) ? setPassworderror("Password must be at least 5 characters long.") : setPassworderror(""); setPassword(event.target.value); }} id="form3Example4c" className="form-control" />
                            <small className="text-danger fs-7" >{passworderror}</small>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-3">
                          <div data-mdb-input-init className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="form3Example5c">ContactNumber</label>
                            <input type="tel" onChange={(event) => { (event.target.value === "") ? setContactNumbererror("number is required") : (!event.target.value.match(/^[0-9]+$/)) ? setContactNumbererror("Number must contain only digits.") : (!event.target.value.match(/^\d{10}$/)) ? setContactNumbererror("Number must only 10 digits.") : setContactNumbererror(""); setContactNumber(event.target.value); }} id="form3Example5c" className="form-control" />
                            <small className="text-danger fs-7" >{contactNumbererror}</small>
                          </div>
                        </div>
                        <div className="form-check d-flex justify-content-center mb-4">
                          <label className="form-check-label" htmlFor="form2Example3">you have already account <a href="signin" onClick={() => navigate('/signin')}> Sign In</a></label>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          {(nameerror === emailerror && emailerror === passworderror && passworderror === contactNumbererror) ? <button className="btn btn-dark" onClick={() => { Register() }}>Register</button> : <button className="btn btn-secondary" onClick={() => { (name === "") ? setNameerror("name is required") : (email === "") ? setEmailerror("email is required") : (password === "") ? setPassworderror("password is required") : (contactNumber === "") ? setContactNumbererror("Contactnumber is required") : setContactNumbererror(" ") }}>Register</button>}
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img src="image/logo.png" className="img-fluid" alt="logo...." />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignUp;