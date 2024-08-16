import "./App.css";
import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const SignUp = lazy(() => import("./components/User/SignUp.js"));
const SignIn = lazy(() => import("./components/User/SignIn.js"));

function App() {
  return (
    <div className="d-flex justify-content-center">
      <div>
        <Suspense
          fallback={
            <div
              className="w-100 d-flex flex-column justify-content-center align-items-center"
              style={{ height: "400px" }}
            >
              <h1
                className="spinner-border"
                style={{
                  height: "100px",
                  width: "100px",
                  color: "var(--green)",
                }}
              ></h1>
              <h1>Loading...</h1>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
