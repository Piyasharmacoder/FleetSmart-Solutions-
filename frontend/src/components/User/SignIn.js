import React, { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailerror, setEmailerror] = useState(" ");
  const [passworderror, setPassworderror] = useState("  ");

  const navigate = useNavigate();

  const signin = () => {
    axios.post('http://localhost:3001/user/signin', { email, password })
      .then(response => {
        if (response.status === 200) {
          toast.success("Sign In Success....");
          setTimeout(() => { navigate('/') }, 2000)
        }
      }).catch(err => {
        toast.info("User is not Exist...");
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

                    <div className="col-md-10 col-lg-6 col-xl-5 order-1 order-lg-2" style={{ backgroundColor: "#c6cbc9" }}>
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign In</p>

                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                        <div className="d-flex flex-row align-items-center mb-5">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div data-mdb-input-init className="form-outline flex-fill mb-0">
                            <label className="form-label" for="form3Example3c"> Your Email</label>
                            <input type="email" onChange={(event) => { (event.target.value === "") ? setEmailerror("email is required") : (!event.target.value.match(/^[^\s@]+@/)) ? setEmailerror("Email must start with valid characters.") : (!event.target.value.match(/@gmail\.com$/)) ? setEmailerror("Email must end with '@gmail.com'.") : setEmailerror(""); setEmail(event.target.value); }} id="form3Example3c" className="form-control" />
                            <small className="text-danger fs-7" >{emailerror}</small>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-5">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div data-mdb-input-init className="form-outline flex-fill mb-0">
                            <label className="form-label" for="form3Example4c">Password</label>
                            <input type="password" onChange={(event) => { (event.target.value === "") ? setPassworderror("password is required") : (!event.target.value.match(/^(?=.*\d)/)) ? setPassworderror("Password must contain at least one digit.") : (!event.target.value.match(/^(?=.*[a-zA-Z])/)) ? setPassworderror("Password must contain at least one letter.") : (!event.target.value.match(/^.{5,}$/)) ? setPassworderror("Password must be at least 5 characters long.") : setPassworderror(""); setPassword(event.target.value); }} id="form3Example4c" className="form-control" />
                            <small className="text-danger fs-7" >{passworderror}</small>
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-5">
                          <label className="form-check-label" for="form2Example3">create new account <a href="" onClick={() => navigate('/signup')}> Sign Up</a></label>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          {(emailerror === passworderror) ? <button className="btn btn-dark" onClick={() => { signin() }}>SignIn</button> : <button className="btn btn-secondary" onClick={() => { (email === "") ? setEmailerror("email is required") : (password === "") ? setPassworderror("password is required") : setPassworderror(" ") }}>SignIn</button>}
                        </div>

                      </form>

                    </div>

                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img src="https://acropolis-wp-content-uploads.s3.us-west-1.amazonaws.com/construction-truck-types.webp" className="img-fluid" alt="Sample image" />
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

export default SignIn;
