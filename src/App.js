import React from "react";
import './App.css';
import HomePage from "./components/HomePage/HomePage";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUp from "./components/LoginPage/SignUp/SignUp";

import { Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound/NotFound";



function App() {
  const token = localStorage.getItem("token")
  return (
    <div className="App">
        <Routes>
            <Route path="/*" element={token === null ? <LoginPage/> : <HomePage/>}/>
            <Route path="/accounts/emailsignup" element={<SignUp/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </div>

  );
}

export default App;
