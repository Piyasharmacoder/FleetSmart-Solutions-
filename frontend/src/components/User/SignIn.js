import React, { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    if (!email.match(/^[^\s@]+@/)) return "Email must start with valid characters.";
    if (!email.match(/@gmail\.com$/)) return "Email must end with '@gmail.com'.";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (!password.match(/^(?=.*\d)/)) return "Password must contain at least one digit.";
    if (!password.match(/^(?=.*[a-zA-Z])/)) return "Password must contain at least one letter.";
    if (!password.match(/^.{5,}$/)) return "Password must be at least 5 characters long.";
    return "";
  };

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}${state}/signin`, { email, password });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.user.token);
        state === "user" ? localStorage.setItem('userid', response.data.user.user.id) : localStorage.setItem('vendorid', response.data.user.vender.id);
        toast.success("Sign In Success....");
        setTimeout(() => {
          navigate(state === "user" ? '/' : '/myvehicle');
        }, 2000);
      }
    } catch (error) {
      toast.error("User does not exist or incorrect credentials...");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);
    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);

    if (!emailValidationError && !passwordValidationError) {
      handleSignIn();
    }
  };

  return (
    <>
      <ToastContainer />
      <section style={{ backgroundColor: "#eee" }}>
        <div className="container p-3">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-10 col-xl-9">
              <div className="card text-black">
                <div className="card-body p-md-4">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1" style={{ backgroundColor: "#c6cbc9" }}>
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign In</p>
                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row align-items-center mb-5">
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                            <input type="email" id="form3Example3c" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <small className="text-danger fs-7">{emailError}</small>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-5">
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="form3Example4c">Password</label>
                            <input type="password" id="form3Example4c" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <small className="text-danger fs-7">{passwordError}</small>
                          </div>
                        </div>
                        <div className="form-check d-flex justify-content-center mb-5">
                          <label className="form-check-label" htmlFor="form2Example3">  Create new account <a href="/signup" onClick={() => navigate('/signup', { state })}>Sign Up</a></label>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" className={`btn ${emailError || passwordError ? "btn-secondary" : "btn-dark"} ${loading ? "disabled" : ""}`} disabled={loading}>  {loading ? "Signing In..." : "Sign In"}</button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img src="image/logo.png" className="img-fluid" alt="logo" />
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
};

export default SignIn;
