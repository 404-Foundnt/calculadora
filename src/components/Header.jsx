import React from "react";
import "..//css/Header.css"
import "..//css/Calculadora.css"
import logo from '../assets/404.png'

function Header() {
  return (
    <div className="header">
      <img src={logo} alt="logo" className="logo" />
      <h1>Calculadora</h1>
    </div>
  );
}

export default Header;