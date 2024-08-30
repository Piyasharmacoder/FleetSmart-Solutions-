import "./App.css";
import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Lazy-loaded components
const SignUp = lazy(() => import("./components/User/SignUp"));
const SignIn = lazy(() => import("./components/User/SignIn"));
const Bookings = lazy(() => import("./components/Rental/Bookings"));
const AddVehicle = lazy(() => import("./components/Vehicle/AddVehicle"));
const MyVehicle = lazy(() => import("./components/Vehicle/MyWehicle"));
const BookedVehicle = lazy(() => import("./components/Rental/BookedVehicle"));
const Vehicle = lazy(() => import("./components/Vehicle/Vehicle"));
const Rental = lazy(() => import("./components/Rental/Rental"));
const Home = lazy(() => import("./components/Home/Home"));
const About = lazy(() => import("./components/About/About"));
const Contact = lazy(() => import("./components/Contact/Contact"));

function App() {
  return (
    <div className="container-fluid p-0 d-flex flex-column min-vh-100">
      <Header />
      <Suspense fallback={<div className="vw-100 d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }} >
        <div className="spinner-border" style={{ height: "100px", width: "100px" }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h1>Loading...</h1>
      </div>}>
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
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
