import "./App.css";
import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import SignUp from "./components/User/SignUp.js";
import SignIn from "./components/User/SignIn.js";
import Bookings from "./components/Rental/Bookings.js";
import AddVehicle from "./components/Vehicle/AddVehicle.js";
import MyVehicle from "./components/Vehicle/MyWehicle.js";
import BookedVehicle from "./components/Rental/BookedVehicle.js";
const Vehicle = lazy(() => import("./components/Vehicle/Vehicle.js"));
const Rental = lazy(() => import("./components/Rental/Rental.js"));
const Home = lazy(() => import("./components/Home/Home.js"));
const About = lazy(() => import("./components/About/About.js"));
const Contact = lazy(() => import("./components/Contact/Contact.js"));

function App() {
  return (
    <div className="container-fluid p-0 d-flex justify-content-center">
      <div className="container-fluid p-0">
        <Suspense
          fallback={
            <div
              className="vw-100 d-flex flex-column justify-content-center align-items-center"
              style={{ height: "400px" }}
            >
              <div
                className="spinner-border"
                style={{ height: "100px", width: "100px" }}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              <h1>Loading...</h1>
            </div>
          }
        >
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/vehicle" element={<Vehicle />} />
            <Route path="/rental" element={<Rental />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/addvehicle" element={<AddVehicle />} />
            <Route path="/myvehicle" element={<MyVehicle />} />
            <Route path="/bookedvehicle" element={<BookedVehicle />} />
          </Routes>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
