import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignedInStack from "./SignedInStack";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserInfo from "./components/UserInfo";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<SignedInStack />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user/:userID" element={<UserInfo />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
