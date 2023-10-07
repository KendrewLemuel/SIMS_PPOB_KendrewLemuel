import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="nav-wrapper">
      <div className="nav-logo">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="title">
          <a href="/home">
            <h4 h>SIMS PPOB</h4>
          </a>
        </div>
      </div>
      <ul className="nav-menu">
        <li>
          <NavLink to="/topup">Topup</NavLink>
        </li>
        <li>
          <NavLink to="/transaction">Transaction</NavLink>
        </li>
        <li>
          <NavLink to="/account">Account</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
