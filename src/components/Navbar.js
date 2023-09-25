import React from "react";
import { Link } from "react-router-dom";
import logo from "../data/logo.png";

export const Navbar = () => {
  return (
    <div className="navbar">
      <h1>
        <div className="logoPrincipe">
          <img src={logo} alt="" />
          <Link to="/">DzairFooty</Link>
        </div>
      </h1>
      <ul>
        <li>
          <Link to="/">1. Home</Link>
        </li>
        <li>
          <Link to="/matchday">2. Match Day</Link>
        </li>
        <li>
          <Link to="/about-us">3. About Us</Link>
        </li>
      </ul>
    </div>
  );
};
export default Navbar;
