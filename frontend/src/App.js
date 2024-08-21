import "./App.css";
import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";

const SignUp = lazy(() => import("./components/User/SignUp.js"));
const SignIn = lazy(() => import("./components/User/SignIn.js"));
const Home = lazy(() => import("./components/Home/Home.js"));
const About = lazy(() => import("./components/About/About.js"));
const Contact = lazy(() => import("./components/Contact/Contact.js"));

function App() {
  return (
    <div className="container-fluid p-0 d-flex justify-content-center">
      <div className="container-fluid p-0">
        <Suspense fallback={
          <div className="vw-100 d-flex flex-column justify-content-center align-items-center" style={{ height: "400px" }} >
            <h1 className="spinner-border" style={{ height: "100px", width: "100px", }} ></h1>
            <h1>Loading...</h1>
          </div>
        } >
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
