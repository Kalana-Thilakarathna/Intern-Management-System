import React from "react";
import "./Header.css";
import "font-awesome/css/font-awesome.min.css";

function Header() {
  return (
    <div className="common-header">
      <div className="component-1">
        <div className="header-border-right">
          <img src="../images/logo.png" alt="logo" className="header-logo" />
          <div className="header-user">
            <button className="header-log-out">logout</button>
            <i className="fa fa-user user-icon"></i>
          </div>
        </div>

        <img
          src="../images/uni.png"
          alt="header-uniname"
          className="header-uniname"
        />
      </div>

      <div className="component-2">
        <h1 className="header-title">
          University Name
          <br />
          Faculty Name
          <br />
          Intern Management System
        </h1>
      </div>
    </div>
  );
}

export default Header;
