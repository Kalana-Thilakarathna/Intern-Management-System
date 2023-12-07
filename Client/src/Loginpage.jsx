import { useState, useContext, useEffect } from "react";
import axios from "./Api/Axios";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import useAuth from "./Hooks/useAuth";

import Student from "./Student";
import Company from "./Company";
import Admin from "./Admin";

import "./Loginpage.css";
function Loginpage() {
  const { setAuth } = useAuth();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  async function HandleSubmit(e) {
    try {
      e.preventDefault();

      const response = await axios.post("/login", { userName, password });

      const role = response.data.role;
      const token = response.data.Token;

      setAuth({ userName, password, role, token });

      if (role === "Student") {
        navigate(`/student/${userName}`);
      } else if (role === "Company") {
        navigate(`/company/${userName}`);
      } else if (role === "Admin") {
        navigate("/admin");
      } else {
        // alert('Invalid username or password');
        setErrorMessage("Invalid username or password");
        console.log("Error Message:", errorMessage);
      }
    } catch (err) {
      console.log(err);
      setErrorMessage("Invalid username or password");
    }
  }

  return (
    <>
      <header className="header">
        <div className="w-screen header_line"></div>
        <div className="w-screen header_content flex flex-col items-center justify-center mt-2z">
          <img
            src="https://www.sjp.ac.lk/wp-content/uploads/2020/10/usjp-logo.png"
            alt="University Logo"
            className="uni-logo"
          />
          <div className="header_title">Intern Management System</div>
          <div className="header_subtitle">Faculty of Technology</div>
          <div className="header_subtitle">
            University of Sri Jayewardenepura
          </div>
        </div>
      </header>
      <main className="  bg-white border rounded-lg shadow-lg  content-container formH">
        <form
          className="flex flex-col items-center"
          style={{ flex: 1 }}
          onSubmit={HandleSubmit}
        >
          <h1>Log in</h1>
          <div className="entryArea-1">
            <div className="container-1">
              <input
                type="text"
                name="userName"
                id="userName"
                className="userName"
                required
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
              <div className="input-Label">User Name</div>
            </div>
          </div>
          <div className="entryArea-2">
            <div className="container-2">
              <input
                type="password"
                name="password"
                id="password"
                className=" password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div className="input-Label">Password</div>
            </div>
          </div>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <button className="submit_button">Login</button>
        </form>
      </main>
      <footer className="footer"></footer>
    </>
  );
}

export default Loginpage;
