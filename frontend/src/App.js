import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";

// Lazy load components
const UserLogIn = lazy(() => import("./components/User/LogIn.js"));
const UserProfile = lazy(() => import("./components/UserProfile/UserProfile.js"));
const UserForgetPassword = lazy(() => import("./components/User/ForgetPassword.js"));

function App() {
  return (
    <div className="d-flex justify-content-center">
      <div>
        <Header />
        <Suspense fallback={
          <div className="w-100 d-flex flex-column justify-content-center align-items-center" style={{ height: "400px" }}>
            <h1 className="spinner-border" style={{ height: "100px", width: "100px", color: "var(--green)" }}></h1>
            <h1>Loading...</h1>
          </div>
        }>
          <Routes>
            <Route path="/user" element={<UserLogIn />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/forgetpassword" element={<UserForgetPassword />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </div>
  );
}

export default App;
