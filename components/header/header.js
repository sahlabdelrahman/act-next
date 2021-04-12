import React from "react";
import Logo from "../../public/images/logo.png";

const Header = () => {
  return (
    <header>
      <div className="container">
        <img src={Logo} alt="logo" />
      </div>
    </header>
  );
};

export default Header;
