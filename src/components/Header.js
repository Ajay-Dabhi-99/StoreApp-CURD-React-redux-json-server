import React from "react";
import logout from "../Assets/images/logout.png";
import logo from "../Assets/images/loq8Logo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();

  // Logout
  const handelLogout = () => {
    localStorage.clear();
    navigate("../../../");
    toast.success("User Logout Successfully!");
  };
  return (
    <header>
      <a href="index.html">
        <img src={logo} alt="LOQ8 Logo" />
      </a>
      <div className="userBox cursor-pointer">
        Test User
        <div onClick={handelLogout} className="logOut">
          <img src={logout} alt="Logout" />
        </div>
      </div>
    </header>
  );
}

export default Header;
