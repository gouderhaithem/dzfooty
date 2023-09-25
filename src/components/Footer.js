/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import logo from "../data/logo.png";

export const Footer = () => {
  return (
    <footer>
      <center>
        <img src={logo} alt="" />
        <div className="Logo">DzairFooty</div>
      </center>

      <ul className="menu">
        <li>
          <a href="">About-us </a>{" "}
        </li>
        <li>|</li>
        <li>
          <a href="">Contact-US </a>
        </li>
        <li>|</li>
        <li>
          <a href="">Add with-US </a>
        </li>
        <li>|</li>
        <li>
          <a href="">Privcy Policy </a>
        </li>
      </ul>
      <ul className="social-media"></ul>
      <center style={{ color: "white" }}>
        <p>&copy; DzairFooty.com Inc. All Rights Reserved.</p>
      </center>
    </footer>
  );
};

export default Footer;
